import { useEffect, useState } from "react";
import Cart from "../components/Cart/Cart";
import AddCartContext from "../components/CartContext/AddCartContext";
import RemoveCartContext from "../components/CartContext/RemoveCartContext";
import Header from "../components/header/Header";
import Products from "../components/products/Products";

let arrProductsCart = [];
export default function Home() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartIsFull, setCartIsFull] = useState(false);
  const [addToTheCartArr, setAddToTheCartArr] = useState(arrProductsCart);
  const [productsFilterArr, setProductsFilterArr] = useState([]);
  const [productsArr, setProductsArr] = useState([]);
  let categories = [];

  const [hidden, setHidden] = useState(true);
  // function hideCart() {
    // setHidden(!hidden);
  // }
  const fetchProducts = () => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((products) => {
        products.forEach((p) => (p.quantity = 0));
        setProductsArr(products);
        setProductsFilterArr(products);
        setIsLoading(false);
      })
      .catch(() => setError(true));
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  categories = productsArr
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);

  function filtersArray(selectCategory) {
    if (selectCategory === "all prodacts") {
      setProductsFilterArr(productsArr);
    } else {
      setProductsFilterArr(
        productsArr.filter((product) => product.category === selectCategory)
      );
    }
  }
  function addToCart(productId) {
    const findToCart = productsArr.find((p) => p.id === productId);
    // console.log(findToCart);
    const indexInArrCart = addToTheCartArr.findIndex((p) => p.id === productId);
    if (indexInArrCart === -1) {
      findToCart.quantity++;
      setAddToTheCartArr([...addToTheCartArr, findToCart]);
    } else {
      addToTheCartArr[indexInArrCart].quantity++;
      setAddToTheCartArr([...addToTheCartArr]);
    }
    setCartIsFull(true);
  }

  function removeOfCart(productId) {
    const indexInArrCartToRemove = addToTheCartArr.findIndex((p) => p.id === productId);
    if (indexInArrCartToRemove === -1){
      console.log("not on cart");
    } else if (addToTheCartArr[indexInArrCartToRemove].quantity > 1 ){
      addToTheCartArr[indexInArrCartToRemove].quantity--;
      setAddToTheCartArr([...addToTheCartArr]);
    } else {
      arrProductsCart = addToTheCartArr.filter(
        (product) => product.id !== productId);
        console.log(arrProductsCart);
        addToTheCartArr[indexInArrCartToRemove].quantity--;
        setAddToTheCartArr([...arrProductsCart]);
      }
      if (addToTheCartArr.length === false) {
      setCartIsFull(false);
    }
  }
  return (
    <div>
      {error ? (
        <div className="err">
          Server not found<br></br>try again
        </div>
      ) : isLoading ? (
        <span className="loader"></span>
      ) : (
        <>
          {/* <Hide hideCart={hideCart} hidden={hidden} /> */}
          <AddCartContext.Provider value={{ addToCart: addToCart }}>
          <RemoveCartContext.Provider value={{ removeOfCart: removeOfCart }}>
          {cartIsFull && hidden && <Cart addToTheCartArr={addToTheCartArr} setAddToTheCartArr={setAddToTheCartArr} arrProductsCart={arrProductsCart}/>}
          <Header
            categories={categories}
            filtersArray={filtersArray}
            fetchProducts={fetchProducts}
          />

              <Products productsArr={productsFilterArr} hidden={hidden} />
            </RemoveCartContext.Provider>
          </AddCartContext.Provider>
        </>
      )}
    </div>
  );
}
