// --- Breathing Exercise ---
let breathingInterval;
const toggleBtn = document.getElementById("toggleBreathing");
const breathingText = document.getElementById("breathingText");
const breathingCircle = document.getElementById("breathingCircle");

function breathingExercise() {
  breathingText.textContent = "Breathe In...";
  breathingCircle.classList.add("expand");
  breathingCircle.classList.remove("shrink");
  setTimeout(() => {
    breathingText.textContent = "Hold...";
  }, 4000);
  setTimeout(() => {
    breathingText.textContent = "Breathe Out...";
    breathingCircle.classList.add("shrink");
    breathingCircle.classList.remove("expand");
  }, 6000);
}

toggleBtn.addEventListener("click", () => {
  if (breathingInterval) {
    clearInterval(breathingInterval);
    breathingInterval = null;
    toggleBtn.textContent = "Start Breathing Exercise";
    breathingText.textContent = "Paused";
  } else {
    breathingExercise();
    breathingInterval = setInterval(breathingExercise, 10000);
    toggleBtn.textContent = "Stop Breathing Exercise";
  }
});


// --- Meditation Timer ---
document.getElementById("startMeditation").addEventListener("click", () => {
  let minutes = parseInt(document.getElementById("meditationMinutes").value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid number of minutes.");
    return;
  }

  let totalSeconds = minutes * 60;
  const display = document.getElementById("timerDisplay");

  const timer = setInterval(() => {
    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;
    display.textContent = 
      String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
    totalSeconds--;

    if (totalSeconds < 0) {
      clearInterval(timer);
      display.textContent = "Done!";
      alert("Meditation session complete 🌿");
    }
  }, 1000);
});


// --- Ambient sound manager (robust play / pause / switch) ---
const soundSelect = document.getElementById("soundSelect");
const soundBtn = document.getElementById("toggleSound");

// state
let audio = null;          // Audio instance
let currentSound = null;   // string path of current sound

function updateSoundButton() {
  if (!audio) {
    soundBtn.textContent = "Play Sound";
    return;
  }
  soundBtn.textContent = audio.paused ? "Play Sound" : "Pause Sound";
}

// click: play / pause
soundBtn.addEventListener("click", () => {
  const selected = soundSelect.value;
  if (!selected) {
    alert("Please choose a sound first.");
    return;
  }

  // If no audio created yet, or user changed selection since last time -> create new Audio
  // We compare to the stored currentSound string (not audio.src which is absolute).
  if (!audio || currentSound !== selected) {
    // stop old one if exists
    if (audio) {
      try { audio.pause(); } catch (e) { /* ignore */ }
      audio = null;
    }
    audio = new Audio(selected);
    audio.loop = true;
    currentSound = selected;
  }

  // Toggle play/pause on the existing audio instance
  if (audio.paused) {
    audio.play()
      .then(() => {
        updateSoundButton();
      })
      .catch(err => {
        console.error("Audio play failed:", err);
        alert("Unable to play sound. Check that the file exists and your browser allows playback.");
      });
  } else {
    audio.pause();
    updateSoundButton();
  }
});

// If user changes selection from the dropdown
soundSelect.addEventListener("change", () => {
  const selected = soundSelect.value;

  // if nothing selected -> stop & clear
  if (!selected) {
    if (audio) {
      audio.pause();
      audio = null;
      currentSound = null;
    }
    updateSoundButton();
    return;
  }

  // if currently playing something different -> switch immediately and keep playing
  if (audio && !audio.paused && currentSound !== selected) {
    audio.pause();
    audio = new Audio(selected);
    audio.loop = true;
    currentSound = selected;
    audio.play()
      .then(updateSoundButton)
      .catch(err => {
        console.error("Play after switch failed:", err);
        alert("Could not play the selected sound.");
      });
    return;
  }

  // otherwise just update currentSound so next Play will use it
  if (!audio) {
    currentSound = selected;
  } else if (currentSound !== selected) {
    // if audio exists but paused and user changed sound, set audio to null so the click will create new one
    audio.pause();
    audio = null;
    currentSound = selected;
  }
  updateSoundButton();
});

// ensure we pause audio when leaving the page
window.addEventListener("beforeunload", () => {
  if (audio) try { audio.pause(); } catch(e){ }
});
