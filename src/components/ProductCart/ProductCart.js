import { useContext } from "react";
import AddCartContext from "../CartContext/AddCartContext";
import RemoveCartContext from "../CartContext/RemoveCartContext";
import "./ProductCart.css";

function ProductCart({product}) {
  const {addToCart} = useContext(AddCartContext);
  const {removeOfCart} = useContext(RemoveCartContext);  
  return(
  <div className="product-cart">
    <div className="product-image">
    </div>{" "}
    <div className="info">
    {/* <img className="image" src={product.image}  alt= "product"/> */}
      <h5>{product.title}</h5> </div>
      <div><h6>{product.price}</h6>
      </div><div className="btn-div">
      <button onClick={()=> addToCart(product.id)}>+</button>
      <div className="quantity">{product.quantity}</div>
      <button onClick={()=> removeOfCart(product.id)}>-</button>
      </div>
  </div>
  )
}
export default ProductCart;
