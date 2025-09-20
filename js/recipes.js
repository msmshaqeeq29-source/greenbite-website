// Sample recipes data (at least 6 for variety)
const recipes = [
  {
    id: 1,
    title: "Avocado Toast",
    category: "Breakfast",
    image: "images/avacado.jpg.webp",
    ingredients: ["2 slices of bread", "1 avocado", "Pinch of salt"],
    steps: ["Toast the bread", "Mash avocado", "Spread on bread and add salt"],
    nutrition: { calories: 250, carbs: 25, protein: 6, fat: 12 }
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    category: "Lunch",
    image: "images/salad.jpg",
    ingredients: ["Grilled chicken breast", "Lettuce", "Tomatoes", "Cucumber"],
    steps: ["Grill chicken", "Chop vegetables", "Mix together"],
    nutrition: { calories: 350, carbs: 15, protein: 30, fat: 12 }
  },
  {
    id: 3,
    title: "Oatmeal Bowl",
    category: "Breakfast",
    image: "images/oatmeal.webp",
    ingredients: ["1 cup oats", "1 cup milk", "Banana slices", "Honey"],
    steps: ["Cook oats with milk", "Add banana", "Drizzle honey"],
    nutrition: { calories: 300, carbs: 55, protein: 9, fat: 5 }
  },
  {
    id: 4,
    title: "Veggie Stir Fry",
    category: "Dinner",
    image: "images/veggie.jpg",
    ingredients: ["Mixed vegetables", "Soy sauce", "Garlic"],
    steps: ["Heat pan", "Add vegetables", "Stir fry with soy sauce"],
    nutrition: { calories: 220, carbs: 30, protein: 8, fat: 7 }
  },
  {
    id: 5,
    title: "Fruit Smoothie",
    category: "Breakfast",
    image: "images/smoothie.jpg",
    ingredients: ["1 banana", "1 cup berries", "1 cup yogurt"],
    steps: ["Blend all ingredients until smooth"],
    nutrition: { calories: 180, carbs: 40, protein: 6, fat: 2 }
  },
  {
    id: 6,
    title: "Pasta with Tomato Sauce",
    category: "Dinner",
    image: "images/pasta.jpg",
    ingredients: ["Pasta", "Tomato sauce", "Olive oil", "Herbs"],
    steps: ["Cook pasta", "Heat sauce", "Combine with pasta"],
    nutrition: { calories: 400, carbs: 70, protein: 12, fat: 10 }
  },
  {
    id: 7,
    title: "Lemon Herb Baked Salmon",
    category: "Dinner",
    image: "images/salmon.jpg",
    ingredients: ["2 salmon fillets", "1 lemon", "fresh dill or parsley", "olive oil"],
    steps: ["Preheat oven to 400°F (200°C). Place salmon on a baking sheet.",
            "Drizzle with olive oil, squeeze half the lemon over it, and top with herbs, salt, and pepper.",
            "Bake for 12-15 minutes until flaky. Serve with remaining lemon wedges."],
    nutrition: { calories:350, carbs: 2, protein: 34, fat: 22 }
  },
  {
    id: 8,
    title: "Banana Egg Pancakes",
    category: "Breakfast",
    image: "images/pancake.jpg",
    ingredients: ["1 ripe banana", "2 eggs", "cinnamon (optional)"],
    steps: ["In a bowl, mash the banana until smooth.",
            "Whisk in the two eggs and a pinch of cinnamon until a batter forms.",
            "Pour small circles onto a greased pan over medium heat. Cook for 2-3 minutes per side."],
    nutrition: { calories: 300, carbs: 30, protein: 16, fat: 12 }
  },
   {
    id: 9,
    title: "Mediterranean Chickpea Salad",
    category: "Lunch",
    image: "images/chickpea.jpg",
    ingredients: ["1 can (15 oz) chickpeas, rinsed", "1 cucumber, diced", "1 cup cherry tomatoes, halved", "¼ cup feta cheese, crumbled", "2 tbsp olive oil", "1 lemon, juiced", "fresh parsley"],
    steps: ["In a large bowl, combine the chickpeas, cucumber, tomatoes, and feta.",
            "In a small bowl, whisk together the olive oil, lemon juice, salt, and pepper.",
            "Pour the dressing over the salad and toss to combine. Garnish with fresh parsley."],
    nutrition: { calories: 380, carbs: 45, protein: 15, fat: 18 }
  },
  {
    id: 10,
    title: "Lemon Herb Chicken & Veggies",
    category: "Dinner",
    image: "images/chickenveg.jpg",
    ingredients: ["2 chicken breasts", "1 bell pepper", "1 zucchini", "olive oil", "Italian seasoning"],
    steps: ["Preheat oven to 375°F (190°C). Chop the veggies into chunks.",
            "On a baking sheet, toss chicken and veggies with olive oil, Italian seasoning, salt, and pepper.",
            "Bake for 25-30 minutes until chicken is cooked through and veggies are tender."],
    nutrition: { calories: 425, carbs: 15, protein: 40, fat: 20 }
  }

 
];

// Render recipe cards
function renderRecipes(list) {
  const container = document.getElementById("recipeContainer");
  container.innerHTML = "";
  list.forEach(r => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${r.image}" alt="${r.title}">
      <h3>${r.title}</h3>
      <p>${r.category}</p>
    `;
    card.addEventListener("click", () => openModal(r));
    container.appendChild(card);
  });
}
renderRecipes(recipes);

// Modal with nutrition table
function openModal(recipe) {
  document.getElementById("modalTitle").textContent = recipe.title;
  document.getElementById("modalImage").src = recipe.image;

  // Ingredients
  const ingList = document.getElementById("modalIngredients");
  ingList.innerHTML = "";
  recipe.ingredients.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    ingList.appendChild(li);
  });

  // Steps
  const stepList = document.getElementById("modalSteps");
  stepList.innerHTML = "";
  recipe.steps.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    stepList.appendChild(li);
  });

  // Nutrition table
  const table = document.getElementById("modalNutrition");
  table.innerHTML = `
    <tr><th>Calories</th><td>${recipe.nutrition.calories}</td></tr>
    <tr><th>Carbs</th><td>${recipe.nutrition.carbs} g</td></tr>
    <tr><th>Protein</th><td>${recipe.nutrition.protein} g</td></tr>
    <tr><th>Fat</th><td>${recipe.nutrition.fat} g</td></tr>
  `;

  document.getElementById("recipeModal").style.display = "block";
}

// Close modal
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("recipeModal").style.display = "none";
});

// Search
document.getElementById("recipeSearch").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const filtered = recipes.filter(r => r.title.toLowerCase().includes(term));
  renderRecipes(filtered);
});

// Filter by category
document.getElementById("categoryFilter").addEventListener("change", e => {
  const cat = e.target.value;
  if (cat === "") renderRecipes(recipes);
  else {
    const filtered = recipes.filter(r => r.category === cat);
    renderRecipes(filtered);
  }
});
