document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const button = document.getElementById("search-button");
  const cards = document.querySelectorAll(".post-card");

  if (!input || !button || !cards.length) return;

  function runSearch() {
    const query = input.value.toLowerCase().trim();

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(query) ? "" : "none";
    });
  }

  button.addEventListener("click", runSearch);
  input.addEventListener("keyup", runSearch);
});
