/* ===========================
   ANTI BIKILI — Home Page Script
=========================== */

function renderCategories() {
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <a class="category-card" href="products.html?category=${c.id}">
      <div class="icon">${c.icon}</div>
      <div class="name">${c.name}</div>
    </a>
  `).join("");
}

function productCardHTML(p) {
  const wished = isInWishlist(p.id);
  return `
    <div class="product-card" data-id="${p.id}">
      <a href="product-details.html?id=${p.id}" class="product-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/400x400/2a2f3a/eef0f4?text=' + encodeURIComponent('${p.name}');">
        <button class="wish-toggle ${wished ? "active" : ""}" data-wish="${p.id}" title="Add to wishlist" onclick="event.preventDefault();">
          ${wished ? "♥" : "♡"}
        </button>
      </a>
      <div class="product-body">
        <a href="product-details.html?id=${p.id}">
          <div class="product-cat">${p.categoryName}</div>
          <div class="product-name">${p.name}</div>
        </a>
        <div class="product-rating">${starString(p.rating)}</div>
        <div class="product-price">${formatPrice(p.price)} ${p.oldPrice ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : ""}</div>
      </div>
      <div class="product-actions">
        <button class="btn btn-outline" data-view="${p.id}">View</button>
        <button class="btn btn-primary" data-cart="${p.id}">Add to Cart</button>
      </div>
    </div>
  `;
}

function attachProductGridEvents(container) {
  container.querySelectorAll("[data-cart]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.cart);
      addToCart(id, 1);
      updateNavBadges();
      showToast("Added to cart");
    });
  });
  container.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = `product-details.html?id=${btn.dataset.view}`;
    });
  });
  container.querySelectorAll("[data-wish]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.wish);
      toggleWishlist(id);
      btn.classList.toggle("active");
      btn.textContent = btn.classList.contains("active") ? "♥" : "♡";
      updateNavBadges();
      showToast(isInWishlist(id) ? "Added to wishlist" : "Removed from wishlist");
    });
  });
}

function renderFeatured() {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;
  const featured = PRODUCTS.filter(p => p.rating >= 4.3).slice(0, 8);
  grid.innerHTML = featured.map(productCardHTML).join("");
  attachProductGridEvents(grid);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderFeatured();
});
