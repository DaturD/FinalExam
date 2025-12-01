import { useState } from "react";
import { Link } from "react-router-dom";
import "./card.css"; // import the new CSS

function Card({ title, products }) {
  const [quantities, setQuantities] = useState({});

  const handleChange = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) + delta, 0)
    }));
  };

  return (
    <div className="card-container">
      <h2>{title}</h2>

      <div className="card-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            {/* this part shows the product image with the cart icon on top */}
            <div className="image-wrapper">
              <img src={p.image} alt={p.name} />
              <button
                className="add-to-cart-icon"
                disabled={(quantities[p.id] || 0) === 0}
                onClick={() => alert(`${p.name} added to cart!`)}
              >
                🛒
              </button>
            </div>

            <h3>{p.name}</h3>
            <p>Price: ₱{p.price}</p>
            <p>Quantity: {quantities[p.id] || 0}</p>

            <div className="quantity-controls">
              <button
                onClick={() => handleChange(p.id, -1)}
                disabled={(quantities[p.id] || 0) === 0}
              >
                −
              </button>
              <button onClick={() => handleChange(p.id, 1)}>+</button>
            </div>

            {/* link to the product details page */}
            <Link to={`/product/${p.id}`} className="view-details">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;