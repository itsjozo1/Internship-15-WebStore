import { useEffect, useState } from "react";
import { getProducts, getCategories } from "./searchProducts";
import { useLocation } from "react-router-dom";

function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let search = searchParams.get("search");
  console.log(search);
  const [filterSearch, setFilterSearch] = useState(search);
  if (search !== filterSearch) setFilterSearch(search);
  console.log(filterSearch);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getCategories();
        let fetchedProducts = await getProducts(selectedCategory);

        if (name) {
          fetchedProducts = fetchedProducts.filter((product) =>
            product.title.toLowerCase().includes(name.toLowerCase())
          );
        } else {
          fetchedProducts = fetchedProducts.filter((product) =>
            product.title.toLowerCase().includes(filterSearch.toLowerCase())
          );
        }

        setCategories(fetchedCategories);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Greška u dohvaćanju proizvoda:", error);
      }
    };

    fetchData();
  }, [selectedCategory, name, filterSearch]);

  const createProductPreviewCard = (product) => {
    return (
      <div key={product.id} className="product-preview-card">
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
    <div className="products-container">
      <div className="filter-products-container">
        <h1>Pretraži proizvode</h1>
        <h2>Naziv proizvoda</h2>
        <input
          type="text"
          placeholder="Ime proizvoda"
          className="filter-products-name-input"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <h2>Kategorije</h2>
        <div className="categories-buttons-container">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleClick(category)}
              className={
                selectedCategory === category
                  ? "category-button-selected"
                  : "category-button"
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-products-results-container">
        {products.length > 0 ? (
          products.map(createProductPreviewCard)
        ) : (
          <h2 className="no-results-container">Nema rezultata pretrage</h2>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
