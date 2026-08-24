import { AIAnalysisResult, NutritionInfo, PortionUnit } from './types';

// AI Service Abstraction
// These are mock implementations that return realistic results.
// Replace with real API calls (e.g., Google Vision, OpenAI, Whisper) when ready.

const MOCK_PHOTO_RESULTS: Record<string, AIAnalysisResult> = {
  default: {
    foods: [
      { name: 'Roti', quantity: 2, unit: 'roti', nutrition: { calories: 208, protein: 6.2, carbs: 36.6, fat: 5, fibre: 3.8 }, confidence: 82, alternatives: ['Chapati', 'Phulka'] },
      { name: 'Dal Fry', quantity: 1, unit: 'katori', nutrition: { calories: 140, protein: 7, carbs: 17, fat: 4.5, fibre: 3 }, confidence: 75, alternatives: ['Toor Dal', 'Moong Dal'] },
      { name: 'Green Salad', quantity: 1, unit: 'katori', nutrition: { calories: 25, protein: 1, carbs: 5, fat: 0.2, fibre: 2 }, confidence: 70 },
    ],
    isEstimated: true,
  },
};

/** Analyze a food photo. Returns estimated food items with nutrition. */
export async function analyzePhoto(_imageFile: File): Promise<AIAnalysisResult> {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 1500));
  return MOCK_PHOTO_RESULTS.default;
}

/** Parse natural-language food input in English, Hindi, or Hinglish. */
export async function parseNaturalLanguage(text: string): Promise<AIAnalysisResult> {
  await new Promise(r => setTimeout(r, 800));

  const lower = text.toLowerCase();
  const foods: AIAnalysisResult['foods'] = [];

  // Simple keyword-based parser for common phrases
  const patterns: [RegExp, string, number, PortionUnit, NutritionInfo, number][] = [
    [/(\d+)?\s*roti|chapati|chapatti|रोटी/i, 'Roti', 1, 'roti', { calories: 104, protein: 3.1, carbs: 18.3, fat: 2.5, fibre: 1.9 }, 85],
    [/(\d+)?\s*paratha|पराठा/i, 'Paratha', 1, 'piece', { calories: 180, protein: 3.8, carbs: 22, fat: 8.5, fibre: 1.5 }, 80],
    [/dal|daal|दाल/i, 'Dal', 1, 'katori', { calories: 130, protein: 7.5, carbs: 18, fat: 2.8, fibre: 3 }, 75],
    [/rice|chawal|चावल/i, 'Rice', 1, 'katori', { calories: 180, protein: 3.5, carbs: 40, fat: 0.4, fibre: 0.6 }, 80],
    [/paneer\s*bhurji|पनीर\s*भुर्जी/i, 'Paneer Bhurji', 1, 'katori', { calories: 210, protein: 12, carbs: 5, fat: 16, fibre: 1 }, 78],
    [/paneer|पनीर/i, 'Paneer Curry', 1, 'katori', { calories: 200, protein: 10, carbs: 12, fat: 13, fibre: 2 }, 70],
    [/poha|पोहा/i, 'Poha', 1, 'plate', { calories: 180, protein: 3.5, carbs: 32, fat: 4.5, fibre: 1.5 }, 82],
    [/idli|इडली/i, 'Idli', 2, 'piece', { calories: 116, protein: 4, carbs: 22, fat: 0.8, fibre: 1.2 }, 85],
    [/dosa|दोसा/i, 'Dosa', 1, 'piece', { calories: 120, protein: 3, carbs: 20, fat: 3, fibre: 0.8 }, 82],
    [/chole|छोले/i, 'Chole', 1, 'katori', { calories: 170, protein: 8, carbs: 23, fat: 5.5, fibre: 5 }, 78],
    [/rajma|राजमा/i, 'Rajma', 1, 'katori', { calories: 155, protein: 8.5, carbs: 22, fat: 3.5, fibre: 4.5 }, 78],
    [/biryani|बिरयानी/i, 'Biryani', 1, 'plate', { calories: 360, protein: 18, carbs: 40, fat: 14, fibre: 1.2 }, 72],
    [/egg|anda|अंडा/i, 'Egg', 1, 'piece', { calories: 70, protein: 6, carbs: 0.5, fat: 5, fibre: 0 }, 88],
    [/chai|tea|चाय/i, 'Chai', 1, 'cup', { calories: 50, protein: 1.5, carbs: 7, fat: 1.5, fibre: 0 }, 85],
    [/sabzi|सब्ज़ी|subzi/i, 'Mixed Veg Sabzi', 1, 'katori', { calories: 120, protein: 3, carbs: 12, fat: 6.5, fibre: 3.5 }, 65],
    [/upma|उपमा/i, 'Upma', 1, 'plate', { calories: 190, protein: 4, carbs: 30, fat: 5.5, fibre: 1.8 }, 80],
    [/samosa|समोसा/i, 'Samosa', 1, 'piece', { calories: 210, protein: 3.5, carbs: 23, fat: 12, fibre: 1.5 }, 85],
  ];

  // Extract quantity prefix (e.g., "2 roti" → quantity 2)
  for (const [regex, name, defaultQty, unit, baseNutrition, confidence] of patterns) {
    const match = lower.match(regex);
    if (match) {
      // Look for quantity before the matched food word
      const qtyMatch = lower.match(new RegExp(`(\\d+)\\s*(?:${regex.source})`, 'i'));
      const qty = qtyMatch ? parseInt(qtyMatch[1]) : defaultQty;
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
        confidence,
      });
    }
  }

  if (foods.length === 0) {
    foods.push({
      name: text.trim(),
      quantity: 1,
      unit: 'serving',
      nutrition: { calories: 200, protein: 5, carbs: 25, fat: 8, fibre: 2 },
      confidence: 40,
      alternatives: ['Please search our food database for more accurate values'],
    });
  }

  return { foods, isEstimated: true };
}

/** Voice transcription stub. In production, use Web Speech API or Whisper. */
export async function transcribeVoice(_audioBlob: Blob): Promise<string> {
  await new Promise(r => setTimeout(r, 1000));
  return '2 roti aur 1 bowl dal';
}

/** Barcode lookup stub. In production, integrate Open Food Facts API. */
export async function lookupBarcode(barcode: string): Promise<AIAnalysisResult | null> {
  await new Promise(r => setTimeout(r, 500));
  if (barcode) {
    return {
      foods: [{
        name: `Packaged Food (${barcode})`,
        quantity: 1,
        unit: 'serving',
        nutrition: { calories: 250, protein: 6, carbs: 35, fat: 9, fibre: 2 },
        confidence: 60,
        alternatives: ['Check label for accurate values'],
      }],
      isEstimated: true,
    };
  }
  return null;
}
