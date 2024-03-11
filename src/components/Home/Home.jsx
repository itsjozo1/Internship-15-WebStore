import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProductsPage from "../ProductsPage/ProductsPage";
import Product from "../Product/Product";
import classes from "./index.module.css";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchButtonClick = (event) => {
    event.preventDefault();
    if (searchValue) {
      navigate(`/?search=${searchValue}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchButtonClick(event);
    }
  };

  return (
    <>
      <header>
        <h1
          className={classes.headline}
          onClick={() => {
            navigate(`/`);
          }}
        >
          Web Shop
        </h1>
        <nav>
          <input
            className={classes.navbarSearchInput}
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className={classes.navbarSearchButton}
            onClick={handleSearchButtonClick}
          >
            Search
          </button>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  );
};

export default Home;
