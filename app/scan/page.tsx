'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Camera, Upload, Mic, MicOff, Barcode, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { analyzePhoto, parseNaturalLanguage, transcribeVoice, lookupBarcode } from '@/lib/ai-service';
import { addMealEntry, todayStr, uid, addRecentFood } from '@/lib/store';
import { Disclaimer } from '@/components/ui/Disclaimer';
import type { AIAnalysisResult, MealType, PortionUnit, NutritionInfo } from '@/lib/types';

type Mode = 'photo' | 'text' | 'voice' | 'barcode';

interface EditableFood {
  name: string;
  quantity: number;
  unit: PortionUnit;
  nutrition: NutritionInfo;
  confidence: number;
  oilGhee: number;
  showIngredients: boolean;
}

function ScanPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get('mode') as Mode) || 'text';
  const mealType = (searchParams.get('meal') as MealType) || 'breakfast';
  const initialText = searchParams.get('text') || '';

  const [mode, setMode] = useState<Mode>(initialMode);
  const [textInput, setTextInput] = useState(initialText);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<EditableFood[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>(mealType);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleResult = (result: AIAnalysisResult) => {
    setResults(result.foods.map(f => ({ ...f, oilGhee: 0, showIngredients: false })));
    setShowResults(true);
  };

  useEffect(() => {
    if (initialText) {
      setLoading(true);
      parseNaturalLanguage(initialText)
        .then(res => handleResult(res))
        .finally(() => setLoading(false));
    }
  }, [initialText]);

  const handlePhoto = async (file: File) => {
    setLoading(true);
    try {
      const result = await analyzePhoto(file);
      handleResult(result);
    } finally { setLoading(false); }
  };

  const handleText = async () => {
    if (!textInput.trim()) return;
    setLoading(true);
    try {
      const result = await parseNaturalLanguage(textInput);
      handleResult(result);
    } finally { setLoading(false); }
  };

  const handleVoice = async () => {
    if (isRecording) {
      setIsRecording(false);
      setLoading(true);
      try {
        const text = await transcribeVoice(new Blob());
        setTextInput(text);
        const result = await parseNaturalLanguage(text);
        handleResult(result);
      } finally { setLoading(false); }
    } else {
      setIsRecording(true);
    }
  };

  const handleBarcode = async () => {
    if (!barcodeInput.trim()) return;
    setLoading(true);
    try {
      const result = await lookupBarcode(barcodeInput);
      if (result) handleResult(result);
    } finally { setLoading(false); }
  };

  const updateFood = (idx: number, updates: Partial<EditableFood>) => {
    setResults(prev => prev.map((f, i) => i === idx ? { ...f, ...updates } : f));
  };

  const updateFoodNutrition = (idx: number, key: keyof NutritionInfo, value: number) => {
    setResults(prev => prev.map((f, i) => i === idx ? { ...f, nutrition: { ...f.nutrition, [key]: value } } : f));
  };

  const saveAll = () => {
    const today = todayStr();
    results.forEach(food => {
      const oilCalories = food.oilGhee * 45;
      addMealEntry(today, {
        id: uid(),
        foodName: food.name,
        mealType: selectedMeal,
        quantity: food.quantity,
        unit: food.unit,
        nutrition: {
          calories: food.nutrition.calories + oilCalories,
          protein: food.nutrition.protein,
          carbs: food.nutrition.carbs,
          fat: food.nutrition.fat + (food.oilGhee * 5),
          fibre: food.nutrition.fibre,
        },
        isEstimated: true,
        confidence: food.confidence,
        oilGheeAdjustment: oilCalories,
        timestamp: Date.now(),
      });
      addRecentFood(food.name.toLowerCase().replace(/\s+/g, '-'));
    });
    setSaved(true);
    setTimeout(() => router.push('/'), 1000);
  };

  const modes: { key: Mode; label: string; icon: React.ElementType }[] = [
    { key: 'text', label: 'Text', icon: () => <span style={{ fontSize: 16 }}>✍️</span> },
    { key: 'photo', label: 'Photo', icon: Camera },
    { key: 'voice', label: 'Voice', icon: Mic },
    { key: 'barcode', label: 'Barcode', icon: Barcode },
  ];

  return (
    <main className="container section animate-fadeIn">
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Log Your Meal</h1>

      {/* Mode Tabs */}
      <div className="flex gap-1 mb-5 p-1 rounded-lg" style={{ background: 'var(--gray-100)' }}>
        {modes.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => { setMode(key); setShowResults(false); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md transition-all"
            style={{
              fontSize: 13, fontWeight: mode === key ? 600 : 400,
              background: mode === key ? 'var(--surface)' : 'transparent',
              boxShadow: mode === key ? 'var(--shadow)' : 'none',
              color: mode === key ? 'var(--text)' : 'var(--text-secondary)',
            }}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      {/* Meal Type Selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map(mt => (
          <button
            key={mt}
            onClick={() => setSelectedMeal(mt)}
            className="btn btn-sm"
            style={{
              background: selectedMeal === mt ? 'var(--green-700)' : 'var(--surface)',
              color: selectedMeal === mt ? 'white' : 'var(--text)',
              border: `1px solid ${selectedMeal === mt ? 'var(--green-700)' : 'var(--border)'}`,
              textTransform: 'capitalize', flexShrink: 0,
            }}
          >
            {mt}
          </button>
        ))}
      </div>

      {/* Input Area */}
      {mode === 'text' && (
        <div className="mb-4">
          <textarea
            className="input"
            rows={3}
            placeholder='Type your meal in any language: "2 roti aur 1 bowl dal" or "1 plate poha"'
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleText(); } }}
            style={{ resize: 'none' }}
          />
          <button onClick={handleText} className="btn btn-primary mt-2 w-full" disabled={loading || !textInput.trim()}>
            {loading ? <span className="spinner" /> : 'Analyze Meal'}
          </button>
        </div>
      )}

      {mode === 'photo' && (
        <div className="mb-4">
          <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handlePhoto(f); }} />
          <div
            className="card flex flex-col items-center justify-center gap-3 cursor-pointer"
            style={{ padding: 40, border: '2px dashed var(--border)' }}
            onClick={() => fileRef.current?.click()}
          >
            {loading ? (
              <><span className="spinner" /><p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Analyzing your meal...</p></>
            ) : (
              <>
                <Camera size={32} style={{ color: 'var(--green-600)' }} />
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center' }}>
                  Take a photo or upload an image of your meal
                </p>
                <div className="flex gap-2">
                  <button className="btn btn-primary btn-sm"><Camera size={14} /> Camera</button>
                  <button className="btn btn-secondary btn-sm"><Upload size={14} /> Upload</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {mode === 'voice' && (
        <div className="mb-4 flex flex-col items-center gap-4">
          <button
            onClick={handleVoice}
            className="flex items-center justify-center rounded-full"
            style={{
              width: 80, height: 80,
              background: isRecording ? 'var(--red)' : 'var(--green-700)',
              color: 'white', border: 'none', cursor: 'pointer',
              boxShadow: isRecording ? '0 0 0 8px rgba(230,57,70,0.2)' : 'var(--shadow-md)',
              transition: 'all 0.3s',
            }}
          >
            {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
          </button>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            {loading ? 'Processing...' : isRecording ? 'Listening... Tap to stop' : 'Tap to start recording'}
          </p>
          {textInput && <p style={{ fontSize: 13, color: 'var(--text)' }}>Heard: &ldquo;{textInput}&rdquo;</p>}
        </div>
      )}

      {mode === 'barcode' && (
        <div className="mb-4">
          <input className="input mb-2" placeholder="Enter barcode number" value={barcodeInput} onChange={e => setBarcodeInput(e.target.value)} />
          <button onClick={handleBarcode} className="btn btn-primary w-full" disabled={loading || !barcodeInput.trim()}>
            {loading ? <span className="spinner" /> : <><Barcode size={16} /> Look Up</>}
          </button>
        </div>
      )}

      {/* Results */}
      {showResults && results.length > 0 && (
        <div className="animate-scaleIn">
          <div className="card mb-3" style={{ padding: '10px 14px', background: 'var(--green-100)', border: '1px solid var(--green-300)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-orange" style={{ fontSize: 11, fontWeight: 700 }}>Estimated, not exact</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green-900)' }}>AI Nutrition Estimate</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              Values are approximations based on standard household recipes. Adjust serving size, oil/ghee, or macros below before saving to your diary.
            </p>
          </div>

          {results.map((food, idx) => (
            <div key={idx} className="card mb-3" style={{ padding: 16 }}>
              <div className="flex items-center justify-between mb-3">
                <input
                  className="input"
                  style={{ fontWeight: 600, fontSize: 15, border: 'none', padding: '0', background: 'transparent' }}
                  value={food.name}
                  onChange={e => updateFood(idx, { name: e.target.value })}
                />
                <span className="badge" style={{
                  background: food.confidence > 70 ? 'var(--green-200)' : 'var(--orange)',
                  color: food.confidence > 70 ? 'var(--green-900)' : '#92400E',
                  fontSize: 10,
                }}>
                  {food.confidence}% confidence
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <label className="label">Quantity</label>
                  <input type="number" className="input" value={food.quantity} min={0.5} step={0.5} onChange={e => updateFood(idx, { quantity: parseFloat(e.target.value) || 1 })} />
                </div>
                <div>
                  <label className="label">Unit</label>
                  <select className="input" value={food.unit} onChange={e => updateFood(idx, { unit: e.target.value as PortionUnit })}>
                    {['katori', 'bowl', 'roti', 'piece', 'plate', 'glass', 'cup', 'tablespoon', 'teaspoon', 'serving', 'g', 'ml'].map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Nutrition Edit Grid */}
              <div className="grid grid-cols-5 gap-1.5 mb-3">
                {([['calories', 'Cal', 'kcal'], ['protein', 'Prot', 'g'], ['carbs', 'Carb', 'g'], ['fat', 'Fat', 'g'], ['fibre', 'Fibre', 'g']] as const).map(([key, label, unit]) => (
                  <div key={key}>
                    <label className="label" style={{ fontSize: 10 }}>{label}</label>
                    <input
                      type="number" className="input" style={{ padding: '6px 4px', fontSize: 13, textAlign: 'center' }}
                      value={Math.round(food.nutrition[key])}
                      onChange={e => updateFoodNutrition(idx, key, parseFloat(e.target.value) || 0)}
                    />
                    <span style={{ fontSize: 9, color: 'var(--text-secondary)', display: 'block', textAlign: 'center' }}>{unit}</span>
                  </div>
                ))}
              </div>

              {/* Oil/Ghee Adjustment */}
              <div className="flex items-center gap-3 mb-2">
                <label className="label" style={{ margin: 0, whiteSpace: 'nowrap', fontSize: 12 }}>Oil/Ghee (tsp):</label>
                <input type="range" min={0} max={5} step={0.5} value={food.oilGhee} onChange={e => updateFood(idx, { oilGhee: parseFloat(e.target.value) })} className="flex-1" style={{ accentColor: 'var(--green-600)' }} />
                <span style={{ fontSize: 13, fontWeight: 500, minWidth: 24 }}>{food.oilGhee}</span>
                {food.oilGhee > 0 && <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>+{Math.round(food.oilGhee * 45)} kcal</span>}
              </div>

              {/* Toggle ingredients view */}
              <button onClick={() => updateFood(idx, { showIngredients: !food.showIngredients })} className="btn btn-ghost btn-sm" style={{ fontSize: 12, padding: '4px 8px' }}>
                {food.showIngredients ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {food.showIngredients ? 'Quick View' : 'Ingredients View'}
              </button>
              {food.showIngredients && (
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '8px 0', lineHeight: 1.6 }}>
                  <p>For mixed dishes, individual ingredient nutrition may vary. The values above are a composite estimate. Adjust individual macros as needed.</p>
                </div>
              )}
            </div>
          ))}

          {/* Total */}
          <div className="card" style={{ padding: '12px 16px', marginBottom: 16, background: 'var(--green-100)' }}>
            <div className="flex justify-between items-center">
              <span style={{ fontWeight: 600, fontSize: 14 }}>Total</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--green-800)' }}>
                {Math.round(results.reduce((s, f) => s + f.nutrition.calories + f.oilGhee * 45, 0))} kcal
              </span>
            </div>
          </div>

          <button onClick={saveAll} className="btn btn-primary btn-lg w-full" disabled={saved}>
            {saved ? '✓ Saved to Diary' : `Save to ${selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}`}
          </button>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <Disclaimer text="AI-estimated values are approximations. Always review and adjust nutrition data. These are not medical-grade measurements." />
      </div>
    </main>
  );
}

export default function ScanPage() {
  return <Suspense fallback={<main className="container section"><p>Loading...</p></main>}><ScanPageInner /></Suspense>;
}
