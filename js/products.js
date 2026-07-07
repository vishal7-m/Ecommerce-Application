/* ===========================
   ANTI BIKILI — Products Page Script
=========================== */

function getURLParams() {
  return new URLSearchParams(window.location.search);
}

function populateCategoryFilter() {
  const select = document.getElementById("filterCategory");
  CATEGORIES.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.name;
    select.appendChild(opt);
  });
}

function readFiltersFromDOM() {
  return {
    query: document.getElementById("navSearchInput").value.trim(),
    category: document.getElementById("filterCategory").value,
    sort: document.getElementById("filterSort").value,
    minPrice: document.getElementById("filterMin").value ? Number(document.getElementById("filterMin").value) : null,
    maxPrice: document.getElementById("filterMax").value ? Number(document.getElementById("filterMax").value) : null,
  };
}

function renderProductList() {
  const filters = readFiltersFromDOM();
  const results = searchProducts(filters);
  const grid = document.getElementById("productGrid");
  const count = document.getElementById("resultCount");

  count.textContent = `${results.length} product${results.length !== 1 ? "s" : ""} found`;

  if (results.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
      <div class="icon">🔍</div>
      <p>No products match your search/filters.</p>
    </div>`;
    return;
  }
  grid.innerHTML = results.map(productCardHTML).join("");
  attachProductGridEvents(grid);
}

function initProductsPage() {
  populateCategoryFilter();

  // Apply query params from URL (e.g. from home page category click or nav search)
  const params = getURLParams();
  if (params.get("q")) document.getElementById("navSearchInput").value = params.get("q");
  if (params.get("category")) document.getElementById("filterCategory").value = params.get("category");

  ["filterCategory", "filterSort", "filterMin", "filterMax"].forEach(id => {
    document.getElementById(id).addEventListener("input", renderProductList);
  });

  // Live search-as-you-type on the nav search box (overrides its default submit->redirect on this page)
  const navInput = document.getElementById("navSearchInput");
  navInput.addEventListener("input", renderProductList);
  document.getElementById("navSearchForm").addEventListener("submit", e => {
    e.preventDefault();
    renderProductList();
  });

  document.getElementById("clearFilters").addEventListener("click", () => {
    document.getElementById("filterCategory").value = "";
    document.getElementById("filterSort").value = "";
    document.getElementById("filterMin").value = "";
    document.getElementById("filterMax").value = "";
    navInput.value = "";
    renderProductList();
  });

  renderProductList();
}

document.addEventListener("DOMContentLoaded", initProductsPage);
