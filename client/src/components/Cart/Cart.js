import ProductCart from "../ProductCart/ProductCart";
import "./Cart.css";

function Cart({ addToTheCartArr, setNoHidden }) {
  let total = 0;
  addToTheCartArr.forEach((p) => {
    total += p.price * p.quantity;
  });
  return (
    <div className="cart">
      <div className="div-cart">
        <p>Your cart</p>
        <button className="close-cart" onClick={() => setNoHidden(false)}>
          <h3>Hide cart</h3>
        </button>
      </div>
      <div className="div-cart-product">
        {addToTheCartArr.map((product) => (
          <ProductCart key={product._id} product={product} />
        ))}
      </div>
      <div className="price">Total cost: {total} $</div>
    </div>
  );
}

export default Cart;
