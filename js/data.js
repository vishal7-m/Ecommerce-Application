/* ===========================
   ANTI BIKILI — Product Data
   (Generated dataset, no backend)
=========================== */

const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "📱", color: "3b82f6" },
  { id: "fashion", name: "Fashion", icon: "👕", color: "ec4899" },
  { id: "home", name: "Home & Living", icon: "🛋️", color: "f59e0b" },
  { id: "footwear", name: "Footwear", icon: "👟", color: "10b981" },
  { id: "beauty", name: "Beauty", icon: "💄", color: "d946ef" },
  { id: "sports", name: "Sports", icon: "🏋️", color: "ef4444" },
  { id: "books", name: "Books", icon: "📚", color: "8b5cf6" },
  { id: "toys", name: "Toys", icon: "🧸", color: "06b6d4" },
];

const CATEGORY_ICON = Object.fromEntries(CATEGORIES.map(c => [c.id, c.icon]));
const CATEGORY_COLOR = Object.fromEntries(CATEGORIES.map(c => [c.id, c.color]));

function buildImageUrl(name, catId, seedId) {
  // Use first 1-2 meaningful words of the product name as a search keyword
  const keyword = name.split(" ").slice(0, 2).join(",").toLowerCase();
  // loremflickr returns a real photo matching the keyword; seedId keeps it stable per product
  return `https://loremflickr.com/400/400/${encodeURIComponent(keyword)}?lock=${seedId}`;
}

// Templates used to procedurally build 50+ realistic-looking products
const PRODUCT_TEMPLATES = {
  electronics: ["Wireless Earbuds", "Smart Watch", "Bluetooth Speaker", "Laptop Stand", "Mechanical Keyboard", "Gaming Mouse", "Power Bank 20000mAh", "USB-C Hub", "Noise Cancelling Headphones", "Portable SSD 1TB"],
  fashion: ["Cotton Hoodie", "Slim Fit Jeans", "Graphic T-Shirt", "Denim Jacket", "Formal Shirt", "Casual Chinos", "Winter Sweater", "Track Suit", "Leather Belt", "Sunglasses"],
  home: ["LED Desk Lamp", "Memory Foam Pillow", "Ceramic Coffee Mug Set", "Wall Clock", "Storage Organizer Box", "Scented Candle Set", "Bedsheet Combo", "Kitchen Knife Set", "Bean Bag Chair", "Photo Frame Set"],
  footwear: ["Running Shoes", "Canvas Sneakers", "Leather Formal Shoes", "Sports Sandals", "Ankle Boots", "Flip Flops", "Training Shoes", "Loafers"],
  beauty: ["Face Serum", "Herbal Shampoo", "Matte Lipstick Set", "Sunscreen SPF50", "Perfume 100ml", "Face Wash Combo", "Hair Styling Gel", "Nail Polish Set"],
  sports: ["Yoga Mat", "Adjustable Dumbbell Set", "Cricket Bat", "Football", "Resistance Bands", "Skipping Rope", "Badminton Racket Set", "Cycling Helmet"],
  books: ["Self Help Bestseller", "Sci-Fi Novel", "Programming Guide", "Motivational Journal", "Mystery Thriller", "Business Strategy Book"],
  toys: ["Building Blocks Set", "Remote Control Car", "Puzzle 1000pc", "Soft Plush Toy", "Educational STEM Kit", "Action Figure Set"],
};

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function buildProducts() {
  const products = [];
  let id = 1;
  Object.entries(PRODUCT_TEMPLATES).forEach(([catId, names]) => {
    names.forEach((name, idx) => {
      const seed = id * 7.31 + idx;
      const price = Math.round((seededRandom(seed) * 4000 + 399) / 10) * 10;
      const hasDiscount = seededRandom(seed + 1) > 0.5;
      const oldPrice = hasDiscount ? Math.round(price * (1 + seededRandom(seed + 2) * 0.4 + 0.1) / 10) * 10 : null;
      const rating = Math.round((seededRandom(seed + 3) * 1.5 + 3.4) * 10) / 10;
      const stock = Math.floor(seededRandom(seed + 4) * 40) + (seededRandom(seed + 5) > 0.1 ? 5 : 0);

      products.push({
        id: id,
        name: name,
        category: catId,
        categoryName: CATEGORIES.find(c => c.id === catId).name,
        icon: CATEGORY_ICON[catId],
        image: buildImageUrl(name, catId, id),
        price: price,
        oldPrice: oldPrice,
        rating: rating,
        ratingCount: Math.floor(seededRandom(seed + 6) * 900) + 20,
        stock: stock,
        description: `${name} — a premium quality product from our ${CATEGORIES.find(c => c.id === catId).name} collection. Built with durable materials and designed for everyday use. Perfect as a gift or for personal use, backed by great customer reviews.`,
      });
      id++;
    });
  });
  return products;
}

const PRODUCTS = buildProducts();

function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

function searchProducts({ query = "", category = "", minPrice = null, maxPrice = null, sort = "" } = {}) {
  let results = PRODUCTS.slice();

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(p => p.name.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q));
  }
  if (category) {
    results = results.filter(p => p.category === category);
  }
  if (minPrice !== null) results = results.filter(p => p.price >= minPrice);
  if (maxPrice !== null) results = results.filter(p => p.price <= maxPrice);

  if (sort === "price-asc") results.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") results.sort((a, b) => b.price - a.price);
  else if (sort === "rating") results.sort((a, b) => b.rating - a.rating);
  else if (sort === "name") results.sort((a, b) => a.name.localeCompare(b.name));

  return results;
}
