/* ===========================
   ANTI BIKILI — Storage Layer
   All persistence via LocalStorage.
   NOTE: No sensitive data (passwords, card numbers, OTPs) is ever stored here.
=========================== */

const LS_KEYS = {
  CART: "ab_cart",
  WISHLIST: "ab_wishlist",
  ORDERS: "ab_orders",
  THEME: "ab_theme",
};

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (e) {
    console.warn("LocalStorage read failed for", key, e);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn("LocalStorage write failed for", key, e);
    return false;
  }
}

/* ---------- Cart ---------- */
function getCart() {
  return safeGet(LS_KEYS.CART, []); // [{id, qty}]
}
function saveCart(cart) {
  safeSet(LS_KEYS.CART, cart);
}
function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty; // don't duplicate — increase quantity instead
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  return cart;
}
function updateCartQty(productId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  } else {
    const item = cart.find(i => i.id === productId);
    if (item) item.qty = qty;
  }
  saveCart(cart);
  return cart;
}
function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  return cart;
}
function clearCart() {
  saveCart([]);
}
function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function getCartDetailed() {
  return getCart()
    .map(item => {
      const product = getProductById(item.id);
      if (!product) return null;
      return { ...product, qty: item.qty, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);
}
function getCartTotals() {
  const items = getCartDetailed();
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const shipping = subtotal > 0 && subtotal < 999 ? 49 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total, itemCount: items.reduce((s, i) => s + i.qty, 0) };
}

/* ---------- Wishlist ---------- */
function getWishlist() {
  return safeGet(LS_KEYS.WISHLIST, []); // [id, id, ...]
}
function saveWishlist(list) {
  safeSet(LS_KEYS.WISHLIST, list);
}
function isInWishlist(productId) {
  return getWishlist().includes(productId);
}
function toggleWishlist(productId) {
  let list = getWishlist();
  if (list.includes(productId)) {
    list = list.filter(id => id !== productId);
  } else {
    list.push(productId); // duplicate check before adding
  }
  saveWishlist(list);
  return list;
}
function removeFromWishlist(productId) {
  const list = getWishlist().filter(id => id !== productId);
  saveWishlist(list);
  return list;
}
function getWishlistDetailed() {
  return getWishlist().map(id => getProductById(id)).filter(Boolean);
}

/* ---------- Orders ---------- */
function getOrders() {
  return safeGet(LS_KEYS.ORDERS, []);
}
function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  safeSet(LS_KEYS.ORDERS, orders);
}
function getOrderById(orderId) {
  return getOrders().find(o => o.orderId === orderId);
}
function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `AB-${ts}-${rand}`;
}

/* ---------- Theme ---------- */
function getTheme() {
  return safeGet(LS_KEYS.THEME, "dark");
}
function setTheme(theme) {
  safeSet(LS_KEYS.THEME, theme);
  applyTheme(theme);
}
function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
}
function toggleTheme() {
  const current = getTheme();
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}
