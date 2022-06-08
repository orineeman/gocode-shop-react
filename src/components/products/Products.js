import Product from "../product/Product";
import "./Products.css";

const Products = ({ productsArr , hiddens}) => {
  return (
    <section className="products">
      {hiddens &&  
      productsArr.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  );
};

export default Products;
