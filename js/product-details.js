/* ===========================
   ANTI BIKILI — Product Details Page Script
=========================== */

let currentQty = 1;

function renderProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const product = getProductById(id);
  const container = document.getElementById("pdContainer");

  if (!product) {
    container.innerHTML = `<div class="empty-state">
      <div class="icon">❓</div>
      <p>Product not found.</p>
      <a href="products.html" class="btn btn-primary">Back to Products</a>
    </div>`;
    return;
  }

  const wished = isInWishlist(product.id);

  container.innerHTML = `
    <div class="pd-wrap">
      <div class="pd-img"><img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x400/2a2f3a/eef0f4?text=' + encodeURIComponent('${product.name}');"></div>
      <div class="pd-info">
        <div class="product-cat">${product.categoryName}</div>
        <h1>${product.name}</h1>
        <div class="product-rating">${starString(product.rating)} · ${product.ratingCount} ratings</div>
        <div class="pd-price">
          ${formatPrice(product.price)}
          ${product.oldPrice ? `<span class="old">${formatPrice(product.oldPrice)}</span>` : ""}
        </div>
        <p class="pd-desc">${product.description}</p>
        <div class="pd-meta">
          <div><strong>${product.stock > 0 ? "In Stock" : "Out of Stock"}</strong>Availability</div>
          <div><strong>${product.stock}</strong>Units left</div>
          <div><strong>Free</strong>Above ₹999</div>
        </div>
        <div class="pd-qty">
          <button id="qtyMinus">−</button>
          <span id="qtyValue">1</span>
          <button id="qtyPlus">+</button>
        </div>
        <div class="pd-actions">
          <button class="btn btn-primary" id="pdAddCart" ${product.stock === 0 ? "disabled" : ""}>Add to Cart</button>
          <button class="btn btn-outline" id="pdAddWish">${wished ? "♥ In Wishlist" : "♡ Add to Wishlist"}</button>
        </div>
      </div>
    </div>

    <div class="section-title"><h2>You may also like</h2></div>
    <div class="product-grid" id="relatedGrid"></div>
  `;

  document.getElementById("qtyMinus").addEventListener("click", () => {
    if (currentQty > 1) currentQty--;
    document.getElementById("qtyValue").textContent = currentQty;
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    if (currentQty < product.stock) currentQty++;
    document.getElementById("qtyValue").textContent = currentQty;
  });
  document.getElementById("pdAddCart").addEventListener("click", () => {
    addToCart(product.id, currentQty);
    updateNavBadges();
    showToast(`Added ${currentQty} item(s) to cart`);
  });
  document.getElementById("pdAddWish").addEventListener("click", () => {
    toggleWishlist(product.id);
    const btn = document.getElementById("pdAddWish");
    btn.textContent = isInWishlist(product.id) ? "♥ In Wishlist" : "♡ Add to Wishlist";
    updateNavBadges();
  });

  // Related products from same category
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const relatedGrid = document.getElementById("relatedGrid");
  relatedGrid.innerHTML = related.map(productCardHTML).join("");
  attachProductGridEvents(relatedGrid);
}

document.addEventListener("DOMContentLoaded", renderProductDetails);
