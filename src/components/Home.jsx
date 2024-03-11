import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProductsPage from "./ProductsPage";
import Product from "./Product";

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
          className="headline"
          onClick={() => {
            navigate(`/`);
          }}
        >
          Web Shop
        </h1>
        <nav>
          <input
            className="navbar-search-input"
            type="text"
            placeholder="Pretraži proizvod"
            value={searchValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="navbar-search-button"
            onClick={handleSearchButtonClick}
          >
            Pretraži
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
