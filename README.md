ANTI BIKILI 🛍️ TN Government Ecommerce Serve for people....

A front-end e-commerce web application built with pure HTML, CSS, and JavaScript — no frameworks, no backend, no database. All application state (cart, wishlist, orders, theme) is persisted entirely in the browser using LocalStorage.

This project was built as a portfolio piece to demonstrate core front-end development skills: DOM manipulation, client-side state management, responsive design, and multi-page application architecture — all without relying on any external library or server.


🚀 Live Demo

Since this is a static site with no backend, you can run it in two ways:


Open directly: Extract the project and double-click index.html.
GitHub Pages: Push this repo to GitHub, go to Settings → Pages, set the source branch to main (root), and GitHub will serve it at https://<your-username>.github.io/<repo-name>/.



✨ Features


Home Page — hero banner, shop-by-category grid, featured products
Products Page — live search, category filter, price range filter, sort (price/rating/name)
Product Details Page — Amazon-style image gallery (25 images per product), quantity selector, related products
Wishlist — add/remove products, move directly to cart, persists across sessions
Cart — quantity controls, dynamic subtotal/shipping/tax/total calculation, duplicate-item prevention
Checkout — form validation (name, phone, address), demo payment method selector (COD / UPI / Card — no real transactions)
Order Confirmation — generated order ID, itemized summary, estimated delivery date
Dark/Light Theme Toggle — persisted via LocalStorage
Fully Responsive — desktop, tablet, and mobile layouts with a collapsible nav menu
Storewide 70% Off — every product shows an original price, discounted price, and discount badge



🗂️ Project Structure

anti-bikili/
├── index.html                # Home page
├── products.html              # Product listing with filters/search
├── product-details.html       # Single product view with image gallery
├── wishlist.html               # Saved items
├── cart.html                   # Shopping cart
├── checkout.html               # Delivery + demo payment form
├── order-confirmation.html     # Post-order summary
├── css/
│   └── style.css               # All styling (single shared stylesheet)
├── js/
│   ├── data.js                  # Product catalog (generated dataset) + category list
│   ├── storage.js               # LocalStorage helpers (cart, wishlist, orders, theme)
│   ├── main.js                   # Shared header logic: nav badges, search, theme toggle
│   ├── home.js                    # Home page rendering + reusable product card template
│   ├── products.js                 # Products page filtering/search/sort logic
│   ├── product-details.js           # Product details page + image gallery
│   ├── wishlist.js                   # Wishlist page logic
│   ├── cart.js                        # Cart page logic
│   ├── checkout.js                     # Checkout form validation + order placement
│   └── confirmation.js                  # Order confirmation rendering
└── README.md


🛠️ Tech Stack

LayerTechnologyStructureHTML5StylingCSS3 (custom properties, Grid, Flexbox)LogicVanilla JavaScript (ES6+)PersistenceBrowser LocalStorageImagesDynamically generated via a public image API (no local assets)

No npm packages, no build step, no bundler — just static files that run in any modern browser.


📦 Data Model

Since there is no backend, the product catalog is procedurally generated in js/data.js using deterministic seeded random values (so prices/ratings stay consistent between page loads). Categories currently include:


Electronics
Fashion
Home & Living
Footwear
Beauty
Sports
Books
Toys
Grocery


Each product has: id, name, category, price, oldPrice, discountPercent, rating, ratingCount, stock, description, and a gallery array of 25 image URLs.

LocalStorage Keys

KeyPurposeab_cartArray of { id, qty } cart line itemsab_wishlistArray of saved product IDsab_ordersArray of placed order objects (history)ab_theme"dark" or "light"

No passwords, payment details, or personally identifying sensitive data are ever written to LocalStorage.


⚠️ Important Notes / Limitations


This is a front-end demo only. There is no backend, no real database, and no real payment processing.
The checkout flow simulates a successful payment — it does not integrate with any real payment gateway (no UPI/card/net-banking APIs).
Product images are fetched from a public placeholder/keyword-image service at runtime, so an internet connection is required for images to load. Without internet, images will fall back to a text placeholder.
Cart, wishlist, and order data are stored per browser — clearing browser data/LocalStorage will reset the app.



🧑‍💻 Getting Started (Local Development)

No installation or build tools required.

bash# Clone the repo
git clone https://github.com/<your-username>/anti-bikili.git
cd anti-bikili

# Just open index.html in your browser
# (or use a simple local server for cleaner relative paths)
npx serve .


🗺️ Possible Future Improvements


Product reviews/comments section
User authentication (mocked, still no backend)
Order history page to view past orders
Pagination or infinite scroll for large product lists
PWA support (offline caching, installable app)



👤 Author

Vishal M
B.Tech CSE, SASTRA Deemed University


📄 License

This project is open-source and available for educational/portfolio use.
