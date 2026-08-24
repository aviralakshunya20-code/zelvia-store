'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, ChefHat } from 'lucide-react';
import { getRecipes, saveRecipe, deleteRecipe, uid, addMealEntry, todayStr } from '@/lib/store';
import type { Recipe, NutritionInfo, PortionUnit } from '@/lib/types';

const emptyIngredient = () => ({ foodName: '', quantity: 1, unit: 'g' as PortionUnit, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 } });

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [editing, setEditing] = useState<Recipe | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { setRecipes(getRecipes()); }, []);

  const startNew = () => {
    setEditing({
      id: uid(), name: '', servings: 2, ingredients: [emptyIngredient()],
      perServingNutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 },
      isFavourite: false, createdAt: Date.now(),
    });
    setShowForm(true);
  };

  const updateIngredient = (idx: number, key: string, value: string | number) => {
    if (!editing) return;
    const ingredients = [...editing.ingredients];
    ingredients[idx] = { ...ingredients[idx], [key]: value };
    const total = ingredients.reduce((acc, i) => ({
      calories: acc.calories + i.nutrition.calories, protein: acc.protein + i.nutrition.protein,
      carbs: acc.carbs + i.nutrition.carbs, fat: acc.fat + i.nutrition.fat, fibre: acc.fibre + i.nutrition.fibre,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 });
    const servings = Math.max(1, editing.servings);
    const perServing: NutritionInfo = {
      calories: Math.round(total.calories / servings), protein: Math.round(total.protein / servings * 10) / 10,
      carbs: Math.round(total.carbs / servings * 10) / 10, fat: Math.round(total.fat / servings * 10) / 10,
      fibre: Math.round(total.fibre / servings * 10) / 10,
    };
    setEditing({ ...editing, ingredients, perServingNutrition: perServing });
  };

  const updateIngredientNutrition = (idx: number, key: keyof NutritionInfo, value: number) => {
    if (!editing) return;
    const ingredients = [...editing.ingredients];
    ingredients[idx] = { ...ingredients[idx], nutrition: { ...ingredients[idx].nutrition, [key]: value } };
    updateIngredient(idx, 'nutrition', 0); // recalculate (hack: trigger via parent)
    // Actually recalculate properly:
    const total = ingredients.reduce((acc, i) => ({
      calories: acc.calories + i.nutrition.calories, protein: acc.protein + i.nutrition.protein,
      carbs: acc.carbs + i.nutrition.carbs, fat: acc.fat + i.nutrition.fat, fibre: acc.fibre + i.nutrition.fibre,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 });
    const servings = Math.max(1, editing.servings);
    setEditing({
      ...editing, ingredients,
      perServingNutrition: {
        calories: Math.round(total.calories / servings), protein: Math.round(total.protein / servings * 10) / 10,
        carbs: Math.round(total.carbs / servings * 10) / 10, fat: Math.round(total.fat / servings * 10) / 10,
        fibre: Math.round(total.fibre / servings * 10) / 10,
      },
    });
  };

  const handleSave = () => {
    if (!editing || !editing.name.trim()) return;
    saveRecipe(editing);
    setRecipes(getRecipes());
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => { deleteRecipe(id); setRecipes(getRecipes()); };

  const logRecipe = (recipe: Recipe) => {
    addMealEntry(todayStr(), {
      id: uid(), foodName: recipe.name, mealType: 'lunch', quantity: 1, unit: 'serving',
      nutrition: recipe.perServingNutrition, isEstimated: false, timestamp: Date.now(),
    });
  };

  return (
    <main className="container section animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Recipes</h1>
        <button onClick={startNew} className="btn btn-primary btn-sm"><Plus size={14} /> New Recipe</button>
      </div>

      {showForm && editing && (
        <div className="card mb-4 animate-scaleIn" style={{ padding: 16 }}>
          <input className="input mb-3" placeholder="Recipe name" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} style={{ fontWeight: 600, fontSize: 16 }} />
          <div className="flex items-center gap-3 mb-3">
            <label className="label" style={{ margin: 0 }}>Servings:</label>
            <input type="number" className="input" style={{ width: 70 }} value={editing.servings} min={1} onChange={e => {
              const s = parseInt(e.target.value) || 1;
              setEditing({ ...editing, servings: s });
            }} />
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Ingredients</h3>
          {editing.ingredients.map((ing, idx) => (
            <div key={idx} className="flex gap-2 mb-2 items-end">
              <div className="flex-1">
                <input className="input btn-sm" placeholder="Ingredient" value={ing.foodName} onChange={e => updateIngredient(idx, 'foodName', e.target.value)} />
              </div>
              <input type="number" className="input" style={{ width: 60 }} placeholder="Cal" value={ing.nutrition.calories} onChange={e => updateIngredientNutrition(idx, 'calories', parseFloat(e.target.value) || 0)} />
              <input type="number" className="input" style={{ width: 50 }} placeholder="P" value={ing.nutrition.protein} onChange={e => updateIngredientNutrition(idx, 'protein', parseFloat(e.target.value) || 0)} />
              <button onClick={() => {
                const ingredients = editing.ingredients.filter((_, i) => i !== idx);
                setEditing({ ...editing, ingredients });
              }} className="btn btn-ghost btn-icon btn-sm" style={{ color: 'var(--red)' }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button onClick={() => setEditing({ ...editing, ingredients: [...editing.ingredients, emptyIngredient()] })} className="btn btn-ghost btn-sm mb-3" style={{ fontSize: 12 }}>
            <Plus size={14} /> Add Ingredient
          </button>

          {/* Per Serving Summary */}
          <div className="card" style={{ padding: '10px 14px', background: 'var(--green-100)', marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 600 }}>Per Serving ({editing.servings} servings)</p>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {editing.perServingNutrition.calories} kcal · P:{editing.perServingNutrition.protein}g · C:{editing.perServingNutrition.carbs}g · F:{editing.perServingNutrition.fat}g
            </p>
          </div>

          <div className="flex gap-2">
            <button onClick={handleSave} className="btn btn-primary flex-1" disabled={!editing.name.trim()}>Save Recipe</button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      {/* Recipes List */}
      {recipes.length === 0 && !showForm ? (
        <div className="flex flex-col items-center gap-3 py-12" style={{ color: 'var(--gray-400)' }}>
          <ChefHat size={40} />
          <p style={{ fontSize: 14 }}>No recipes yet. Create your first recipe to calculate per-serving nutrition.</p>
        </div>
      ) : (
        recipes.map(recipe => (
          <div key={recipe.id} className="card mb-3" style={{ padding: 14 }}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{recipe.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  {recipe.servings} servings · {recipe.ingredients.length} ingredients
                </p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => logRecipe(recipe)} className="btn btn-secondary btn-sm" style={{ fontSize: 11 }}>
                  <Plus size={12} /> Log
                </button>
                <button onClick={() => handleDelete(recipe.id)} className="btn btn-ghost btn-icon btn-sm" style={{ color: 'var(--red)' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="flex gap-3" style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              <span>{recipe.perServingNutrition.calories} kcal/serving</span>
              <span>P:{recipe.perServingNutrition.protein}g</span>
              <span>C:{recipe.perServingNutrition.carbs}g</span>
              <span>F:{recipe.perServingNutrition.fat}g</span>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
