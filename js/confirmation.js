/* ===========================
   ANTI BIKILI — Order Confirmation Page Script
=========================== */

function renderConfirmation() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");
  const order = getOrderById(orderId);
  const box = document.getElementById("confirmBox");

  if (!order) {
    box.innerHTML = `
      <div class="tick" style="color:var(--clr-primary);">⚠️</div>
      <h1>Order Not Found</h1>
      <p style="color:var(--clr-text-dim);">We couldn't find this order. It may have already been viewed or the link is invalid.</p>
      <a href="index.html" class="btn btn-primary" style="margin-top:14px;display:inline-block;">Back to Home</a>
    `;
    return;
  }

  const itemsHTML = order.items.map(i => `
    <div class="row"><span>${i.name} × ${i.qty}</span><span>${formatPrice(i.lineTotal)}</span></div>
  `).join("");

  box.innerHTML = `
    <div class="tick">✅</div>
    <h1>Order Placed Successfully!</h1>
    <p style="color:var(--clr-text-dim);">Thank you, ${order.customer.name}. This is a demo order — no real payment was charged.</p>

    <div class="order-info">
      <div class="row"><span>Order ID</span><strong>${order.orderId}</strong></div>
      <div class="row"><span>Payment Method</span><strong>${order.paymentMethod.toUpperCase()}</strong></div>
      <div class="row"><span>Estimated Delivery</span><strong>${order.estimatedDelivery}</strong></div>
    </div>

    <div class="order-info">
      ${itemsHTML}
      <div class="row" style="border-top:1px solid var(--clr-border);padding-top:8px;margin-top:8px;">
        <span>Total Paid</span><strong>${formatPrice(order.totals.total)}</strong>
      </div>
    </div>

    <a href="products.html" class="btn btn-primary" style="margin-top:10px;">Continue Shopping</a>
  `;
}

document.addEventListener("DOMContentLoaded", renderConfirmation);
