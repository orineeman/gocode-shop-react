import "./Header.css";
import Slider from "@mui/material/Slider";
import { useState } from "react";

function valuetext(value) {
  return `${value}°C`;
}

const Header = ({
  anchor,
  toggleDrawer,
  productsArr,
  categories,
  filterByPrice,
  filtersArray,
  sumCartProducts,
  setNoHidden,
}) => {
  productsArr.sort((a, b) => a.price - b.price);
  let lowPrice = productsArr[0].price;
  let highPrice = productsArr[productsArr.length - 1].price;
  const [value, setValue] = useState([lowPrice, highPrice]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    filterByPrice(newValue);
  };

  return (
    <nav className="product-filter">
      <div className="logocart">
        <h1>Gocode-shop</h1>
        <div className="cart-icon-flex" onClick={toggleDrawer(anchor, true)}>
          <img
            className="cart-icon"
            src="https://img.icons8.com/material-rounded/344/shopping-cart-loaded.png"
            alt="cart"
          />
          <div className="quant">{sumCartProducts}</div>
        </div>
      </div>
      <div className="slider">
        <label>Filter by price:</label>
        <Slider
          getAriaLabel={() => "Sort by price"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          max={highPrice}
          min={lowPrice}
        />
      </div>
      <div>
        <div className="sort">
          <div className="collection-sort">
            <label>Filter by:</label>
            <select
              onChange={(e) => {
                let selectValue = e.target.value;
                filtersArray(selectValue);
              }}
            >
              <option value="all prodacts">all prodacts</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="collection-sort">
            <label>Sort by:</label>
            <select>
              <option value="/">Featured</option>
              <option value="/">Best Selling</option>
              <option value="/">Alphabetically, A-Z</option>
              <option value="/">Alphabetically, Z-A</option>
              <option value="/">Price, low to high</option>
              <option value="/">Price, high to low</option>
              <option value="/">Date, new to old</option>
              <option value="/">Date, old to new</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
