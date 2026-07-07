/* ===========================
   ANTI BIKILI — Wishlist Page Script
=========================== */

function renderWishlistPage() {
  const grid = document.getElementById("wishlistGrid");
  const items = getWishlistDetailed();

  if (items.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
      <div class="icon">🤍</div>
      <p>Your wishlist is empty.</p>
      <a href="products.html" class="btn btn-primary">Browse Products</a>
    </div>`;
    return;
  }

  grid.innerHTML = items.map(p => `
    <div class="product-card" data-id="${p.id}">
      <a href="product-details.html?id=${p.id}" class="product-img"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/400x400/2a2f3a/eef0f4?text=' + encodeURIComponent('${p.name}');"></a>
      <div class="product-body">
        <a href="product-details.html?id=${p.id}">
          <div class="product-cat">${p.categoryName}</div>
          <div class="product-name">${p.name}</div>
        </a>
        <div class="product-rating">${starString(p.rating)}</div>
        <div class="product-price">${formatPrice(p.price)}</div>
      </div>
      <div class="product-actions">
        <button class="btn btn-outline" data-remove="${p.id}">Remove</button>
        <button class="btn btn-primary" data-move="${p.id}">Move to Cart</button>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromWishlist(Number(btn.dataset.remove));
      updateNavBadges();
      renderWishlistPage();
      showToast("Removed from wishlist");
    });
  });
  grid.querySelectorAll("[data-move]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.move);
      addToCart(id, 1);
      removeFromWishlist(id);
      updateNavBadges();
      renderWishlistPage();
      showToast("Moved to cart");
    });
  });
}

document.addEventListener("DOMContentLoaded", renderWishlistPage);
