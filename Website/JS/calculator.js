document.getElementById("calcForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get inputs
  const age = Number(document.getElementById("age").value);
  const height = Number(document.getElementById("height").value);
  const weight = Number(document.getElementById("weight").value);
  const gender = document.querySelector("input[name='gender']:checked").value;
  const activity = Number(document.getElementById("activity").value);

  // Calculate BMR
  let BMR;
  if (gender === "male") {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Calculate TDEE
  const TDEE = Math.round(BMR * activity);

  // Macronutrients (50% carbs, 20% protein, 30% fat)
  const carbsG = Math.round((TDEE * 0.50) / 4);   // 4 kcal/g
  const proteinG = Math.round((TDEE * 0.20) / 4); // 4 kcal/g
  const fatG = Math.round((TDEE * 0.30) / 9);     // 9 kcal/g

  // Display results in table format
  document.getElementById("calcResults").innerHTML = `
    <div class="results-card">
      <h2>Your Results</h2>
      <p><strong>BMR:</strong> ${Math.round(BMR)} kcal/day</p>
      <p><strong>TDEE:</strong> ${TDEE} kcal/day</p>

      <h3>Macronutrient Breakdown</h3>
      <table class="macro-table">
        <tr><th>Macronutrient</th><th>Grams per Day</th><th>% of Calories</th></tr>
        <tr><td>Carbs</td><td>${carbsG} g</td><td>50%</td></tr>
        <tr><td>Protein</td><td>${proteinG} g</td><td>20%</td></tr>
        <tr><td>Fat</td><td>${fatG} g</td><td>30%</td></tr>
      </table>
    </div>
  `;
});
