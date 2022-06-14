import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({});
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((product) => setProductDetails(product));
  }, []);

  return (
    <div className="product-details">
      <h1>Product details</h1>
      <h5  className="h5-title">{productDetails.title}</h5>
      <div className="product">
        {" "}
        <div className="product-image">
          <img className="image" src={productDetails.image} alt="product" />
        </div>{" "}
        <div className="product-info">
          <div className="description">
            <h6>description: <br/><br/>{productDetails.description}</h6>
          </div>
          <br/>
          <br />
          <div>
            <h6>your price:<br/><br/> {productDetails.price}</h6>
          </div>
        </div>
      </div>
      <div className="btnDiv">
        {/* <button className="addToCart" onClick={()=> addToCart(productDetails.id)}>+</button>
            <div className='quantity'><div className='quantityNumber'>0</div></div>
            <button className="addToCart" onClick={()=> removeOfCart(productDetails.id)}>-</button> */}
        <Link to={`/`}>
          <button className="back">home page</button>
        </Link>
      </div>
    </div>
  );
}
