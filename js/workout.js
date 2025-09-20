// Expanded workout data
const workouts = [
  { body: "arms", equipment: "none", name: "Push-ups", duration: 30 },
  { body: "arms", equipment: "none", name: "Tricep Dips", duration: 30 },
  { body: "arms", equipment: "dumbbells", name: "Bicep Curls", duration: 30 },
  { body: "arms", equipment: "dumbbells", name: "Overhead Press", duration: 40 },
  { body: "legs", equipment: "none", name: "Bodyweight Squats", duration: 45 },
  { body: "legs", equipment: "none", name: "Lunges", duration: 40 },
  { body: "legs", equipment: "dumbbells", name: "Goblet Squats", duration: 45 },
  { body: "legs", equipment: "dumbbells", name: "Dumbbell Deadlifts", duration: 50 },
  { body: "full", equipment: "none", name: "Burpees", duration: 30 },
  { body: "full", equipment: "none", name: "Mountain Climbers", duration: 30 },
  { body: "full", equipment: "dumbbells", name: "Dumbbell Thrusters", duration: 40 },
  { body: "full", equipment: "dumbbells", name: "Renegade Rows", duration: 45 },
  { body: "arms", equipment: "none", name: "Plank Shoulder Taps", duration: 30 },
  { body: "arms", equipment: "none", name: "Diamond Push-ups", duration: 25 },
  { body: "arms", equipment: "dumbbells", name: "Hammer Curls", duration: 35 },
  { body: "arms", equipment: "dumbbells", name: "Lateral Raises", duration: 30 },
  { body: "arms", equipment: "resistance band", name: "Band Pull Aparts", duration: 30 },
  { body: "arms", equipment: "resistance band", name: "Band Bicep Curls", duration: 35 },
  { body: "arms", equipment: "kettlebell", name: "Kettlebell Overhead Press", duration: 40 },
  { body: "arms", equipment: "kettlebell", name: "Kettlebell Curl", duration: 30 },
  { body: "legs", equipment: "resistance band", name: "Banded Side Steps", duration: 40 },
  { body: "legs", equipment: "resistance band", name: "Banded Squats", duration: 45 },
  { body: "legs", equipment: "kettlebell", name: "Kettlebell Swings", duration: 40 },
  { body: "legs", equipment: "kettlebell", name: "Kettlebell Lunges", duration: 35 },
  { body: "full", equipment: "mat", name: "Plank to Push-up", duration: 40 },
  { body: "full", equipment: "mat", name: "V-Ups", duration: 35 },
  { body: "full", equipment: "kettlebell", name: "Kettlebell Snatch", duration: 50 },
  { body: "full", equipment: "resistance band", name: "Band Thrusters", duration: 45 }



];

// Form submit
document.getElementById("workoutForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const bodyPart = document.getElementById("bodyPart").value;
  const equipment = document.getElementById("equipment").value;

  // Filter workouts based on user choices
  const filtered = workouts.filter(
    w => (w.body === bodyPart || bodyPart === "full") &&
         (w.equipment === equipment)
  );

  if (filtered.length === 0) {
    document.getElementById("workoutPlan").innerHTML = "<p>No workouts found.</p>";
    return;
  }

  // Randomly pick up to 3 exercises
  const chosen = [];
  const temp = [...filtered];
  for (let i = 0; i < 3 && temp.length > 0; i++) {
    const index = Math.floor(Math.random() * temp.length);
    chosen.push(temp[index]);
    temp.splice(index, 1);
  }

  displayWorkout(chosen);
});

// Display workout cards
function displayWorkout(list) {
  const container = document.getElementById("workoutPlan");
  container.innerHTML = "";

  list.forEach((w, i) => {
    const card = document.createElement("div");
    card.className = "workout-card";
    card.innerHTML = `
      <h3>${w.name}</h3>
      <p><strong>Duration:</strong> ${w.duration} seconds</p>
      <button onclick="startTimer(${w.duration}, 'timer${i}')">Start Timer</button>
      <div id="timer${i}" class="timer-display">Ready</div>
    `;
    container.appendChild(card);
  });
}

// Countdown timer
function startTimer(seconds, elementId) {
  let remaining = seconds;
  const display = document.getElementById(elementId);

  const interval = setInterval(() => {
    display.textContent = remaining + "s";
    display.style.color = remaining <= 5 ? "red" : "black";

    if (remaining <= 0) {
      clearInterval(interval);
      display.textContent = "Done!";
    }
    remaining--;
  }, 1000);
}
