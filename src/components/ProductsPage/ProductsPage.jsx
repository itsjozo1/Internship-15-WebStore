import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../../searchProducts";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./index.module.css";

function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  let search = searchParams.get("search");
  const [filterSearch, setFilterSearch] = useState(search);
  if (search !== filterSearch) setFilterSearch(search);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getCategories();
        let fetchedProducts = await getProducts(selectedCategory);

        if (filterSearch) {
          fetchedProducts = fetchedProducts.filter((product) =>
            product.title.toLowerCase().includes(filterSearch.toLowerCase())
          );
        }
        if (name) {
          fetchedProducts = fetchedProducts.filter((product) =>
            product.title.toLowerCase().includes(name.toLowerCase())
          );
        }

        setCategories(fetchedCategories);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedCategory, name, filterSearch]);

  const createProductPreviewCard = (product) => {
    return (
      <div
        key={product.id}
        className={classes.productPreviewCard}
        onClick={() => {
          navigate(`/products/${product.id}`, { state: { product } });
        }}
      >
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </div>
    );
  };

  const handleClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      return;
    }
    setSelectedCategory(category);
  };

  return (
    <div className={classes.productsContainer}>
      <div className={classes.filterProductsContainer}>
        <h1>Filter products</h1>
        <h2>Product title</h2>
        <input
          type="text"
          placeholder="Product title..."
          className="filter-products-name-input"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <h2>Categories</h2>
        <div className={classes.categoriesButtonContainer}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleClick(category)}
              className={
                selectedCategory === category
                  ? classes.categoryButtonSelected
                  : classes.categoryButton
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className={classes.filterProductsResultsContainer}>
        {products.length > 0 ? (
          products.map(createProductPreviewCard)
        ) : (
          <h2 className={classes.noResultsContainer}>
            Nema rezultata pretrage
          </h2>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
