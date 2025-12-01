import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Card from "./Card";
import ProductDetail from "./productsDetails";
import NewProducts from "./newProducts";
import "./app.css";
import { caseProducts, cpuProducts, ramProducts } from "./products";

function App() {
  // Initial categories with default products
  const [categories, setCategories] = useState([
    { title: "Case", items: caseProducts },
    { title: "CPU", items: cpuProducts },
    { title: "RAM", items: ramProducts }
  ]);

  // State for filtering and searching
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Handler for adding a new product
  // If category exists, append product; otherwise create a new category
  const handleAddProduct = (product) => {
    setCategories(prev => {
      const existing = prev.find(
        c => c.title.toLowerCase() === product.category.toLowerCase()
      );
      if (existing) {
        // Add product to existing category
        return prev.map(c =>
          c.title.toLowerCase() === product.category.toLowerCase()
            ? { ...c, items: [...c.items, product] }
            : c
        );
      } else {
        // Create new category with the product
        return [...prev, { title: product.category, items: [product] }];
      }
    });
  };

  // Apply category filter and search term
  const filteredCards = categories
    .filter(card => !categoryFilter || card.title === categoryFilter)
    .map(card => ({
      ...card,
      items: card.items.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(card => card.items.length > 0); // hide empty categories

  return (
    <Router>
      <div className="app-container">
        {/* Header with title and Add Product button (top-right) */}
        <div className="app-header">
          <h1 className="app-title">Computer Parts Inventory</h1>
          <Link to="/add-product" className="add-button">
            ＋ Add Product
          </Link>
        </div>

        <Routes>
          {/* Main inventory route */}
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

                {/* Display product cards */}
                <div className="cards-wrapper">
                  {filteredCards.map(card => (
                    <Card key={card.title} title={card.title} products={card.items} />
                  ))}
                </div>
              </>
            }
          />

          {/* Product details route */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Add Product route (form page) */}
          <Route
            path="/add-product"
            element={<NewProducts onAddProduct={handleAddProduct} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;