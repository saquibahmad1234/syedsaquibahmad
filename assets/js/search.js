document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");

  if (!input || !resultsContainer) return;

  const category = input.dataset.category;

  fetch("/search.json")
    .then(res => res.json())
    .then(posts => {
      const scopedPosts = posts.filter(post =>
        post.categories && post.categories.includes(category)
      );

      input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();

        // Empty query → show original page (refresh behaviour)
        if (!query) {
          window.location.reload();
          return;
        }

        resultsContainer.innerHTML = "";

        const matches = scopedPosts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
        );

        if (!matches.length) {
          resultsContainer.innerHTML = "<p>No matching posts found.</p>";
          return;
        }

        matches.forEach(post => {
          const card = document.createElement("article");
          card.className = "post-card";
          card.innerHTML = `
            <a href="${post.url}">
              <h3>${post.title}</h3>
              <div class="meta">${post.date}${post.read_time ? " · " + post.read_time + " min read" : ""}</div>
              <p>${post.content.substring(0, 140)}…</p>
            </a>
          `;
          resultsContainer.appendChild(card);
        });
      });
    });
});
