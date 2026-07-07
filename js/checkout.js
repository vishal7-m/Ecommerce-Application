/* ===========================
   ANTI BIKILI — Checkout Page Script
   Demo payment simulation only. No real transactions.
   No card numbers, OTPs, or bank details are ever stored.
=========================== */

let selectedPayment = "cod";

function renderCheckoutSummary() {
  const items = getCartDetailed();
  const summaryContainer = document.getElementById("checkoutItemsSummary");

  if (items.length === 0) {
    document.getElementById("checkoutLayout").innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <div class="icon">🛒</div>
        <p>Your cart is empty. Add items before checking out.</p>
        <a href="products.html" class="btn btn-primary">Browse Products</a>
      </div>`;
    return false;
  }

  summaryContainer.innerHTML = items.map(i => `
    <div class="summary-row"><span>${i.name} × ${i.qty}</span><span>${formatPrice(i.lineTotal)}</span></div>
  `).join("");

  const t = getCartTotals();
  document.getElementById("coSubtotal").textContent = formatPrice(t.subtotal);
  document.getElementById("coShipping").textContent = t.shipping === 0 ? "FREE" : formatPrice(t.shipping);
  document.getElementById("coTax").textContent = formatPrice(t.tax);
  document.getElementById("coTotal").textContent = formatPrice(t.total);
  return true;
}

function setupPaymentOptions() {
  document.querySelectorAll(".pay-option").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".pay-option").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      selectedPayment = opt.dataset.pay;
    });
  });
}

function validateField(id, condition) {
  const errorEl = document.getElementById(`err-${id}`);
  if (!condition) {
    errorEl.style.display = "block";
    return false;
  }
  errorEl.style.display = "none";
  return true;
}

function validateCheckoutForm() {
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();

  const nameValid = validateField("custName", name.length >= 2);
  const phoneValid = validateField("custPhone", /^[6-9]\d{9}$/.test(phone));
  const addressValid = validateField("custAddress", address.length >= 8);

  return nameValid && phoneValid && addressValid;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  if (!validateCheckoutForm()) {
    showToast("Please fix the highlighted fields");
    return;
  }

  const items = getCartDetailed();
  const totals = getCartTotals();

  // Demo payment simulation — always "succeeds", no real gateway involved
  const order = {
    orderId: generateOrderId(),
    date: new Date().toISOString(),
    customer: {
      name: document.getElementById("custName").value.trim(),
      phone: document.getElementById("custPhone").value.trim(),
      address: document.getElementById("custAddress").value.trim(),
    },
    paymentMethod: selectedPayment,
    items: items.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price, lineTotal: i.lineTotal })),
    totals: totals,
    estimatedDelivery: getEstimatedDelivery(),
  };

  saveOrder(order);
  clearCart();
  window.location.href = `order-confirmation.html?orderId=${encodeURIComponent(order.orderId)}`;
}

function getEstimatedDelivery() {
  const d = new Date();
  d.setDate(d.getDate() + (Math.floor(Math.random() * 3) + 4)); // 4-6 days
  return d.toDateString();
}

document.addEventListener("DOMContentLoaded", () => {
  const hasItems = renderCheckoutSummary();
  setupPaymentOptions();
  if (hasItems) {
    document.getElementById("checkoutForm").addEventListener("submit", handleCheckoutSubmit);
  }
});
