// Newsletter signup
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletterForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("newsletterEmail").value.trim();
      if (!email) return;

      const list = JSON.parse(localStorage.getItem("newsletter") || "[]");
      list.push(email);
      localStorage.setItem("newsletter", JSON.stringify(list));

      document.getElementById("newsletterMsg").textContent = "Thanks for subscribing!";
      form.reset();
    });
  }
});

// js/app.js
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const toggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');

  if (!nav || !toggle || !navList) return;

  toggle.addEventListener('click', () => {
    const willOpen = !nav.classList.contains('open');
    nav.classList.toggle('open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
    document.body.classList.toggle('nav-open', willOpen);
  });

  // Close when clicking a link inside mobile menu
  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
  });

  // Close if clicking outside the nav while open
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    if (!nav.contains(e.target) && e.target !== toggle) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  });

  // Close with Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  });
});


