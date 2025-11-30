import { useParams, Link } from "react-router-dom";
import {
  caseProducts,
  cpuProducts,
  ramProducts
} from "./products";
import "./app.css";

const allProducts = [
  ...caseProducts,
  ...cpuProducts,
  ...ramProducts
];

function ProductDetail() {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/">← Back to Inventory</Link>
      <h2 style={{ marginTop: "12px" }}>{product.name}</h2>
      {/* show the product image and details */}
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", maxWidth: "400px", borderRadius: "8px", marginTop: "16px" }}
      />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description || "No description available."}</p>
    </div>
  );
}

export default ProductDetail;