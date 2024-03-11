import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProducts } from "../../searchProducts.js";
import classes from "./index.module.css";

const Product = () => {
  const { state } = useLocation();
  const product = state.product;
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        let fetchedProducts = await getProducts(product.category, 4);
        const filteredProducts = fetchedProducts.filter(
          (product) => product.id !== state.product.id
        );
        setRecommendedProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };

    fetchRecommendedProducts();
  }, [product.category, state.product.id]);

  const handleClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <div className={classes.productPage}>
      <div className={classes.productPagePreview}>
        <img src={product.image} alt={product.title} />
        <div className={classes.productPageDesc}>
          <h1>{product.title}</h1>
          <h3>{product.category + " " + product.rating.rate}</h3>
          <p>Price: {product.price} €</p>
          <p>{product.description}</p>
        </div>
      </div>
      <div className={classes.recommendedProductsContainer}>
        <h2>Recommended products</h2>
        {recommendedProducts.map((product) => (
          <div
            key={product.id}
            className={classes.recommendedProductCard}
            onClick={() => handleClick(product)}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
