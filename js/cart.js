/* ===========================
   ANTI BIKILI — Cart Page Script
=========================== */

function renderCartPage() {
  const list = document.getElementById("cartItemsList");
  const items = getCartDetailed();
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (items.length === 0) {
    list.innerHTML = `<div class="empty-state">
      <div class="icon">🛒</div>
      <p>Your cart is empty.</p>
      <a href="products.html" class="btn btn-primary">Browse Products</a>
    </div>`;
    checkoutBtn.classList.add("btn-disabled");
    checkoutBtn.style.pointerEvents = "none";
    checkoutBtn.style.opacity = ".5";
  } else {
    checkoutBtn.style.pointerEvents = "auto";
    checkoutBtn.style.opacity = "1";
    list.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="thumb"><img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" onerror="this.onerror=null;this.src='https://placehold.co/400x400/2a2f3a/eef0f4?text=' + encodeURIComponent('${item.name}');"></div>
        <div class="info">
          <div class="product-cat">${item.categoryName}</div>
          <h3>${item.name}</h3>
          <div class="product-rating">${formatPrice(item.price)} each</div>
        </div>
        <div class="qty-control">
          <button data-qty-minus="${item.id}">−</button>
          <span>${item.qty}</span>
          <button data-qty-plus="${item.id}">+</button>
        </div>
        <div class="price">${formatPrice(item.lineTotal)}</div>
        <button class="remove-btn" data-remove="${item.id}" title="Remove">✕</button>
      </div>
    `).join("");
  }

  updateSummary();
  attachCartEvents();
}

function updateSummary() {
  const t = getCartTotals();
  document.getElementById("sumSubtotal").textContent = formatPrice(t.subtotal);
  document.getElementById("sumShipping").textContent = t.shipping === 0 ? "FREE" : formatPrice(t.shipping);
  document.getElementById("sumTax").textContent = formatPrice(t.tax);
  document.getElementById("sumTotal").textContent = formatPrice(t.total);
}

function attachCartEvents() {
  document.querySelectorAll("[data-qty-plus]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.qtyPlus);
      const cart = getCart();
      const item = cart.find(i => i.id === id);
      updateCartQty(id, item.qty + 1);
      updateNavBadges();
      renderCartPage();
    });
  });
  document.querySelectorAll("[data-qty-minus]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.qtyMinus);
      const cart = getCart();
      const item = cart.find(i => i.id === id);
      updateCartQty(id, item.qty - 1);
      updateNavBadges();
      renderCartPage();
    });
  });
  document.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.dataset.remove));
      updateNavBadges();
      renderCartPage();
      showToast("Item removed from cart");
    });
  });
}

document.addEventListener("DOMContentLoaded", renderCartPage);
