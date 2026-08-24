import { FoodItem } from './types';

// Nutrition data compiled from IFCT (Indian Food Composition Tables) and NIN (National Institute of Nutrition) references.
// Values are approximate and meant for tracking, not clinical use.
// Source attribution: "IFCT 2017 / NIN Hyderabad estimates"

export const FOOD_DATABASE: FoodItem[] = [
  // Breads & Rotis
  { id: 'roti-wheat', name: 'Roti (Wheat Chapati)', nameHi: 'रोटी', category: 'Breads', nutrition: { calories: 104, protein: 3.1, carbs: 18.3, fat: 2.5, fibre: 1.9 }, servingSize: 1, servingUnit: 'roti', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['staple', 'whole-wheat'] },
  { id: 'paratha-plain', name: 'Plain Paratha', nameHi: 'पराठा', category: 'Breads', nutrition: { calories: 180, protein: 3.8, carbs: 22, fat: 8.5, fibre: 1.5 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['staple'] },
  { id: 'paratha-aloo', name: 'Aloo Paratha', nameHi: 'आलू पराठा', category: 'Breads', nutrition: { calories: 220, protein: 4.2, carbs: 28, fat: 10, fibre: 2.0 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['staple', 'potato'] },
  { id: 'naan', name: 'Naan', nameHi: 'नान', category: 'Breads', nutrition: { calories: 260, protein: 7.2, carbs: 43, fat: 5.5, fibre: 1.8 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, source: 'IFCT 2017', tags: ['restaurant'] },
  { id: 'puri', name: 'Puri', nameHi: 'पूरी', category: 'Breads', nutrition: { calories: 101, protein: 2.1, carbs: 11, fat: 5.5, fibre: 0.8 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['fried'] },

  // Rice
  { id: 'rice-white', name: 'White Rice (Cooked)', nameHi: 'चावल', category: 'Rice', nutrition: { calories: 180, protein: 3.5, carbs: 40, fat: 0.4, fibre: 0.6 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['staple'] },
  { id: 'rice-brown', name: 'Brown Rice (Cooked)', nameHi: 'ब्राउन चावल', category: 'Rice', nutrition: { calories: 160, protein: 3.8, carbs: 34, fat: 1.2, fibre: 2.4 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['staple', 'whole-grain'] },
  { id: 'biryani-veg', name: 'Veg Biryani', nameHi: 'वेज बिरयानी', category: 'Rice', nutrition: { calories: 290, protein: 5.5, carbs: 42, fat: 10, fibre: 2.0 }, servingSize: 1, servingUnit: 'plate', isVegetarian: true, source: 'NIN estimate', tags: ['rice-dish'] },
  { id: 'biryani-chicken', name: 'Chicken Biryani', nameHi: 'चिकन बिरयानी', category: 'Rice', nutrition: { calories: 360, protein: 18, carbs: 40, fat: 14, fibre: 1.2 }, servingSize: 1, servingUnit: 'plate', source: 'NIN estimate', tags: ['rice-dish', 'non-veg'] },
  { id: 'jeera-rice', name: 'Jeera Rice', nameHi: 'जीरा चावल', category: 'Rice', nutrition: { calories: 200, protein: 3.8, carbs: 38, fat: 3.5, fibre: 0.8 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, source: 'NIN estimate', tags: ['rice-dish'] },
  { id: 'khichdi', name: 'Dal Khichdi', nameHi: 'खिचड़ी', category: 'Rice', nutrition: { calories: 200, protein: 7, carbs: 32, fat: 4.5, fibre: 2.5 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['comfort-food'] },

  // Dals & Lentils
  { id: 'dal-toor', name: 'Toor Dal (Arhar)', nameHi: 'तूर दाल', category: 'Dals', nutrition: { calories: 130, protein: 7.5, carbs: 18, fat: 2.8, fibre: 3.0 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['protein-rich', 'lentil'] },
  { id: 'dal-moong', name: 'Moong Dal', nameHi: 'मूंग दाल', category: 'Dals', nutrition: { calories: 110, protein: 7, carbs: 16, fat: 1.8, fibre: 2.5 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['protein-rich', 'lentil'] },
  { id: 'dal-masoor', name: 'Masoor Dal', nameHi: 'मसूर दाल', category: 'Dals', nutrition: { calories: 120, protein: 7.8, carbs: 17, fat: 2.0, fibre: 2.8 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['protein-rich', 'lentil'] },
  { id: 'rajma', name: 'Rajma (Kidney Beans)', nameHi: 'राजमा', category: 'Dals', nutrition: { calories: 155, protein: 8.5, carbs: 22, fat: 3.5, fibre: 4.5 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['protein-rich', 'beans'] },
  { id: 'chole', name: 'Chole (Chickpea Curry)', nameHi: 'छोले', category: 'Dals', nutrition: { calories: 170, protein: 8, carbs: 23, fat: 5.5, fibre: 5.0 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['protein-rich', 'beans'] },
  { id: 'dal-fry', name: 'Dal Fry', nameHi: 'दाल फ्राई', category: 'Dals', nutrition: { calories: 140, protein: 7, carbs: 17, fat: 4.5, fibre: 3.0 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, source: 'NIN estimate', tags: ['protein-rich'] },
  { id: 'sambhar', name: 'Sambhar', nameHi: 'सांबर', category: 'Dals', nutrition: { calories: 100, protein: 5, carbs: 14, fat: 2.5, fibre: 3.2 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['south-indian'] },

  // Sabzis / Vegetables
  { id: 'palak-paneer', name: 'Palak Paneer', nameHi: 'पालक पनीर', category: 'Sabzi', nutrition: { calories: 190, protein: 10, carbs: 8, fat: 14, fibre: 2.5 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, source: 'NIN estimate', tags: ['paneer', 'spinach'] },
  { id: 'paneer-bhurji', name: 'Paneer Bhurji', nameHi: 'पनीर भुर्जी', category: 'Sabzi', nutrition: { calories: 210, protein: 12, carbs: 5, fat: 16, fibre: 1.0 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, source: 'NIN estimate', tags: ['paneer', 'high-protein'] },
  { id: 'aloo-gobi', name: 'Aloo Gobi', nameHi: 'आलू गोभी', category: 'Sabzi', nutrition: { calories: 140, protein: 3.2, carbs: 18, fat: 6.5, fibre: 3.0 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, source: 'NIN estimate', tags: ['potato', 'cauliflower'] },
  { id: 'bhindi-masala', name: 'Bhindi Masala', nameHi: 'भिंडी मसाला', category: 'Sabzi', nutrition: { calories: 110, protein: 2.5, carbs: 10, fat: 7, fibre: 3.5 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, source: 'NIN estimate', tags: ['okra'] },
  { id: 'baingan-bharta', name: 'Baingan Bharta', nameHi: 'बैंगन भर्ता', category: 'Sabzi', nutrition: { calories: 100, protein: 2, carbs: 8, fat: 7, fibre: 3.0 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, source: 'NIN estimate', tags: ['eggplant'] },
  { id: 'mixed-veg', name: 'Mixed Vegetable Curry', nameHi: 'मिक्स वेज', category: 'Sabzi', nutrition: { calories: 120, protein: 3, carbs: 12, fat: 6.5, fibre: 3.5 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, source: 'NIN estimate', tags: ['vegetable'] },
  { id: 'matar-paneer', name: 'Matar Paneer', nameHi: 'मटर पनीर', category: 'Sabzi', nutrition: { calories: 200, protein: 10, carbs: 12, fat: 13, fibre: 2.0 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, source: 'NIN estimate', tags: ['paneer', 'peas'] },
  { id: 'shahi-paneer', name: 'Shahi Paneer', nameHi: 'शाही पनीर', category: 'Sabzi', nutrition: { calories: 240, protein: 10, carbs: 10, fat: 18, fibre: 1.0 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, source: 'NIN estimate', tags: ['paneer', 'rich'] },

  // Breakfast Items
  { id: 'poha', name: 'Poha (Flattened Rice)', nameHi: 'पोहा', category: 'Breakfast', nutrition: { calories: 180, protein: 3.5, carbs: 32, fat: 4.5, fibre: 1.5 }, servingSize: 1, servingUnit: 'plate', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['breakfast', 'light'] },
  { id: 'upma', name: 'Upma (Semolina)', nameHi: 'उपमा', category: 'Breakfast', nutrition: { calories: 190, protein: 4, carbs: 30, fat: 5.5, fibre: 1.8 }, servingSize: 1, servingUnit: 'plate', isVegetarian: true, source: 'IFCT 2017', tags: ['breakfast', 'south-indian'] },
  { id: 'idli', name: 'Idli', nameHi: 'इडली', category: 'Breakfast', nutrition: { calories: 58, protein: 2, carbs: 11, fat: 0.4, fibre: 0.6 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['breakfast', 'south-indian', 'steamed'] },
  { id: 'dosa-plain', name: 'Plain Dosa', nameHi: 'दोसा', category: 'Breakfast', nutrition: { calories: 120, protein: 3, carbs: 20, fat: 3, fibre: 0.8 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['breakfast', 'south-indian'] },
  { id: 'dosa-masala', name: 'Masala Dosa', nameHi: 'मसाला दोसा', category: 'Breakfast', nutrition: { calories: 250, protein: 5, carbs: 32, fat: 11, fibre: 2.0 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, source: 'IFCT 2017', tags: ['breakfast', 'south-indian'] },
  { id: 'uttapam', name: 'Uttapam', nameHi: 'उत्तपम', category: 'Breakfast', nutrition: { calories: 170, protein: 4, carbs: 26, fat: 5, fibre: 1.5 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, source: 'IFCT 2017', tags: ['breakfast', 'south-indian'] },
  { id: 'aloo-puri', name: 'Aloo Puri', nameHi: 'आलू पूरी', category: 'Breakfast', nutrition: { calories: 300, protein: 6, carbs: 35, fat: 15, fibre: 2.5 }, servingSize: 1, servingUnit: 'plate', isVegetarian: true, source: 'NIN estimate', tags: ['breakfast', 'north-indian'] },

  // Dairy
  { id: 'paneer', name: 'Paneer (Cottage Cheese)', nameHi: 'पनीर', category: 'Dairy', nutrition: { calories: 265, protein: 18, carbs: 3, fat: 20, fibre: 0 }, servingSize: 100, servingUnit: 'g', isVegetarian: true, source: 'IFCT 2017', tags: ['high-protein', 'dairy'] },
  { id: 'curd', name: 'Curd (Dahi)', nameHi: 'दही', category: 'Dairy', nutrition: { calories: 60, protein: 3, carbs: 5, fat: 3.2, fibre: 0 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, source: 'IFCT 2017', tags: ['probiotic', 'dairy'] },
  { id: 'lassi-sweet', name: 'Sweet Lassi', nameHi: 'मीठी लस्सी', category: 'Dairy', nutrition: { calories: 150, protein: 4.5, carbs: 22, fat: 5, fibre: 0 }, servingSize: 1, servingUnit: 'glass', isVegetarian: true, source: 'NIN estimate', tags: ['drink', 'dairy'] },
  { id: 'lassi-salted', name: 'Salted Lassi (Chaas)', nameHi: 'छाछ', category: 'Dairy', nutrition: { calories: 45, protein: 2.5, carbs: 4, fat: 2, fibre: 0 }, servingSize: 1, servingUnit: 'glass', isVegetarian: true, source: 'NIN estimate', tags: ['drink', 'dairy'] },
  { id: 'milk-full', name: 'Milk (Full Cream)', nameHi: 'दूध', category: 'Dairy', nutrition: { calories: 150, protein: 6, carbs: 10, fat: 8, fibre: 0 }, servingSize: 1, servingUnit: 'glass', isVegetarian: true, source: 'IFCT 2017', tags: ['dairy'] },
  { id: 'milk-toned', name: 'Milk (Toned)', nameHi: 'टोन्ड दूध', category: 'Dairy', nutrition: { calories: 100, protein: 6, carbs: 10, fat: 3, fibre: 0 }, servingSize: 1, servingUnit: 'glass', isVegetarian: true, source: 'IFCT 2017', tags: ['dairy'] },

  // Beverages
  { id: 'chai', name: 'Chai (Milk Tea)', nameHi: 'चाय', category: 'Beverages', nutrition: { calories: 50, protein: 1.5, carbs: 7, fat: 1.5, fibre: 0 }, servingSize: 1, servingUnit: 'cup', isVegetarian: true, source: 'NIN estimate', tags: ['drink', 'caffeine'] },
  { id: 'chai-no-sugar', name: 'Chai (No Sugar)', nameHi: 'बिना चीनी चाय', category: 'Beverages', nutrition: { calories: 20, protein: 1.5, carbs: 1.5, fat: 1, fibre: 0 }, servingSize: 1, servingUnit: 'cup', isVegetarian: true, source: 'NIN estimate', tags: ['drink', 'low-cal'] },
  { id: 'coffee', name: 'Filter Coffee', nameHi: 'कॉफ़ी', category: 'Beverages', nutrition: { calories: 60, protein: 2, carbs: 8, fat: 2, fibre: 0 }, servingSize: 1, servingUnit: 'cup', isVegetarian: true, source: 'NIN estimate', tags: ['drink', 'south-indian', 'caffeine'] },
  { id: 'nimbu-pani', name: 'Nimbu Pani (Lime Water)', nameHi: 'नींबू पानी', category: 'Beverages', nutrition: { calories: 40, protein: 0.2, carbs: 10, fat: 0, fibre: 0 }, servingSize: 1, servingUnit: 'glass', isVegetarian: true, isVegan: true, source: 'NIN estimate', tags: ['drink', 'refreshing'] },
  { id: 'coconut-water', name: 'Coconut Water', nameHi: 'नारियल पानी', category: 'Beverages', nutrition: { calories: 45, protein: 0.5, carbs: 9, fat: 0.5, fibre: 0 }, servingSize: 1, servingUnit: 'glass', isVegetarian: true, isVegan: true, source: 'NIN estimate', tags: ['drink', 'electrolyte'] },

  // Snacks
  { id: 'samosa', name: 'Samosa', nameHi: 'समोसा', category: 'Snacks', nutrition: { calories: 210, protein: 3.5, carbs: 23, fat: 12, fibre: 1.5 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, source: 'NIN estimate', tags: ['fried', 'snack'] },
  { id: 'pakora', name: 'Pakora / Bhajiya', nameHi: 'पकोड़ा', category: 'Snacks', nutrition: { calories: 50, protein: 1.5, carbs: 5, fat: 3, fibre: 0.5 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, isVegan: true, source: 'NIN estimate', tags: ['fried', 'snack'] },
  { id: 'vada-pav', name: 'Vada Pav', nameHi: 'वड़ा पाव', category: 'Snacks', nutrition: { calories: 290, protein: 5, carbs: 35, fat: 14, fibre: 2.0 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, source: 'NIN estimate', tags: ['mumbai', 'street-food'] },
  { id: 'pav-bhaji', name: 'Pav Bhaji', nameHi: 'पाव भाजी', category: 'Snacks', nutrition: { calories: 380, protein: 8, carbs: 42, fat: 18, fibre: 4.0 }, servingSize: 1, servingUnit: 'plate', isVegetarian: true, source: 'NIN estimate', tags: ['mumbai', 'street-food'] },
  { id: 'bhel-puri', name: 'Bhel Puri', nameHi: 'भेल पूरी', category: 'Snacks', nutrition: { calories: 180, protein: 4, carbs: 28, fat: 6, fibre: 2.0 }, servingSize: 1, servingUnit: 'plate', isVegetarian: true, source: 'NIN estimate', tags: ['chaat', 'street-food'] },

  // Eggs & Non-Veg
  { id: 'egg-boiled', name: 'Boiled Egg', nameHi: 'उबला अंडा', category: 'Eggs', nutrition: { calories: 70, protein: 6, carbs: 0.5, fat: 5, fibre: 0 }, servingSize: 1, servingUnit: 'piece', source: 'IFCT 2017', tags: ['protein-rich', 'egg'] },
  { id: 'egg-omelette', name: 'Omelette (2 eggs)', nameHi: 'आमलेट', category: 'Eggs', nutrition: { calories: 180, protein: 13, carbs: 1.5, fat: 14, fibre: 0 }, servingSize: 1, servingUnit: 'serving', source: 'NIN estimate', tags: ['protein-rich', 'egg'] },
  { id: 'butter-chicken', name: 'Butter Chicken', nameHi: 'बटर चिकन', category: 'Non-Veg', nutrition: { calories: 240, protein: 16, carbs: 8, fat: 16, fibre: 1.0 }, servingSize: 1, servingUnit: 'katori', source: 'NIN estimate', tags: ['non-veg', 'rich'] },
  { id: 'chicken-curry', name: 'Chicken Curry', nameHi: 'चिकन करी', category: 'Non-Veg', nutrition: { calories: 200, protein: 18, carbs: 6, fat: 12, fibre: 1.0 }, servingSize: 1, servingUnit: 'katori', source: 'NIN estimate', tags: ['non-veg'] },
  { id: 'fish-curry', name: 'Fish Curry', nameHi: 'मछली करी', category: 'Non-Veg', nutrition: { calories: 160, protein: 16, carbs: 5, fat: 8, fibre: 0.5 }, servingSize: 1, servingUnit: 'katori', source: 'NIN estimate', tags: ['non-veg', 'fish'] },
  { id: 'tandoori-chicken', name: 'Tandoori Chicken', nameHi: 'तंदूरी चिकन', category: 'Non-Veg', nutrition: { calories: 160, protein: 22, carbs: 3, fat: 7, fibre: 0.5 }, servingSize: 1, servingUnit: 'piece', source: 'NIN estimate', tags: ['non-veg', 'grilled', 'high-protein'] },

  // Sweets & Desserts
  { id: 'gulab-jamun', name: 'Gulab Jamun', nameHi: 'गुलाब जामुन', category: 'Sweets', nutrition: { calories: 150, protein: 2, carbs: 22, fat: 6.5, fibre: 0.2 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, source: 'NIN estimate', tags: ['dessert', 'sweet'] },
  { id: 'rasgulla', name: 'Rasgulla', nameHi: 'रसगुल्ला', category: 'Sweets', nutrition: { calories: 125, protein: 2.5, carbs: 24, fat: 2.5, fibre: 0 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, source: 'NIN estimate', tags: ['dessert', 'sweet'] },
  { id: 'kheer', name: 'Kheer (Rice Pudding)', nameHi: 'खीर', category: 'Sweets', nutrition: { calories: 180, protein: 4.5, carbs: 28, fat: 6, fibre: 0.3 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, source: 'NIN estimate', tags: ['dessert', 'dairy'] },
  { id: 'jalebi', name: 'Jalebi', nameHi: 'जलेबी', category: 'Sweets', nutrition: { calories: 150, protein: 1.5, carbs: 25, fat: 5.5, fibre: 0 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, source: 'NIN estimate', tags: ['dessert', 'fried', 'sweet'] },

  // Fruits
  { id: 'banana', name: 'Banana', nameHi: 'केला', category: 'Fruits', nutrition: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fibre: 2.6 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['fruit'] },
  { id: 'apple', name: 'Apple', nameHi: 'सेब', category: 'Fruits', nutrition: { calories: 72, protein: 0.4, carbs: 19, fat: 0.2, fibre: 2.4 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['fruit'] },
  { id: 'mango', name: 'Mango', nameHi: 'आम', category: 'Fruits', nutrition: { calories: 99, protein: 0.8, carbs: 25, fat: 0.4, fibre: 1.6 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['fruit', 'seasonal'] },
  { id: 'papaya', name: 'Papaya', nameHi: 'पपीता', category: 'Fruits', nutrition: { calories: 60, protein: 0.6, carbs: 15, fat: 0.2, fibre: 2.5 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['fruit'] },
  { id: 'watermelon', name: 'Watermelon', nameHi: 'तरबूज', category: 'Fruits', nutrition: { calories: 46, protein: 0.6, carbs: 12, fat: 0.2, fibre: 0.4 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['fruit', 'hydrating'] },

  // Nuts & Seeds
  { id: 'almonds', name: 'Almonds', nameHi: 'बादाम', category: 'Nuts', nutrition: { calories: 164, protein: 6, carbs: 6, fat: 14, fibre: 3.5 }, servingSize: 10, servingUnit: 'piece', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['nuts', 'healthy-fat'] },
  { id: 'peanuts', name: 'Peanuts (Roasted)', nameHi: 'मूंगफली', category: 'Nuts', nutrition: { calories: 170, protein: 7, carbs: 5, fat: 14, fibre: 2.5 }, servingSize: 30, servingUnit: 'g', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['nuts', 'protein-rich'] },
  { id: 'walnuts', name: 'Walnuts', nameHi: 'अखरोट', category: 'Nuts', nutrition: { calories: 185, protein: 4.3, carbs: 4, fat: 18, fibre: 1.9 }, servingSize: 30, servingUnit: 'g', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['nuts', 'omega-3'] },

  // Miscellaneous
  { id: 'ghee', name: 'Ghee', nameHi: 'घी', category: 'Oils & Fats', nutrition: { calories: 45, protein: 0, carbs: 0, fat: 5, fibre: 0 }, servingSize: 1, servingUnit: 'teaspoon', isVegetarian: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['fat', 'cooking'] },
  { id: 'butter', name: 'Butter', nameHi: 'मक्खन', category: 'Oils & Fats', nutrition: { calories: 36, protein: 0, carbs: 0, fat: 4, fibre: 0 }, servingSize: 1, servingUnit: 'teaspoon', isVegetarian: true, source: 'IFCT 2017', tags: ['fat', 'cooking'] },
  { id: 'oil-mustard', name: 'Mustard Oil', nameHi: 'सरसों तेल', category: 'Oils & Fats', nutrition: { calories: 45, protein: 0, carbs: 0, fat: 5, fibre: 0 }, servingSize: 1, servingUnit: 'teaspoon', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['fat', 'cooking'] },
  { id: 'sugar', name: 'Sugar', nameHi: 'चीनी', category: 'Sweeteners', nutrition: { calories: 20, protein: 0, carbs: 5, fat: 0, fibre: 0 }, servingSize: 1, servingUnit: 'teaspoon', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'IFCT 2017', tags: ['sweetener'] },
  { id: 'honey', name: 'Honey', nameHi: 'शहद', category: 'Sweeteners', nutrition: { calories: 21, protein: 0, carbs: 5.7, fat: 0, fibre: 0 }, servingSize: 1, servingUnit: 'teaspoon', isVegetarian: true, source: 'IFCT 2017', tags: ['sweetener', 'natural'] },
  { id: 'pickle', name: 'Pickle (Achar)', nameHi: 'अचार', category: 'Condiments', nutrition: { calories: 30, protein: 0.5, carbs: 2, fat: 2.5, fibre: 0.5 }, servingSize: 1, servingUnit: 'tablespoon', isVegetarian: true, isVegan: true, source: 'NIN estimate', tags: ['condiment'] },
  { id: 'raita', name: 'Raita', nameHi: 'रायता', category: 'Condiments', nutrition: { calories: 55, protein: 2, carbs: 4, fat: 3, fibre: 0.5 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, source: 'NIN estimate', tags: ['condiment', 'dairy'] },
  { id: 'chutney-green', name: 'Green Chutney', nameHi: 'हरी चटनी', category: 'Condiments', nutrition: { calories: 15, protein: 0.5, carbs: 2, fat: 0.5, fibre: 0.5 }, servingSize: 1, servingUnit: 'tablespoon', isVegetarian: true, isVegan: true, source: 'NIN estimate', tags: ['condiment'] },

  // Quick packaged / common
  { id: 'maggi', name: 'Maggi Noodles', nameHi: 'मैगी', category: 'Packaged', nutrition: { calories: 420, protein: 9, carbs: 58, fat: 17, fibre: 2.0 }, servingSize: 1, servingUnit: 'serving', isVegetarian: true, source: 'Label', tags: ['packaged', 'instant'] },
  { id: 'bread-white', name: 'White Bread Slice', nameHi: 'ब्रेड', category: 'Breads', nutrition: { calories: 70, protein: 2.5, carbs: 13, fat: 1, fibre: 0.6 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, source: 'Label', tags: ['bread'] },
  { id: 'bread-brown', name: 'Brown Bread Slice', nameHi: 'ब्राउन ब्रेड', category: 'Breads', nutrition: { calories: 65, protein: 3, carbs: 12, fat: 1, fibre: 1.8 }, servingSize: 1, servingUnit: 'piece', isVegetarian: true, source: 'Label', tags: ['bread', 'whole-grain'] },
  { id: 'oats', name: 'Oats (Cooked)', nameHi: 'ओट्स', category: 'Breakfast', nutrition: { calories: 150, protein: 5, carbs: 27, fat: 2.5, fibre: 4.0 }, servingSize: 1, servingUnit: 'bowl', isVegetarian: true, isVegan: true, source: 'Label', tags: ['breakfast', 'whole-grain', 'fibre'] },
  { id: 'sprouts-moong', name: 'Moong Sprouts', nameHi: 'मूंग स्प्राउट्स', category: 'Salad', nutrition: { calories: 65, protein: 5, carbs: 8, fat: 0.5, fibre: 2.5 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, source: 'IFCT 2017', tags: ['protein-rich', 'healthy'] },
  { id: 'salad-green', name: 'Green Salad', nameHi: 'सलाद', category: 'Salad', nutrition: { calories: 25, protein: 1, carbs: 5, fat: 0.2, fibre: 2.0 }, servingSize: 1, servingUnit: 'katori', isVegetarian: true, isVegan: true, isJainFriendly: true, source: 'NIN estimate', tags: ['low-cal', 'fibre'] },
];

export const PORTION_LABELS: Record<string, string> = {
  g: 'grams',
  ml: 'millilitres',
  katori: 'katori (small bowl, ~150ml)',
  bowl: 'bowl (~250ml)',
  glass: 'glass (~200ml)',
  roti: 'roti / chapati',
  piece: 'piece',
  plate: 'plate / serving',
  tablespoon: 'tablespoon (~15ml)',
  teaspoon: 'teaspoon (~5ml)',
  cup: 'cup (~150ml)',
  serving: 'serving',
};

export function searchFoods(query: string, filters?: { vegetarian?: boolean; vegan?: boolean; jain?: boolean; category?: string }): FoodItem[] {
  const q = query.toLowerCase().trim();
  if (!q && !filters) return FOOD_DATABASE.slice(0, 20);

  return FOOD_DATABASE.filter(f => {
    const matchesQuery = !q || f.name.toLowerCase().includes(q) || (f.nameHi && f.nameHi.includes(q)) || f.tags?.some(t => t.includes(q)) || f.category.toLowerCase().includes(q);
    const matchesVeg = !filters?.vegetarian || f.isVegetarian;
    const matchesVegan = !filters?.vegan || f.isVegan;
    const matchesJain = !filters?.jain || f.isJainFriendly;
    const matchesCat = !filters?.category || f.category.toLowerCase() === filters.category.toLowerCase();
    return matchesQuery && matchesVeg && matchesVegan && matchesJain && matchesCat;
  });
}

export function getFoodById(id: string): FoodItem | undefined {
  return FOOD_DATABASE.find(f => f.id === id);
}

export function getCategories(): string[] {
  return [...new Set(FOOD_DATABASE.map(f => f.category))];
}
