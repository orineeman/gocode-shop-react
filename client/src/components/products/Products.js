import Product from "../product/Product";
import "./Products.css";

const Products = ({ productsArr }) => {
  return (
    <section className="products">
      {productsArr.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </section>
  );
};

export default Products;
