document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const button = document.getElementById("search-button");
  const container = document.getElementById("search-results");

  if (!input || !button || !container) return;

  const category = input.dataset.category;
  let allPosts = [];

  fetch("/search.json")
    .then(res => res.json())
    .then(data => {
      allPosts = data.filter(post =>
        post.categories && post.categories.includes(category)
      );
    });

  function renderPosts(posts) {
    container.innerHTML = "";

    if (!posts.length) {
      container.innerHTML = "<p>No matching posts found.</p>";
      return;
    }

    posts.forEach(post => {
      const el = document.createElement("article");
      el.className = "post-card";
      el.innerHTML = `
        <a href="${post.url}">
          <h3>${post.title}</h3>
          <div class="meta">
            ${post.date}${post.read_time ? " · " + post.read_time + " min read" : ""}
          </div>
          <p>${post.content.substring(0, 140)}…</p>
        </a>
      `;
      container.appendChild(el);
    });
  }

  function runSearch() {
    const q = input.value.toLowerCase().trim();

    if (!q) {
      window.location.reload(); // reset to original Jekyll render
      return;
    }

    const matches = allPosts.filter(post =>
      post.title.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
    );

    renderPosts(matches);
  }

  button.addEventListener("click", runSearch);
  input.addEventListener("keyup", e => {
    if (e.key === "Enter") runSearch();
  });
});
