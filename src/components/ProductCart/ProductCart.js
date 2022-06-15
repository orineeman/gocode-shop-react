import { useContext } from "react";
import AddCartContext from "../CartContext/AddCartContext";
import RemoveCartContext from "../CartContext/RemoveCartContext";
import "./ProductCart.css";

function ProductCart({ product }) {
  const { addToCart } = useContext(AddCartContext);
  const { removeOfCart } = useContext(RemoveCartContext);
  return (
    <div className="product-c">
      <img className="image" src={product.image} alt="product" />
      <div className="product-carts">
        <div className="info">
          <h5>{product.title}</h5>{" "}
        </div>
        <div>
          <h6>{product.price} $</h6>
        </div>
        <div className="btn-div">
          <button onClick={() => addToCart(product.id)}>+</button>
          <div className="quantity">{product.quantity}</div>
          <button onClick={() => removeOfCart(product.id)}>-</button>
        </div>
      </div>
    </div>
  );
}
export default ProductCart;
