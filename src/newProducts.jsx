import { useState } from "react";
import { Link } from "react-router-dom";

function NewProducts({ onAddProduct }) {
  //  State for form fields
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    category: "",
    description: "",
    specification: "",
    rating: "",
    price: "",
    quantity: ""
  });

  //  State for error messages
  const [error, setError] = useState("");

  //  Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  //  Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: ensure all fields are filled
    for (let key in formData) {
      if (!formData[key]) {
        setError("Please fill in all fields before submitting.");
        return;
      }
    }

    // Clear error and add product
    setError("");
    onAddProduct({
      id: Date.now(), // unique ID
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      rating: Number(formData.rating)
    });

    // Reset form after submission
    setFormData({
      image: "",
      name: "",
      category: "",
      description: "",
      specification: "",
      rating: "",
      price: "",
      quantity: ""
    });
  };

  return (
    <div className="new-product-container">
      {/* Back link to inventory */}
      <Link to="/" className="back-link">
        ← Back to Inventory
      </Link>

      <h2>Add New Product</h2>
      {error && <p className="error-text">{error}</p>}

      {/* Product form */}
      <form onSubmit={handleSubmit} className="new-product-form">
        <input name="image" placeholder="Feature Image URL" value={formData.image} onChange={handleChange} />
        <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <textarea name="specification" placeholder="Specification" value={formData.specification} onChange={handleChange} />
        <input name="rating" type="number" placeholder="Rating" value={formData.rating} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} />
        <input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />

        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default NewProducts;