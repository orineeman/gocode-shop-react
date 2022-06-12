import { useContext } from 'react';
import AddCartContext from '../CartContext/AddCartContext';
import RemoveCartContext from '../CartContext/RemoveCartContext';
import './Product.css'

const Product = ({product}) => {
  const {addToCart} = useContext(AddCartContext);
  const {removeOfCart} = useContext(RemoveCartContext);
    return (
      <div className="product-card">
        <div className="product-image">
        <img src={product.image}  alt= "product"/>
      </div> <div className="product-info">
        <h5>{product.title}</h5>
        <h6>{product.price}</h6>
        {/* <h6>{product.id}</h6> */}
      </div><div className='btnDiv'>
      <button className="addToCart" onClick={()=> addToCart(product.id)}>+</button>
      <div></div>
      <button className="addToCart" onClick={()=> removeOfCart(product.id)}>-</button>
      </div></div> );};
 
export default Product;