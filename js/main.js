/* ===========================
   ANTI BIKILI — Shared Site Script
   Runs on every page: nav badges, theme, search, toast
=========================== */

function initHeader() {
  applyTheme(getTheme());
  updateNavBadges();

  const hamburger = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
  }

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.textContent = getTheme() === "light" ? "🌙" : "☀️";
    themeBtn.addEventListener("click", () => {
      const t = toggleTheme();
      themeBtn.textContent = t === "light" ? "🌙" : "☀️";
    });
  }

  const searchForm = document.getElementById("navSearchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", e => {
      e.preventDefault();
      const q = document.getElementById("navSearchInput").value.trim();
      window.location.href = `products.html?q=${encodeURIComponent(q)}`;
    });
  }

  highlightActiveNav();
}

function updateNavBadges() {
  const cartBadge = document.getElementById("cartBadge");
  const wishBadge = document.getElementById("wishBadge");
  if (cartBadge) {
    const count = getCartCount();
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? "inline-block" : "none";
  }
  if (wishBadge) {
    const count = getWishlist().length;
    wishBadge.textContent = count;
    wishBadge.style.display = count > 0 ? "inline-block" : "none";
  }
}

function highlightActiveNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === page) a.classList.add("active");
  });
}

function showToast(message) {
  let toast = document.getElementById("globalToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "globalToast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function formatPrice(n) {
  return "₹" + n.toLocaleString("en-IN");
}

function starString(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full) + ` (${rating})`;
}

document.addEventListener("DOMContentLoaded", initHeader);
