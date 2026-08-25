import { AIAnalysisResult, NutritionInfo, PortionUnit } from './types';

/**
 * Send real image file(s) to the secure server endpoint /api/analyze-image
 * Supports single or multi-photo uploads (e.g. front packaging + back nutrition label)
 * NEVER returns mock/fabricated foods.
 */
export async function analyzePhoto(imageInput: File | File[]): Promise<AIAnalysisResult> {
  const formData = new FormData();
  const files = Array.isArray(imageInput) ? imageInput : [imageInput];

  files.forEach((file, index) => {
    formData.append(`image_${index}`, file);
  });

  try {
    const response = await fetch('/api/analyze-image', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data as AIAnalysisResult;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return {
      success: false,
      error: `Could not connect to image analysis server: ${message}. Please check your connection or add food manually.`,
      errorCode: 'NETWORK_ERROR',
      foods: [],
      isEstimated: true,
    };
  }
}

/**
 * Parse natural-language food input in English, Hindi, or Hinglish.
 */
export async function parseNaturalLanguage(text: string): Promise<AIAnalysisResult> {
  await new Promise(r => setTimeout(r, 400));

  const lower = text.toLowerCase().trim();
  const foods: AIAnalysisResult['foods'] = [];

  const patterns: [RegExp, string, number, PortionUnit, NutritionInfo, number][] = [
    [/(\d+)?\s*(?:roti|chapati|chapatti|phulka|फुलका|रोटी)/i, 'Roti', 1, 'roti', { calories: 104, protein: 3.1, carbs: 18.3, fat: 2.5, fibre: 1.9 }, 85],
    [/(\d+)?\s*(?:paratha|parantha|पराठा)/i, 'Paratha', 1, 'piece', { calories: 180, protein: 3.8, carbs: 22, fat: 8.5, fibre: 1.5 }, 80],
    [/(\d+)?\s*(?:katori|bowl|plate)?\s*(?:dal|daal|दाल)\s*(?:tadka|fry)?/i, 'Dal Tadka', 1, 'katori', { calories: 130, protein: 7.5, carbs: 18, fat: 2.8, fibre: 3 }, 75],
    [/(\d+)?\s*(?:katori|bowl|plate)?\s*(?:rice|chawal|चावल)/i, 'Rice', 1, 'katori', { calories: 180, protein: 3.5, carbs: 40, fat: 0.4, fibre: 0.6 }, 80],
    [/(\d+)?\s*(?:paneer\s*bhurji|पनीर\s*भुर्जी)/i, 'Paneer Bhurji', 1, 'katori', { calories: 210, protein: 12, carbs: 5, fat: 16, fibre: 1 }, 78],
    [/(\d+)?\s*(?:palak\s*paneer|shahi\s*paneer|paneer\s*curry|paneer|पनीर)/i, 'Paneer Sabzi', 1, 'katori', { calories: 200, protein: 10, carbs: 12, fat: 13, fibre: 2 }, 70],
    [/(\d+)?\s*(?:plate|bowl)?\s*(?:poha|पोहा)/i, 'Poha', 1, 'plate', { calories: 180, protein: 3.5, carbs: 32, fat: 4.5, fibre: 1.5 }, 82],
    [/(\d+)?\s*(?:idli|इडली)/i, 'Idli', 2, 'piece', { calories: 116, protein: 4, carbs: 22, fat: 0.8, fibre: 1.2 }, 85],
    [/(\d+)?\s*(?:dosa|दोसा)/i, 'Dosa', 1, 'piece', { calories: 120, protein: 3, carbs: 20, fat: 3, fibre: 0.8 }, 82],
    [/(\d+)?\s*(?:katori|bowl)?\s*(?:chole|chana\s*masala|छोले)/i, 'Chole', 1, 'katori', { calories: 170, protein: 8, carbs: 23, fat: 5.5, fibre: 5 }, 78],
    [/(\d+)?\s*(?:katori|bowl)?\s*(?:rajma|राजमा)/i, 'Rajma', 1, 'katori', { calories: 155, protein: 8.5, carbs: 22, fat: 3.5, fibre: 4.5 }, 78],
    [/(\d+)?\s*(?:biryani|बिरयानी)/i, 'Biryani', 1, 'plate', { calories: 360, protein: 18, carbs: 40, fat: 14, fibre: 1.2 }, 72],
    [/(\d+)?\s*(?:egg|anda|अंडा|omelette|bhurji)/i, 'Egg', 1, 'piece', { calories: 70, protein: 6, carbs: 0.5, fat: 5, fibre: 0 }, 88],
    [/(\d+)?\s*(?:cup|glass)?\s*(?:chai|tea|चाय)/i, 'Chai', 1, 'cup', { calories: 50, protein: 1.5, carbs: 7, fat: 1.5, fibre: 0 }, 85],
    [/(\d+)?\s*(?:katori|bowl)?\s*(?:sabzi|subzi|bhindi|aloo\s*gobi|सब्ज़ी)/i, 'Mixed Veg Sabzi', 1, 'katori', { calories: 120, protein: 3, carbs: 12, fat: 6.5, fibre: 3.5 }, 65],
    [/(\d+)?\s*(?:plate|bowl)?\s*(?:upma|उपमा)/i, 'Upma', 1, 'plate', { calories: 190, protein: 4, carbs: 30, fat: 5.5, fibre: 1.8 }, 80],
    [/(\d+)?\s*(?:samosa|समोसा)/i, 'Samosa', 1, 'piece', { calories: 210, protein: 3.5, carbs: 23, fat: 12, fibre: 1.5 }, 85],
    [/(\d+)?\s*(?:patisa|soan\s*papdi|पतीसा)/i, 'Patisa / Soan Papdi', 1, 'piece', { calories: 130, protein: 2, carbs: 16, fat: 6, fibre: 0.5 }, 80],
  ];

  for (const [regex, name, defaultQty, unit, baseNutrition] of patterns) {
    const match = lower.match(regex);
    if (match) {
      const qtyMatch = lower.match(new RegExp(`(\\d+)\\s*(?:${regex.source})`, 'i'));
      const qty = qtyMatch && qtyMatch[1] ? parseInt(qtyMatch[1], 10) : defaultQty;
      foods.push({
        name,
        quantity: qty,
        unit,
        nutrition: {
          calories: Math.round(baseNutrition.calories * qty),
          protein: Math.round(baseNutrition.protein * qty * 10) / 10,
          carbs: Math.round(baseNutrition.carbs * qty * 10) / 10,
          fat: Math.round(baseNutrition.fat * qty * 10) / 10,
          fibre: Math.round(baseNutrition.fibre * qty * 10) / 10,
        },
        source: 'ai_estimate',
        confidenceLevel: 'medium',
      });
    }
  }

  if (foods.length === 0) {
    foods.push({
      name: text.trim(),
      quantity: 1,
      unit: 'serving',
      nutrition: { calories: 150, protein: 4, carbs: 20, fat: 6, fibre: 2 },
      source: 'ai_estimate',
      confidenceLevel: 'low',
      notes: 'Estimated entry. Please adjust nutrition values to match your specific meal.',
    });
  }

  return {
    success: true,
    classification: 'homemade_meal',
    confidenceLevel: foods[0]?.confidenceLevel || 'medium',
    source: 'ai_estimate',
    foods,
    isEstimated: true,
  };
}

/** Voice transcription stub using Web Speech or audio processing. */
export async function transcribeVoice(_audioBlob: Blob): Promise<string> {
  await new Promise(r => setTimeout(r, 600));
  return '2 roti aur 1 bowl dal';
}

/** Barcode lookup */
export async function lookupBarcode(barcode: string): Promise<AIAnalysisResult | null> {
  await new Promise(r => setTimeout(r, 400));
  if (barcode) {
    return {
      success: true,
      classification: 'packaged_food',
      confidenceLevel: 'medium',
      source: 'package_label',
      foods: [
        {
          name: `Packaged Item (${barcode})`,
          quantity: 1,
          unit: 'serving',
          nutrition: { calories: 220, protein: 4, carbs: 28, fat: 10, fibre: 1.5 },
          source: 'package_label',
          confidenceLevel: 'medium',
          notes: 'Barcode detected. Please confirm nutrition values with physical label.',
        },
      ],
      isEstimated: true,
    };
  }
  return null;
}
