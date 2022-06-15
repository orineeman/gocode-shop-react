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
  const [addToTheCartArr, setAddToTheCartArr] = useState(arrProductsCart);
  const [productsFilterArr, setProductsFilterArr] = useState([]);
  const [productsArr, setProductsArr] = useState([]);
  const [sumCartProducts, setSumCartProducts] = useState(0);
  let categories = [];

  const [noHidden, setNoHidden] = useState(false);
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
    const indexInArrCart = addToTheCartArr.findIndex((p) => p.id === productId);
    if (indexInArrCart === -1) {
      findToCart.quantity++;
      addToTheCartArr.push(findToCart);
      setAddToTheCartArr([...addToTheCartArr]);
    } else {
      addToTheCartArr[indexInArrCart].quantity++;
      setAddToTheCartArr([...addToTheCartArr]);
    }
    sumOfProductsCart();
  }

  function removeOfCart(productId) {
    const indexInArrCartToRemove = addToTheCartArr.findIndex(
      (p) => p.id === productId
    );
    if (indexInArrCartToRemove === -1) {
      console.log("not on cart");
    } else if (addToTheCartArr[indexInArrCartToRemove].quantity > 1) {
      addToTheCartArr[indexInArrCartToRemove].quantity--;
      setAddToTheCartArr([...addToTheCartArr]);
    } else {
      arrProductsCart = addToTheCartArr.filter(
        (product) => product.id !== productId
      );
      addToTheCartArr[indexInArrCartToRemove].quantity--;
      setAddToTheCartArr([...arrProductsCart]);
      if (addToTheCartArr.length === 0) {
      }
    }
    sumOfProductsCart();
  }
  function sumOfProductsCart() {
    let sumOfProducts = 0;
    addToTheCartArr.forEach((p) => (sumOfProducts += p.quantity));
    setSumCartProducts(sumOfProducts);
  }
  function filterByPrice(value) {
    setProductsFilterArr(
      productsArr.filter(
        (product) => product.price >= value[0] && product.price <= value[1]
      )
    );
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
              {noHidden && (
                <Cart
                  addToTheCartArr={addToTheCartArr}
                  setNoHidden={setNoHidden}
                />
              )}
              <Header
                setNoHidden={setNoHidden}
                sumCartProducts={sumCartProducts}
                categories={categories}
                filtersArray={filtersArray}
                filterByPrice={filterByPrice}
                productsArr={productsArr}
              />

              <Products productsArr={productsFilterArr} />
            </RemoveCartContext.Provider>
          </AddCartContext.Provider>
        </>
      )}
    </div>
  );
}
