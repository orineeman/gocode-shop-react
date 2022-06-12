import "./ProductCart.css";

function ProductCart({product}) {
    // console.log(product);
    return(
  <div className="product-cart">
    <div className="product-image">
    </div>{" "}
    <div className="info">
      <h5>{product.title}</h5> </div>
      <div><h6>{product.price}</h6>
      </div><div className="btn-div">
      <button>+</button>
      <div className="quantity"></div>
      <button>-</button>
      </div>
  </div>
  )
}

export default ProductCart;
