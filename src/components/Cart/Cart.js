import ProductCart from "../ProductCart/ProductCart";
import "./Cart.css";

function Cart({addToTheCartArr}) {
    let total = 0;
    addToTheCartArr.forEach(p => {
        
        total += p.price * p.quantity;
    });
  return (
    <div className="cart">
      <div className="div-cart">
        <p>your cart</p>
        <button
          className="close-cart"
        >
          <h3>close cart</h3>
        </button>
      </div>
      {addToTheCartArr.map((product) => (
        <ProductCart key={product.id} product={product} />
      ))}
    
      <div className="price">Total cost: {total}</div>
    </div>
  );
}

export default Cart;
