'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Camera,
  Upload,
  Mic,
  MicOff,
  Barcode,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Tag,
  FileText,
} from 'lucide-react';
import { analyzePhoto, parseNaturalLanguage, transcribeVoice, lookupBarcode } from '@/lib/ai-service';
import { addMealEntry, todayStr, uid, addRecentFood } from '@/lib/store';
import { Disclaimer } from '@/components/ui/Disclaimer';
import type {
  AIAnalysisResult,
  MealType,
  PortionUnit,
  NutritionInfo,
  FoodClassification,
  ConfidenceRating,
  NutritionSource,
  AnalyzedFoodItem,
} from '@/lib/types';

type Mode = 'photo' | 'text' | 'voice' | 'barcode';

interface EditableFoodItem extends AnalyzedFoodItem {
  oilGhee: number;
  showDetails: boolean;
}

function ScanPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get('mode') as Mode) || 'photo';
  const mealType = (searchParams.get('meal') as MealType) || 'breakfast';
  const initialText = searchParams.get('text') || '';

  const [mode, setMode] = useState<Mode>(initialMode);
  const [textInput, setTextInput] = useState(initialText);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>(mealType);
  const [saved, setSaved] = useState(false);

  // Analysis State
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [foods, setFoods] = useState<EditableFoodItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  // Photos State
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [rawFiles, setRawFiles] = useState<File[]>([]);

  const fileRef = useRef<HTMLInputElement>(null);
  const backLabelRef = useRef<HTMLInputElement>(null);

  const handleAnalysisSuccess = (result: AIAnalysisResult) => {
    setAnalysisResult(result);
    if (!result.success || result.foods.length === 0) {
      setErrorMessage(result.error || result.message || 'Could not identify any food items. Please try a clearer photo or add manually.');
      setErrorCode(result.errorCode || 'UNREADABLE_IMAGE');
      setFoods([]);
    } else {
      setErrorMessage(null);
      setErrorCode(null);
      setFoods(
        result.foods.map(f => ({
          ...f,
          oilGhee: 0,
          showDetails: false,
        }))
      );
    }
  };

  useEffect(() => {
    if (initialText) {
      setMode('text');
      setLoading(true);
      parseNaturalLanguage(initialText)
        .then(res => handleAnalysisSuccess(res))
        .catch(err => {
          setErrorMessage(err.message || 'Failed to parse meal description.');
          setErrorCode('API_ERROR');
        })
        .finally(() => setLoading(false));
    }
  }, [initialText]);

  const handlePhotoUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setLoading(true);
    setErrorMessage(null);
    setErrorCode(null);

    // Create local image previews
    const previews = fileArray.map(f => URL.createObjectURL(f));
    setUploadedImages(prev => [...prev, ...previews]);
    const updatedFiles = [...rawFiles, ...fileArray];
    setRawFiles(updatedFiles);

    try {
      const result = await analyzePhoto(updatedFiles);
      handleAnalysisSuccess(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error analyzing image';
      setErrorMessage(msg);
      setErrorCode('NETWORK_ERROR');
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBackLabel = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    handlePhotoUpload(files);
  };

  const handleText = async () => {
    if (!textInput.trim()) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await parseNaturalLanguage(textInput);
      handleAnalysisSuccess(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to parse text';
      setErrorMessage(msg);
      setErrorCode('API_ERROR');
    } finally {
      setLoading(false);
    }
  };

  const handleVoice = async () => {
    setLoading(true);
    try {
      const text = await transcribeVoice(new Blob());
      setTextInput(text);
      const result = await parseNaturalLanguage(text);
      handleAnalysisSuccess(result);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Voice transcription failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleBarcode = async () => {
    if (!barcodeInput.trim()) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await lookupBarcode(barcodeInput);
      if (result) {
        handleAnalysisSuccess(result);
      } else {
        setErrorMessage(`No product found for barcode ${barcodeInput}. Please search by name.`);
        setErrorCode('UNREADABLE_IMAGE');
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Barcode lookup failed.');
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setAnalysisResult(null);
    setFoods([]);
    setErrorMessage(null);
    setErrorCode(null);
    setUploadedImages([]);
    setRawFiles([]);
    if (fileRef.current) fileRef.current.value = '';
    if (backLabelRef.current) backLabelRef.current.value = '';
  };

  const updateFood = (idx: number, updates: Partial<EditableFoodItem>) => {
    setFoods(prev => prev.map((f, i) => (i === idx ? { ...f, ...updates } : f)));
  };

  const updateFoodNutrition = (idx: number, key: keyof NutritionInfo, value: number) => {
    setFoods(prev =>
      prev.map((f, i) => (i === idx ? { ...f, nutrition: { ...f.nutrition, [key]: Math.max(0, value) } } : f))
    );
  };

  const saveAll = () => {
    const today = todayStr();
    foods.forEach(food => {
      const oilCalories = (food.oilGhee || 0) * 45;
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
          fat: food.nutrition.fat + (food.oilGhee || 0) * 5,
          fibre: food.nutrition.fibre,
        },
        isEstimated: food.source === 'ai_estimate',
        oilGheeAdjustment: oilCalories,
        timestamp: Date.now(),
      });
      addRecentFood(food.name.toLowerCase().replace(/\s+/g, '-'));
    });
    setSaved(true);
    setTimeout(() => router.push('/'), 800);
  };

  const getConfidenceBadge = (confidence: ConfidenceRating) => {
    switch (confidence) {
      case 'high':
        return { label: 'High confidence', color: 'badge-green', icon: CheckCircle2 };
      case 'medium':
        return { label: 'Needs review', color: 'badge-orange', icon: AlertCircle };
      case 'low':
      default:
        return { label: 'Could not verify', color: 'badge-red', icon: HelpCircle };
    }
  };

  const getClassificationLabel = (cls?: FoodClassification) => {
    switch (cls) {
      case 'packaged_food':
        return { label: 'Packaged Food / Product', icon: '🏷️' };
      case 'homemade_meal':
        return { label: 'Homemade Meal', icon: '🍲' };
      case 'restaurant_meal':
        return { label: 'Restaurant Meal', icon: '🍽️' };
      case 'nutrition_label':
        return { label: 'Nutrition Facts Label', icon: '📋' };
      case 'multiple_items':
        return { label: 'Multiple Items', icon: '🍱' };
      default:
        return { label: 'Food Item', icon: '🍴' };
    }
  };

  const modes: { key: Mode; label: string; icon: React.ElementType }[] = [
    { key: 'photo', label: 'Photo Scan', icon: Camera },
    { key: 'text', label: 'Text / Hinglish', icon: FileText },
    { key: 'voice', label: 'Voice Log', icon: Mic },
    { key: 'barcode', label: 'Barcode', icon: Barcode },
  ];

  return (
    <main className="container section animate-fadeIn" style={{ paddingTop: 8, paddingBottom: 60 }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: 'var(--text)' }}>Log Your Meal</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
            Real AI analysis for packaged snacks, labels & homemade Indian food
          </p>
        </div>
        <Link href="/food-search" className="btn btn-outline btn-xs no-underline" style={{ padding: '4px 10px' }}>
          <Search size={12} /> Database Search
        </Link>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-1 mb-3 p-1 rounded-lg" style={{ background: 'var(--gray-100)' }}>
        {modes.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => {
              setMode(key);
              resetUpload();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md transition-all"
            style={{
              fontSize: 13,
              fontWeight: mode === key ? 600 : 400,
              background: mode === key ? 'var(--surface)' : 'transparent',
              boxShadow: mode === key ? 'var(--shadow)' : 'none',
              color: mode === key ? 'var(--text)' : 'var(--text-secondary)',
            }}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Target Meal Type Selector */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto no-scrollbar">
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginRight: 4 }}>Meal:</span>
        {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map(mt => (
          <button
            key={mt}
            onClick={() => setSelectedMeal(mt)}
            className="btn btn-xs"
            style={{
              background: selectedMeal === mt ? 'var(--green-700)' : 'var(--surface)',
              color: selectedMeal === mt ? 'white' : 'var(--text)',
              border: `1px solid ${selectedMeal === mt ? 'var(--green-700)' : 'var(--border)'}`,
              textTransform: 'capitalize',
              padding: '4px 10px',
              fontWeight: selectedMeal === mt ? 600 : 400,
            }}
          >
            {mt}
          </button>
        ))}
      </div>

      {/* Input Mode 1: Photo */}
      {mode === 'photo' && (
        <div className="mb-4">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={e => {
              if (e.target.files) handlePhotoUpload(e.target.files);
            }}
          />
          <input
            ref={backLabelRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={e => handleAddBackLabel(e.target.files)}
          />

          {uploadedImages.length === 0 && !loading && (
            <div
              className="card flex flex-col items-center justify-center gap-3 cursor-pointer"
              style={{ padding: '32px 20px', border: '2px dashed var(--green-400)', background: 'var(--surface)' }}
              onClick={() => fileRef.current?.click()}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'var(--green-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--green-700)',
                }}
              >
                <Camera size={28} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
                  Take a photo or upload packaging / meal
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', margin: '4px auto 0', maxWidth: 360 }}>
                  Works with packaged products (e.g. Haldiram&apos;s Patisa), nutrition labels, and homemade Indian plates.
                </p>
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    fileRef.current?.click();
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <Camera size={14} /> Snap Photo
                </button>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    fileRef.current?.click();
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <Upload size={14} /> Choose File
                </button>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 4,
                }}
              >
                <span>🔒 Privacy Protected: Photos are processed in real-time only to calculate nutrition estimates and never used for public model training.</span>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="card flex flex-col items-center justify-center gap-3" style={{ padding: '40px 20px' }}>
              <span className="spinner" style={{ width: 28, height: 28 }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
                  Analyzing with Multimodal Vision AI...
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                  Reading product text, brand packaging & nutrition data
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input Mode 2: Text */}
      {mode === 'text' && (
        <div className="mb-4">
          <textarea
            className="input"
            rows={3}
            placeholder='Type what you ate in English or Hinglish: "2 roti aur 1 bowl dal tadka" or "Haldiram Patisa 2 pieces"'
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleText();
              }
            }}
            style={{ resize: 'none' }}
          />
          <button
            onClick={handleText}
            className="btn btn-primary mt-2 w-full"
            disabled={loading || !textInput.trim()}
          >
            {loading ? <span className="spinner" /> : <><Sparkles size={16} /> Analyze Text Description</>}
          </button>
        </div>
      )}

      {/* Input Mode 3: Voice */}
      {mode === 'voice' && (
        <div className="card mb-4 flex flex-col items-center gap-3" style={{ padding: 24 }}>
          <button
            onClick={handleVoice}
            className="flex items-center justify-center rounded-full"
            style={{
              width: 70,
              height: 70,
              background: 'var(--green-700)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <Mic size={28} />
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Tap to Speak</div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
              Speak naturally in Hindi or English (e.g. &ldquo;Maine do roti aur paneer khaya&rdquo;)
            </p>
          </div>
        </div>
      )}

      {/* Input Mode 4: Barcode */}
      {mode === 'barcode' && (
        <div className="card mb-4" style={{ padding: 20 }}>
          <label className="label">Barcode Number (EAN / UPC)</label>
          <div className="flex gap-2">
            <input
              className="input flex-1"
              placeholder="e.g. 8901414000123"
              value={barcodeInput}
              onChange={e => setBarcodeInput(e.target.value)}
            />
            <button
              onClick={handleBarcode}
              className="btn btn-primary"
              disabled={loading || !barcodeInput.trim()}
            >
              {loading ? <span className="spinner" /> : <><Barcode size={16} /> Look Up</>}
            </button>
          </div>
        </div>
      )}

      {/* ERROR / UNCERTAIN RESULT STATE (Non-negotiable Rule 3) */}
      {errorMessage && (
        <div className="card mb-4 animate-scaleIn" style={{ padding: 18, border: '1.5px solid var(--red)', background: '#FEF2F2' }}>
          <div className="flex items-start gap-3">
            <AlertCircle size={22} style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#991B1B', marginBottom: 4 }}>
                {errorCode === 'API_KEY_MISSING' ? 'AI Vision API Key Not Configured' : 'Could Not Verify Food Photo'}
              </div>
              <p style={{ fontSize: 13, color: '#7F1D1D', lineHeight: 1.5, margin: '0 0 12px' }}>
                {errorMessage}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    resetUpload();
                    fileRef.current?.click();
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ background: '#FEE2E2', color: '#991B1B', borderColor: '#FCA5A5' }}
                >
                  <RefreshCw size={13} /> Try Another Photo
                </button>
                <Link
                  href="/food-search"
                  className="btn btn-primary btn-sm no-underline"
                  style={{ background: 'var(--green-700)' }}
                >
                  <Search size={13} /> Add Food Manually / Search
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    resetUpload();
                    backLabelRef.current?.click();
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ background: 'white' }}
                >
                  <Camera size={13} /> Scan Nutrition Label
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS RESULTS SECTION */}
      {foods.length > 0 && (
        <div className="animate-scaleIn">
          {/* Uploaded Images Strip */}
          {uploadedImages.length > 0 && (
            <div className="card mb-3" style={{ padding: '10px 14px' }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Uploaded Photo(s):
                </span>
                <button
                  type="button"
                  onClick={resetUpload}
                  className="btn btn-ghost btn-xs"
                  style={{ fontSize: 11, color: 'var(--red)' }}
                >
                  Remove & Rescan
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {uploadedImages.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 8,
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      flexShrink: 0,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Uploaded food ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
                {/* Add Another Label Button */}
                <button
                  type="button"
                  onClick={() => backLabelRef.current?.click()}
                  className="card flex flex-col items-center justify-center gap-1 cursor-pointer"
                  style={{
                    width: 72,
                    height: 72,
                    border: '1.5px dashed var(--green-600)',
                    background: 'var(--green-100)',
                    flexShrink: 0,
                    padding: 4,
                  }}
                  title="Add nutrition label photo"
                >
                  <Plus size={16} style={{ color: 'var(--green-700)' }} />
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--green-900)', textAlign: 'center', lineHeight: 1.1 }}>
                    + Back Label
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Classification & Confidence Header Badge Bar */}
          <div
            className="card mb-3"
            style={{
              padding: '10px 14px',
              background: 'var(--surface)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="badge" style={{ background: 'var(--gray-100)', color: 'var(--text)', fontSize: 11 }}>
                {getClassificationLabel(analysisResult?.classification).icon}{' '}
                {getClassificationLabel(analysisResult?.classification).label}
              </span>
              {analysisResult?.brand && (
                <span className="badge badge-blue" style={{ fontSize: 11 }}>
                  Brand: {analysisResult.brand}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`badge ${getConfidenceBadge(foods[0]?.confidenceLevel || 'medium').color}`}
                style={{ fontSize: 11 }}
              >
                {getConfidenceBadge(foods[0]?.confidenceLevel || 'medium').label}
              </span>
              <span
                className="badge"
                style={{
                  background: foods[0]?.source === 'package_label' ? 'var(--green-200)' : '#FEF3C7',
                  color: foods[0]?.source === 'package_label' ? 'var(--green-900)' : '#92400E',
                  fontSize: 11,
                }}
              >
                Source: {foods[0]?.source === 'package_label' ? 'Package label' : 'AI estimate'}
              </span>
            </div>
          </div>

          {/* Prompt if back label is needed */}
          {analysisResult?.needsLabelVerification && (
            <div
              className="card mb-3 animate-fadeIn"
              style={{
                padding: '10px 14px',
                background: '#FEF3C7',
                border: '1.5px solid #FCD34D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={16} style={{ color: '#B45309', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#92400E', fontWeight: 500 }}>
                  Product identified, but serving size/nutrition label needs verification.
                </span>
              </div>
              <button
                type="button"
                onClick={() => backLabelRef.current?.click()}
                className="btn btn-xs no-underline"
                style={{
                  background: '#B45309',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 11,
                  padding: '4px 10px',
                  flexShrink: 0,
                }}
              >
                <Camera size={12} /> Scan Back Label
              </button>
            </div>
          )}

          {/* Editable Food Items Cards */}
          {foods.map((food, idx) => (
            <div key={idx} className="card mb-3" style={{ padding: 16 }}>
              <div className="flex items-center justify-between mb-2">
                <div style={{ flex: 1, marginRight: 8 }}>
                  <label className="label" style={{ fontSize: 11, marginBottom: 2 }}>Detected Food / Product Name</label>
                  <input
                    className="input"
                    style={{ fontWeight: 700, fontSize: 15, padding: '6px 10px', minHeight: 38 }}
                    value={food.name}
                    onChange={e => updateFood(idx, { name: e.target.value })}
                  />
                </div>
              </div>

              {/* Quantity and Serving Unit */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <label className="label" style={{ fontSize: 11 }}>Quantity</label>
                  <input
                    type="number"
                    className="input"
                    value={food.quantity}
                    min={0.25}
                    step={0.25}
                    onChange={e => updateFood(idx, { quantity: parseFloat(e.target.value) || 1 })}
                    style={{ minHeight: 38 }}
                  />
                </div>
                <div>
                  <label className="label" style={{ fontSize: 11 }}>Serving Unit</label>
                  <select
                    className="input"
                    value={food.unit}
                    onChange={e => updateFood(idx, { unit: e.target.value as PortionUnit })}
                    style={{ minHeight: 38 }}
                  >
                    {[
                      'piece',
                      'serving',
                      'g',
                      'ml',
                      'katori',
                      'bowl',
                      'plate',
                      'roti',
                      'glass',
                      'cup',
                      'tablespoon',
                      'teaspoon',
                    ].map(u => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Nutrition Edit Grid */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="label" style={{ fontSize: 11, margin: 0 }}>
                    Nutrition ({food.unit === 'g' || food.unit === 'ml' ? 'Per 100g/ml' : 'Per Serving'})
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Click any value to edit</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 mb-3">
                  {(
                    [
                      ['calories', 'Calories', 'kcal'],
                      ['protein', 'Protein', 'g'],
                      ['carbs', 'Carbs', 'g'],
                      ['fat', 'Fat', 'g'],
                      ['fibre', 'Fibre', 'g'],
                    ] as const
                  ).map(([key, label, unit]) => (
                    <div key={key}>
                      <label className="label" style={{ fontSize: 10, textAlign: 'center', marginBottom: 2 }}>
                        {label}
                      </label>
                      <input
                        type="number"
                        className="input"
                        style={{ padding: '6px 2px', fontSize: 13, textAlign: 'center', minHeight: 36, fontWeight: 600 }}
                        value={Math.round(food.nutrition[key])}
                        onChange={e => updateFoodNutrition(idx, key, parseFloat(e.target.value) || 0)}
                      />
                      <span style={{ fontSize: 9, color: 'var(--text-secondary)', display: 'block', textAlign: 'center', marginTop: 1 }}>
                        {unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Oil/Ghee Adjustment for cooked meals */}
              {analysisResult?.classification !== 'packaged_food' && (
                <div className="flex items-center gap-3 mb-2 p-2 rounded-md" style={{ background: 'var(--gray-100)' }}>
                  <label className="label" style={{ margin: 0, whiteSpace: 'nowrap', fontSize: 12 }}>
                    Extra Tadka / Ghee (tsp):
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    step={0.5}
                    value={food.oilGhee || 0}
                    onChange={e => updateFood(idx, { oilGhee: parseFloat(e.target.value) || 0 })}
                    className="flex-1"
                    style={{ accentColor: 'var(--green-600)' }}
                  />
                  <span style={{ fontSize: 12, fontWeight: 600, minWidth: 20 }}>{food.oilGhee || 0}</span>
                  {(food.oilGhee || 0) > 0 && (
                    <span style={{ fontSize: 11, color: 'var(--green-800)', fontWeight: 600 }}>
                      +{Math.round((food.oilGhee || 0) * 45)} kcal
                    </span>
                  )}
                </div>
              )}

              {/* Details and notes */}
              {food.notes && (
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '4px 0 0', fontStyle: 'italic' }}>
                  ℹ️ {food.notes}
                </p>
              )}
            </div>
          ))}

          {/* Total Summary Card */}
          <div className="card mb-4" style={{ padding: '12px 16px', background: 'var(--green-100)', border: '1px solid var(--green-300)' }}>
            <div className="flex justify-between items-center">
              <div>
                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--green-900)' }}>Total Meal Calories</span>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  {foods.length} item(s) • Ready to log in {selectedMeal}
                </div>
              </div>
              <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--green-800)' }}>
                {Math.round(foods.reduce((s, f) => s + f.nutrition.calories + (f.oilGhee || 0) * 45, 0))} kcal
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={saveAll}
              className="btn btn-primary btn-lg w-full"
              style={{ fontSize: 15, fontWeight: 700 }}
              disabled={saved}
            >
              {saved ? '✓ Saved to Food Diary' : `Save to ${selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}`}
            </button>

            <div className="flex gap-2">
              <Link
                href="/food-search"
                className="btn btn-outline btn-sm flex-1 no-underline"
                style={{ fontSize: 12 }}
              >
                Not correct? Search or Add Manually
              </Link>
              <button
                type="button"
                onClick={resetUpload}
                className="btn btn-subtle btn-sm"
                style={{ fontSize: 12 }}
              >
                Scan Another
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <Disclaimer text="AI food detection and nutrition values are estimates. You can always review and edit serving sizes and exact grams before saving." />
      </div>
    </main>
  );
}

export default function ScanPage() {
  return (
    <Suspense fallback={<main className="container section"><p>Loading...</p></main>}>
      <ScanPageInner />
    </Suspense>
  );
}
