import { useEffect, useState } from "react";
import Cart from "../components/Cart/Cart";
import TemporaryDrawer from "../components/Cart/TemporaryDrawer";
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
    fetch("/api/products")
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
    const findToCart = productsArr.find((p) => p._id === productId);
    const indexInArrCart = addToTheCartArr.findIndex(
      (p) => p._id === productId
    );
    if (indexInArrCart === -1) {
      // filter
      // map
      // find
      // addToTheCartArr.map(product=> { if (product.id === productId ) return {
      //   ...product,
      //   quantity: product.quantity + 1
      // } else return product})
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
      (p) => p._id === productId
    );
    if (indexInArrCartToRemove === -1) {
      console.log("not on cart");
    } else if (addToTheCartArr[indexInArrCartToRemove].quantity > 1) {
      addToTheCartArr[indexInArrCartToRemove].quantity--;
      setAddToTheCartArr([...addToTheCartArr]);
    } else {
      arrProductsCart = addToTheCartArr.filter(
        (product) => product._id !== productId
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
  const [state, setState] = useState({ left: false });
  const anchor = "left";
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
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
          <AddCartContext.Provider value={{ addToCart: addToCart }}>
            <RemoveCartContext.Provider value={{ removeOfCart: removeOfCart }}>
              {noHidden && (
                <Cart
                  addToTheCartArr={addToTheCartArr}
                  setNoHidden={setNoHidden}
                />
              )}
              <TemporaryDrawer
                toggleDrawer={toggleDrawer}
                state={state}
                anchor={anchor}
                setNoHidden={setNoHidden}
                addToTheCartArr={addToTheCartArr}
              />

              <Header
                anchor={anchor}
                state={state}
                toggleDrawer={toggleDrawer}
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
