
import ProductCart from "../ProductCart/ProductCart";
import "./Cart.css";

function Cart(arrProductsCart) {
    console.log(arrProductsCart.addToTheCart)
    return(
        <div className="cart">
            <p>your cart</p>
        {
        arrProductsCart.addToTheCart.map((product,index) => (
        <ProductCart key={arrProductsCart[index]} product={product} />
        // <p key={product.id}>{product.title}</p>  
    ))}
    </div> )
}

export default Cart;