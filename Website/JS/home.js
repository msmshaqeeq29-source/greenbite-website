// js/home.js
document.addEventListener('DOMContentLoaded', () => {
  // --- Slogans (rotating) ---
  const slogans = [
    "Eat green, feel great.",
    "Small habits, big changes.",
    "Nourish your body daily.",
    "Healthy Living Starts Here.",
    "Fuel Your Body, Free Your Mind."
  ];
  const sloganEl = document.getElementById('slogan');
  if (sloganEl) {
    let idx = 0;
    sloganEl.textContent = slogans[idx];
    setInterval(() => {
      idx = (idx + 1) % slogans.length;
      sloganEl.textContent = slogans[idx];
    }, 4000);
  }

  // --- Daily tip (safe) ---
  const tips = [
    "Drink 2 liters of water today.",
    "Take a 10-minute walk after meals.",
    "Add more vegetables to your lunch.",
    "Practice deep breathing for 5 minutes.",
    "Swap one sugary drink for water today."
  ];
  const tipEl = document.getElementById('healthTip'); // match index.html id
  if (tipEl) {
    const dayIndex = new Date().getDay(); // 0..6
    tipEl.textContent = tips[dayIndex % tips.length];
  }

  // --- Newsletter (only if the form exists) ---
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterMsg = document.getElementById('newsletterMsg');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailEl = document.getElementById('newsletterEmail');
      if (!emailEl) return;
      const email = emailEl.value.trim();
      if (!email) {
        if (newsletterMsg) newsletterMsg.textContent = 'Please provide an email.';
        return;
      }
      const list = JSON.parse(localStorage.getItem('greenbite_news') || '[]');
      list.push(email);
      localStorage.setItem('greenbite_news', JSON.stringify(list));
      if (newsletterMsg) newsletterMsg.textContent = 'Thanks — subscribed!';
      newsletterForm.reset();
    });
  }
});
