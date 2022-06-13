import { useEffect, useState } from "react";
import Cart from "../components/Cart/Cart";
import AddCartContext from "../components/CartContext/AddCartContext";
import RemoveCartContext from "../components/CartContext/RemoveCartContext";
import Header from "../components/header/Header";
import Hide from "../components/hide/Hide";
import Products from "../components/products/Products";

let arrProductsCart = [];
export default function Home(){
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartIsFull, setCartIsFull] = useState(false);
  const [addToTheCart, setAddToTheCart] = useState([]);
  const [productsFilterArr, setProductsFilterArr] = useState([]);
  const [productsArr, setProductsArr] = useState([]);
  let categories = [];
  
  const [hiddens, setHidden] = useState(true);
  function hideProducts() {
    setHidden(!hiddens);
  }
    const fetchProducts = () => {
        setIsLoading(true);
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((products) => {
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
        const [filterToCart] = productsArr.filter(
          (product) => product.id === productId
        );
        // bonos---------------1
        // let quantity = 1;
        // const [product] = arrProductsCart.filter(
        //   (prod) => prod.id === filterToCart.id
        // );
        // console.log(product);
        // if (product !== undefined) quantity = product.quantity + 1;
        // arrProductsCart.push({ ...filterToCart, quantity: quantity });
        
        arrProductsCart.push({ ...filterToCart });
        setCartIsFull(true);
        setAddToTheCart([...arrProductsCart]);
      }
    
      function removeOfCart(productId) {
        arrProductsCart = arrProductsCart.filter(
          (product) => product.id !== productId
        );
        if (arrProductsCart.length === false) {setCartIsFull(false)};
        setAddToTheCart([...arrProductsCart]);
      }
return(
<div>
      {error ? (
        <div className="err">Server not found<br></br>try again</div>
      ) : isLoading ? (
        <span className="loader"></span>
      ) : (
        <>
          <Hide hidePr0oducts={hideProducts} hiddens={hiddens} />
          {cartIsFull && <Cart addToTheCart={addToTheCart} />}
          <Header
            categories={categories}
            filtersArray={filtersArray}
            fetchProducts={fetchProducts}
          />
          {hiddens && (
            <AddCartContext.Provider value={{ addToCart: addToCart }}>
              <RemoveCartContext.Provider
                value={{ removeOfCart: removeOfCart }}
              >
                <Products productsArr={productsFilterArr} hiddens={hiddens} />
              </RemoveCartContext.Provider>
            </AddCartContext.Provider>
          )}
        </>
      )}
    </div>
)}