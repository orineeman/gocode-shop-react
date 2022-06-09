import Product from "../product/Product";
import "./Products.css";

const Products = ({ productsArr , hiddens}) => {
  return (
    <section className="products">
      
       { 
      // hiddens && 
      productsArr.length > 0 ?
      productsArr.map((product) => (
        <Product key={product.id} product={product} />
      ))
      : <span className="loader"></span>
      } 
    </section>
  );
};

export default Products;
