import "./App.css";
import Header from "./components/header/Header";
import Products from "./components/products/Products";
import { useEffect, useState } from "react";
import Hide from "./components/hide/Hide";

const App = () => {
  let categories = [];
  const [hiddens, setHidden] = useState(true);
  
  function hideProducts(){
    setHidden(!hiddens);
  }
  
  const [productsArr, setProductsArr] = useState([]);
  const [productsFilterArr, setProductsFilterArr] = useState([]);
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((productsArr) => 
    setProductsArr(productsArr));
    setProductsFilterArr(productsArr);

  }, []); 
  
   categories = productsArr.map(p => p.category).filter((value, index, array) => array.indexOf(value)===index);

  function filtersArray(selectCategory) {
    if (selectCategory === "all prodacts") {
      setProductsFilterArr(productsArr);
    } else {
      setProductsFilterArr(
        productsArr.filter((product) => product.category === selectCategory)
      );
    }
  }
  return (
    <div>
      <Hide hideProducts={hideProducts} hiddens = {hiddens}/>
      <Header categories={categories} filtersArray={filtersArray} />
      <Products productsArr={productsFilterArr} hiddens = {hiddens}/>
    </div>
  );
};

export default App;
