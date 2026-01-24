document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");

  if (!input || !resultsContainer) return;

  fetch("/search.json")
    .then(res => res.json())
    .then(posts => {
      input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        resultsContainer.innerHTML = "";

        if (!query) return;

        const filtered = posts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
        );

        filtered.forEach(post => {
          const el = document.createElement("article");
          el.className = "post-card";
          el.innerHTML = `
            <a href="${post.url}">
              <h3>${post.title}</h3>
              <p>${post.content.substring(0, 140)}…</p>
            </a>
          `;
          resultsContainer.appendChild(el);
        });
      });
    });
});
