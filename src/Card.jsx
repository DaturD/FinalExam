import { useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";

function Card({ title, products, quantities, onQuantityChange }) {
  // Compute subtotal for this category.
  // We add up (price × quantity) for every product in this category.
  const categorySubtotal = products.reduce((sum, p) => {
    const qty = quantities[p.id] || 0; // if no quantity yet, treat as 0
    return sum + p.price * qty;
  }, 0);

  return (
    <div className="card-container">
      <h2>{title}</h2>

      <div className="card-grid">
        {products.map((p) => {
          const qty = quantities[p.id] || 0; // current quantity for this product

          return (
            <div key={p.id} className="product-card">
              <div className="image-wrapper">
                <img src={p.image} alt={p.name} />
                {/* Add to cart button only works if quantity > 0 */}
                <button
                  className="add-to-cart-icon"
                  disabled={qty === 0}
                  onClick={() => alert(`${p.name} added to cart!`)}
                >
                  🛒
                </button>
              </div>

              {/* Show product details */}
              <h3>{p.name}</h3>
              <p>Price: ₱{p.price}</p>
              <p>Quantity: {qty}</p>

              {/* Buttons to change quantity.
                  - button decreases quantity but never below 0
                  + button increases quantity */}
              <div className="quantity-controls">
                <button
                  onClick={() => onQuantityChange(p.id, -1)}
                  disabled={qty === 0}
                >
                  −
                </button>
                <button onClick={() => onQuantityChange(p.id, 1)}>+</button>
              </div>

              {/* Link to product details page */}
              <Link to={`/product/${p.id}`} className="view-details">
                View Details
              </Link>
            </div>
          );
        })}
      </div>

      {/* Show subtotal for this category at the bottom */}
      <div className="category-subtotal">
        <h3>{title} Subtotal: ₱{categorySubtotal.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Card;