// main.js
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".charcard");
  const gameBtn = document.getElementById("gameBtn");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.setAttribute("aria-pressed", "false"));
      card.setAttribute("aria-pressed", "true");
      gameBtn.classList.add("active");
    });
  });
});
