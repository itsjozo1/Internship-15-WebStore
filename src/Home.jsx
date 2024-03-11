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

  const handleSearchButtonClick = () => {
    if (searchValue) {
      navigate(`/?search=${searchValue}`);
    }
  };

  return (
    <>
      <header>
        <h1 className="headline">Web trgovina</h1>
        <nav>
          <input
            className="navbar-search-input"
            type="text"
            placeholder="Pretraži proizvod"
            value={searchValue}
            onChange={handleChange}
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
        <Route path="/product" element={<Product />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  );
};

export default Home;
