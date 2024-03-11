import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "./searchProducts.js";

const Product = () => {
  const { state } = useLocation();
  const product = state.product;
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        let fetchedProducts = await getProducts(product.category, 4);
        const filteredProducts = fetchedProducts.filter(
          (p) => p.id !== state.product.id
        );
        setRecommendedProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };

    fetchRecommendedProducts();
  }, [product.category, state.product.id]);

  return (
    <div className="product-page">
      <div className="product-page-preview">
        <img src={product.image} alt={product.title} />
        <div className="product-page-desc">
          <h1>{product.title}</h1>
          <h3>{product.category + " " + product.rating.rate}</h3>
          <p>Price: {product.price} €</p>
          <p>{product.description}</p>
        </div>
      </div>
      <div className="recommended-products-container">
        <h2>Recommended products</h2>
        {recommendedProducts.map((product) => (
          <div key={product.id} className="recommended-product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
