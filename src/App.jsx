import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Card from "./Card";
import ProductDetail from "./productsDetails";
import NewProducts from "./newProducts";
import "./app.css";
import { caseProducts, cpuProducts, ramProducts } from "./products";

function App() {
  // Start with three categories: Case, CPU, and RAM.
  // Each category has a list of products.
  const [categories, setCategories] = useState([
    { title: "Case", items: caseProducts },
    { title: "CPU", items: cpuProducts },
    { title: "RAM", items: ramProducts }
  ]);

  // Keep track of product quantities in one place.
  // This is a map: product.id → quantity chosen.
  const [quantities, setQuantities] = useState({});

  // For filtering categories and searching products by name.
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Add a new product to the right category.
  // If the category exists, append the product.
  // If not, create a new category with that product.
  const handleAddProduct = (product) => {
    setCategories(prev => {
      const existing = prev.find(
        c => c.title.toLowerCase() === product.category.toLowerCase()
      );
      const next = existing
        ? prev.map(c =>
            c.title.toLowerCase() === product.category.toLowerCase()
              ? { ...c, items: [...c.items, product] }
              : c
          )
        : [...prev, { title: product.category, items: [product] }];

      // Also initialize its quantity so it can be tracked.
      setQuantities(q => ({ ...q, [product.id]: Number(product.quantity) || 0 }));
      return next;
    });
  };

  // Change the quantity of a product.
  // delta = +1 (increase) or -1 (decrease).
  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(current + delta, 0); // never go below 0
      return { ...prev, [id]: next };
    });
  };

  // Filter categories by selected dropdown and search term.
  // This makes sure only matching products are shown.
  const filteredCards = categories
    .filter(card => !categoryFilter || card.title === categoryFilter)
    .map(card => ({
      ...card,
      items: card.items.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(card => card.items.length > 0); // hide empty categories

  // Overall Subtotal = sum of all product subtotals (price × quantity).
  const overallSubtotal = categories.reduce((total, category) => {
    return (
      total +
      category.items.reduce((catTotal, product) => {
        const qty = quantities[product.id] || 0;
        return catTotal + product.price * qty;
      }, 0)
    );
  }, 0);

  // Overall Total = sum of all product prices (ignoring quantity).
  // This is just price + price + price for every product.
  const overallTotal = categories.reduce((total, category) => {
    return total + category.items.reduce((catSum, product) => catSum + product.price, 0);
  }, 0);

  return (
    <Router>
      <div className="app-container">
        {/* Header with title and Add Product button */}
        <div className="app-header">
          <h1 className="app-title">Computer Parts Inventory</h1>
          <Link to="/add-product" className="add-button">＋ Add Product</Link>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Filter and search bar */}
                <div className="filter-bar">
                  <select
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Categories</option>
                    {categories.map(card => (
                      <option key={card.title} value={card.title}>
                        {card.title}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Search by product name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                {/* Show product cards for each category */}
                <div className="cards-wrapper">
                  {filteredCards.map(card => (
                    <Card
                      key={card.title}
                      title={card.title}
                      products={card.items}
                      quantities={quantities}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>

                {/* Show overall subtotal and overall total in separate cards */}
                <div className="totals-wrapper">
                  <div className="subtotal-card">
                    <h2>Overall Subtotal</h2>
                    <p>₱{overallSubtotal.toFixed(2)}</p>
                  </div>

                  <div className="total-card">
                    <h2>Overall Total (all product prices)</h2>
                    <p>₱{overallTotal.toFixed(2)}</p>
                  </div>
                </div>
              </>
            }
          />

          {/* Product details page */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Add product page */}
          <Route path="/add-product" element={<NewProducts onAddProduct={handleAddProduct} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;