import { NextRequest, NextResponse } from 'next/server';
import type {
  AIAnalysisResult,
  AnalyzedFoodItem,
  FoodClassification,
  ConfidenceRating,
  NutritionSource,
  PortionUnit,
} from '@/lib/types';

export const maxDuration = 30; // Vercel timeout setting

interface VisionResponseJSON {
  classification: FoodClassification;
  brand?: string | null;
  productName?: string | null;
  variant?: string | null;
  confidenceLevel: ConfidenceRating;
  source: NutritionSource;
  needsLabelVerification?: boolean;
  message?: string;
  isFood: boolean;
  foods: {
    name: string;
    brand?: string;
    quantity: number;
    unit: PortionUnit;
    nutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fibre: number;
    };
    source: NutritionSource;
    confidenceLevel: ConfidenceRating;
    alternatives?: string[];
    notes?: string;
  }[];
}

const SYSTEM_INSTRUCTION = `You are a specialized AI Vision Nutrition & Indian Food Analyzer for OnlineMeasurer.
Analyze the provided image(s) with high precision. Follow these strict rules:

1. CLASSIFY THE IMAGE FIRST:
- "packaged_food": Packaged snacks, sweets, boxes, bottles, cans (e.g. Haldiram's Dry Fruit Patisa Classic, Biscuits, Chips, Milk carton).
- "homemade_meal": Indian home-cooked meal (e.g. thali, roti, dal, sabzi, rice, curd).
- "restaurant_meal": Plated restaurant dishes.
- "nutrition_label": Nutrition facts table / back-of-pack label.
- "multiple_items": Spread of several distinct dishes or products.
- "unclear": Blurry, dark, non-food, or unidentifiable items.

2. FOR PACKAGED FOOD (CRITICAL):
- Read visible brand name (e.g. "Haldiram's", "Amul", "MTR", "Britannia", "Bikaji", "Nestle").
- Read exact product title & variant (e.g. "Dry Fruit Patisa Classic", "Kaju Katli", "Maggi Masala Noodles").
- DO NOT return generic meal foods like "Roti", "Dal", or "Salad" for a packaged food box!
- If the nutrition label / facts table is visible, extract the exact values per serving or per 100g. Set source="package_label" and confidenceLevel="high".
- If only the front of the packaging is visible without a nutrition table:
  - Return the exact product name.
  - Provide standard estimated nutrition for that specific branded item.
  - Set source="ai_estimate", confidenceLevel="medium", and needsLabelVerification=true.
  - In message, write: "Product identified, but serving size/nutrition label needs verification."

3. FOR HOMEMADE / RESTAURANT MEALS:
- Detect ONLY the foods visually present in the image. NEVER hallucinate unseen foods.
- Estimate realistic Indian household portions: "katori", "roti", "bowl", "plate", "piece", "tablespoon".
- Provide calibrated nutrition estimates for each identified dish.
- Set source="ai_estimate".

4. FOR UNCLEAR / NON-FOOD IMAGES:
- If the image is blurry, corrupted, or does not contain food:
  - Set isFood=false, classification="unclear", confidenceLevel="low", foods=[].
  - Provide a polite explanatory message.

5. OUTPUT FORMAT:
Respond ONLY with a valid JSON object matching this exact TypeScript structure:
{
  "isFood": boolean,
  "classification": "packaged_food" | "homemade_meal" | "restaurant_meal" | "nutrition_label" | "multiple_items" | "unclear",
  "brand": string | null,
  "productName": string | null,
  "variant": string | null,
  "confidenceLevel": "high" | "medium" | "low",
  "source": "package_label" | "ai_estimate",
  "needsLabelVerification": boolean,
  "message": string,
  "foods": [
    {
      "name": string,
      "brand": string,
      "quantity": number,
      "unit": "g" | "ml" | "katori" | "bowl" | "glass" | "roti" | "piece" | "plate" | "tablespoon" | "teaspoon" | "cup" | "serving",
      "nutrition": {
        "calories": number,
        "protein": number,
        "carbs": number,
        "fat": number,
        "fibre": number
      },
      "source": "package_label" | "ai_estimate",
      "confidenceLevel": "high" | "medium" | "low",
      "alternatives": string[],
      "notes": string
    }
  ]
}`;

async function callGeminiVision(apiKey: string, base64Images: { mimeType: string; data: string }[]): Promise<VisionResponseJSON> {
  const models = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-3.7-flash'];
  let lastError = '';

  const parts: unknown[] = [
    { text: SYSTEM_INSTRUCTION },
    { text: 'Analyze these image(s) of food/packaging and return structured JSON.' },
  ];

  for (const img of base64Images) {
    parts.push({
      inline_data: {
        mime_type: img.mimeType,
        data: img.data,
      },
    });
  }

  for (const model of models) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const textOutput = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textOutput) {
          return JSON.parse(textOutput) as VisionResponseJSON;
        }
      } else {
        lastError = await response.text();
      }
    } catch (err: unknown) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  throw new Error(`Gemini Vision API call failed on all fallback models: ${lastError}`);
}

async function callOpenAIVision(apiKey: string, base64Images: { mimeType: string; data: string }[]): Promise<VisionResponseJSON> {
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  const content: unknown[] = [
    { type: 'text', text: SYSTEM_INSTRUCTION + '\n\nAnalyze these image(s) of food/packaging and return structured JSON.' },
  ];

  for (const img of base64Images) {
    content.push({
      type: 'image_url',
      image_url: {
        url: `data:${img.mimeType};base64,${img.data}`,
        detail: 'high',
      },
    });
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content }],
      response_format: { type: 'json_object' },
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI Vision API error (${response.status}): ${errText}`);
  }

  const json = await response.json();
  const textOutput = json.choices?.[0]?.message?.content;
  if (!textOutput) {
    throw new Error('OpenAI Vision returned an empty response.');
  }

  return JSON.parse(textOutput) as VisionResponseJSON;
}

export async function POST(req: NextRequest): Promise<NextResponse<AIAnalysisResult>> {
  try {
    const formData = await req.formData();
    const imageFiles: File[] = [];

    // Accept multiple image files or single image file
    for (const [key, value] of formData.entries()) {
      if ((key === 'image' || key === 'images' || key.startsWith('image_')) && value instanceof File) {
        imageFiles.push(value);
      }
    }

    if (imageFiles.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No image file uploaded. Please upload a clear photo of your food or packaging.',
          errorCode: 'UNREADABLE_IMAGE',
          foods: [],
          isEstimated: true,
        },
        { status: 400 }
      );
    }

    // Convert uploaded files to base64
    const base64Images: { mimeType: string; data: string }[] = [];
    for (const file of imageFiles) {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      base64Images.push({
        mimeType: file.type || 'image/jpeg',
        data: base64,
      });
    }

    // Check for API Keys
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const openAIKey = process.env.OPENAI_API_KEY;

    if (!geminiKey && !openAIKey) {
      // NEVER return mock/generic food data. Return a clear error explaining missing vision provider.
      return NextResponse.json(
        {
          success: false,
          error:
            'AI Vision Service is not configured on the server (GEMINI_API_KEY or OPENAI_API_KEY required). Please add your API key in environment variables or log your food manually.',
          errorCode: 'API_KEY_MISSING',
          foods: [],
          isEstimated: true,
        },
        { status: 200 }
      );
    }

    let visionResult: VisionResponseJSON;

    if (geminiKey) {
      visionResult = await callGeminiVision(geminiKey, base64Images);
    } else if (openAIKey) {
      visionResult = await callOpenAIVision(openAIKey, base64Images);
    } else {
      throw new Error('No supported vision model provider available.');
    }

    if (!visionResult.isFood || visionResult.classification === 'unclear' || !visionResult.foods || visionResult.foods.length === 0) {
      return NextResponse.json({
        success: false,
        classification: 'unclear',
        confidenceLevel: 'low',
        error: visionResult.message || 'Could not clearly recognize food items in this photo. Please try a clearer photo or search manually.',
        errorCode: 'UNREADABLE_IMAGE',
        foods: [],
        isEstimated: true,
      });
    }

    // Sanitize and format foods list
    const sanitizedFoods: AnalyzedFoodItem[] = visionResult.foods.map(f => ({
      name: f.name || visionResult.productName || 'Detected Food Item',
      brand: f.brand || visionResult.brand || undefined,
      quantity: Number(f.quantity) || 1,
      unit: f.unit || 'serving',
      nutrition: {
        calories: Math.max(0, Math.round(Number(f.nutrition?.calories) || 0)),
        protein: Math.max(0, Math.round((Number(f.nutrition?.protein) || 0) * 10) / 10),
        carbs: Math.max(0, Math.round((Number(f.nutrition?.carbs) || 0) * 10) / 10),
        fat: Math.max(0, Math.round((Number(f.nutrition?.fat) || 0) * 10) / 10),
        fibre: Math.max(0, Math.round((Number(f.nutrition?.fibre) || 0) * 10) / 10),
      },
      source: f.source || visionResult.source || 'ai_estimate',
      confidenceLevel: f.confidenceLevel || visionResult.confidenceLevel || 'medium',
      alternatives: Array.isArray(f.alternatives) ? f.alternatives : undefined,
      notes: f.notes || undefined,
    }));

    return NextResponse.json({
      success: true,
      classification: visionResult.classification,
      brand: visionResult.brand || undefined,
      productName: visionResult.productName || undefined,
      variant: visionResult.variant || undefined,
      confidenceLevel: visionResult.confidenceLevel,
      source: visionResult.source,
      needsLabelVerification: Boolean(visionResult.needsLabelVerification),
      message: visionResult.message,
      foods: sanitizedFoods,
      isEstimated: true,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Unknown server error during image analysis.';
    console.error('Image analysis server error:', errMessage);

    return NextResponse.json(
      {
        success: false,
        error: `AI analysis failed: ${errMessage}. Please try another photo or enter food details manually.`,
        errorCode: 'API_ERROR',
        foods: [],
        isEstimated: true,
      },
      { status: 500 }
    );
  }
}
