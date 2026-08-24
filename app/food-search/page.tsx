'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Heart, Plus, Star } from 'lucide-react';
import { searchFoods, FOOD_DATABASE, PORTION_LABELS } from '@/lib/nutrition-db';
import { addMealEntry, todayStr, uid, addRecentFood, toggleFavourite, getFavourites, getRecentFoods, addCustomFood, getCustomFoods } from '@/lib/store';
import type { FoodItem, MealType, PortionUnit, NutritionInfo } from '@/lib/types';

function FoodSearchPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mealType = (searchParams.get('meal') as MealType) || 'lunch';

  const [query, setQuery] = useState('');
  const [filterVeg, setFilterVeg] = useState(false);
  const [results, setResults] = useState<FoodItem[]>(FOOD_DATABASE.slice(0, 20));
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState<MealType>(mealType);
  const [tab, setTab] = useState<'search' | 'recent' | 'favourites' | 'custom'>('search');
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customCals, setCustomCals] = useState(200);
  const [customProtein, setCustomProtein] = useState(5);
  const [customCarbs, setCustomCarbs] = useState(25);
  const [customFat, setCustomFat] = useState(8);
  const [customFibre, setCustomFibre] = useState(2);

  const handleSearch = (q: string) => {
    setQuery(q);
    setResults(searchFoods(q, { vegetarian: filterVeg || undefined }));
  };

  const handleAdd = (food: FoodItem, qty: number) => {
    const scale = qty / (food.servingSize || 1);
    addMealEntry(todayStr(), {
      id: uid(),
      foodId: food.id,
      foodName: food.name,
      mealType: selectedMeal,
      quantity: qty,
      unit: food.servingUnit,
      nutrition: {
        calories: Math.round(food.nutrition.calories * scale),
        protein: Math.round(food.nutrition.protein * scale * 10) / 10,
        carbs: Math.round(food.nutrition.carbs * scale * 10) / 10,
        fat: Math.round(food.nutrition.fat * scale * 10) / 10,
        fibre: Math.round(food.nutrition.fibre * scale * 10) / 10,
      },
      isEstimated: false,
      timestamp: Date.now(),
    });
    addRecentFood(food.id);
    router.push('/');
  };

  const handleCustomSave = () => {
    if (!customName.trim()) return;
    const food: FoodItem = {
      id: `custom-${uid()}`, name: customName, category: 'Custom',
      nutrition: { calories: customCals, protein: customProtein, carbs: customCarbs, fat: customFat, fibre: customFibre },
      servingSize: 1, servingUnit: 'serving', source: 'User-created',
    };
    addCustomFood(food);
    handleAdd(food, 1);
  };

  const favIds = getFavourites();
  const recentIds = getRecentFoods();
  const customFoods = getCustomFoods();

  const displayList = tab === 'recent'
    ? recentIds.map(id => FOOD_DATABASE.find(f => f.id === id)).filter(Boolean) as FoodItem[]
    : tab === 'favourites'
    ? FOOD_DATABASE.filter(f => favIds.includes(f.id))
    : tab === 'custom'
    ? customFoods
    : results;

  return (
    <main className="container section animate-fadeIn">
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Add Food</h1>

      {/* Meal selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map(mt => (
          <button key={mt} onClick={() => setSelectedMeal(mt)} className="btn btn-sm" style={{
            background: selectedMeal === mt ? 'var(--green-700)' : 'var(--surface)',
            color: selectedMeal === mt ? 'white' : 'var(--text)',
            border: `1px solid ${selectedMeal === mt ? 'var(--green-700)' : 'var(--border)'}`,
            textTransform: 'capitalize', flexShrink: 0,
          }}>
            {mt}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto no-scrollbar">
        {(['search', 'recent', 'favourites', 'custom'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className="btn btn-sm" style={{
            background: tab === t ? 'var(--green-200)' : 'transparent',
            color: tab === t ? 'var(--green-900)' : 'var(--text-secondary)',
            fontWeight: tab === t ? 600 : 400, textTransform: 'capitalize', flexShrink: 0,
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Search */}
      {tab === 'search' && (
        <div className="mb-4">
          <div className="relative">
            <Search size={16} style={{ position: 'absolute', left: 12, top: 14, color: 'var(--gray-400)' }} />
            <input
              className="input" style={{ paddingLeft: 36 }}
              placeholder="Search Indian foods... (roti, dal, paneer, poha)"
              value={query} onChange={e => handleSearch(e.target.value)}
            />
          </div>
          <label className="flex items-center gap-2 mt-2" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            <input type="checkbox" checked={filterVeg} onChange={e => { setFilterVeg(e.target.checked); handleSearch(query); }} style={{ accentColor: 'var(--green-600)' }} />
            Vegetarian only
          </label>
        </div>
      )}

      {/* Food Detail / Quick Add */}
      {selectedFood && (
        <div className="card mb-4 animate-scaleIn" style={{ padding: 16 }}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{selectedFood.name}</h3>
              {selectedFood.nameHi && <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedFood.nameHi}</p>}
            </div>
            <button onClick={() => toggleFavourite(selectedFood.id)} className="btn btn-ghost btn-icon btn-sm">
              <Heart size={16} fill={favIds.includes(selectedFood.id) ? 'var(--red)' : 'none'} color={favIds.includes(selectedFood.id) ? 'var(--red)' : 'var(--gray-400)'} />
            </button>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
            Per {selectedFood.servingSize} {PORTION_LABELS[selectedFood.servingUnit] || selectedFood.servingUnit}
            {selectedFood.source && <> · Source: {selectedFood.source}</>}
          </p>
          <div className="grid grid-cols-5 gap-2 mb-3" style={{ fontSize: 12, textAlign: 'center' }}>
            {[
              ['Cal', selectedFood.nutrition.calories, 'kcal'],
              ['Prot', selectedFood.nutrition.protein, 'g'],
              ['Carb', selectedFood.nutrition.carbs, 'g'],
              ['Fat', selectedFood.nutrition.fat, 'g'],
              ['Fibre', selectedFood.nutrition.fibre, 'g'],
            ].map(([label, val, unit]) => (
              <div key={label as string} className="card" style={{ padding: '6px 4px', border: 'none', background: 'var(--gray-100)' }}>
                <div style={{ fontWeight: 600 }}>{val as number}</div>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{label as string} ({unit as string})</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label className="label" style={{ margin: 0, whiteSpace: 'nowrap' }}>Qty:</label>
            <input type="number" className="input" value={quantity} min={0.5} step={0.5} onChange={e => setQuantity(parseFloat(e.target.value) || 1)} style={{ width: 80 }} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedFood.servingUnit}</span>
            <button onClick={() => handleAdd(selectedFood, quantity)} className="btn btn-primary btn-sm flex-1">
              <Plus size={14} /> Add
            </button>
          </div>
          <button onClick={() => setSelectedFood(null)} className="btn btn-ghost btn-sm mt-2 w-full" style={{ fontSize: 12 }}>Cancel</button>
        </div>
      )}

      {/* Create Custom Food */}
      {tab === 'custom' && (
        <div className="mb-4">
          {!showCustom ? (
            <button onClick={() => setShowCustom(true)} className="btn btn-secondary w-full"><Plus size={16} /> Create Custom Food</button>
          ) : (
            <div className="card" style={{ padding: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Create Custom Food</h3>
              <input className="input mb-2" placeholder="Food name" value={customName} onChange={e => setCustomName(e.target.value)} />
              <div className="grid grid-cols-5 gap-2 mb-3">
                {[
                  ['Cal', customCals, setCustomCals],
                  ['Prot', customProtein, setCustomProtein],
                  ['Carb', customCarbs, setCustomCarbs],
                  ['Fat', customFat, setCustomFat],
                  ['Fibre', customFibre, setCustomFibre],
                ].map(([label, val, setter]) => (
                  <div key={label as string}>
                    <label className="label" style={{ fontSize: 10 }}>{label as string}</label>
                    <input type="number" className="input" style={{ padding: '6px 4px', fontSize: 12, textAlign: 'center' }} value={val as number} onChange={e => (setter as (v: number) => void)(parseFloat(e.target.value) || 0)} />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={handleCustomSave} className="btn btn-primary btn-sm flex-1" disabled={!customName.trim()}>Save & Add</button>
                <button onClick={() => setShowCustom(false)} className="btn btn-ghost btn-sm">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results List */}
      <div>
        {displayList.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--gray-400)', textAlign: 'center', padding: 24 }}>
            {tab === 'search' ? 'No foods found. Try a different search term.' : `No ${tab} items yet.`}
          </p>
        ) : (
          displayList.map(food => (
            <button
              key={food.id}
              onClick={() => { setSelectedFood(food); setQuantity(food.servingSize); }}
              className="flex items-center gap-3 w-full text-left py-3 transition-colors"
              style={{ borderBottom: '1px solid var(--border)', background: 'transparent', border: 'none', borderBlockEnd: '1px solid var(--border)', cursor: 'pointer', padding: '12px 4px' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{food.name}</span>
                  {food.isVegetarian && <span style={{ fontSize: 10, color: 'var(--green-600)' }}>🟢</span>}
                  {favIds.includes(food.id) && <Star size={12} fill="var(--orange)" color="var(--orange)" />}
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  {food.nutrition.calories} kcal · P:{food.nutrition.protein}g · per {food.servingSize} {food.servingUnit}
                </span>
              </div>
              <Plus size={18} style={{ color: 'var(--green-600)', flexShrink: 0 }} />
            </button>
          ))
        )}
      </div>
    </main>
  );
}

export default function FoodSearchPage() {
  return <Suspense fallback={<main className="container section"><p>Loading...</p></main>}><FoodSearchPageInner /></Suspense>;
}
