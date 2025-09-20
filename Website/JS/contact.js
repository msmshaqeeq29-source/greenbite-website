// Contact form
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    document.getElementById("formMsg").textContent = "Please fill all fields.";
    return;
  }

  const feedback = { name, email, message, date: new Date().toLocaleString() };
  const list = JSON.parse(localStorage.getItem("feedback") || "[]");
  list.push(feedback);
  localStorage.setItem("feedback", JSON.stringify(list));

  document.getElementById("formMsg").textContent = "Thank you for your message!";
  document.getElementById("contactForm").reset();

  displayFeedback();
});

// Display feedback history
function displayFeedback() {
  const list = JSON.parse(localStorage.getItem("feedback") || "[]");
  const container = document.getElementById("feedbackHistory");
  container.innerHTML = "<h2>Feedback History</h2>";

  if (list.length === 0) {
    container.innerHTML += "<p>No feedback yet.</p>";
    return;
  }

  list.slice(-5).forEach(fb => {
    const item = document.createElement("div");
    item.className = "feedback-item";
    item.innerHTML = `
      <p><strong>${fb.name}</strong> (${fb.email})</p>
      <p>${fb.message}</p>
      <small>${fb.date}</small>
    `;
    container.appendChild(item);
  });
}
document.addEventListener("DOMContentLoaded", displayFeedback);

// FAQ accordion with smooth animation
// FAQ accordion with smooth animation
const questions = document.querySelectorAll(".faq-question");
questions.forEach(q => {
  q.addEventListener("click", () => {
    q.classList.toggle("active");
    const answer = q.nextElementSibling;
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
