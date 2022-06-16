import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AddCartContext from "../CartContext/AddCartContext";
import RemoveCartContext from "../CartContext/RemoveCartContext";
import "./Product.css";

const Product = ({ product }) => {
  const { addToCart } = useContext(AddCartContext);
  const { removeOfCart } = useContext(RemoveCartContext);

  return (
    <div className="product-card">
      <Card
        sx={{
          margin: 10,
          maxWidth: 345,
          minWidth: 150,
        }}
      >
        <Link to={`/products/${product.id}`}>
          <CardMedia
            sx={{
              margin: 10,
              maxWidth: "50%",
              maxHeight: 400,
            }}
            className="product-image"
            component="img"
            min-height="140"
            image={product.image}
            alt="product"
          />
        </Link>
        <CardContent>
          <Typography
            className="products-info"
            gutterBottom
            variant="h7"
            component="div"
          >
            {product.title}
          </Typography>

          <Typography
            className="products-info"
            gutterBottom
            variant="h6"
            component="div"
          >
            {product.price} $
          </Typography>
        </CardContent>
        <CardActions className="btnDiv">
          <Button
            className="addToCart"
            size="small"
            onClick={() => addToCart(product.id)}
          >
            +
          </Button>
          <div className="quantity">
            <div className="quantityNumber">{product.quantity}</div>
          </div>
          <Button
            className="addToCart"
            size="small"
            onClick={() => removeOfCart(product.id)}
          >
            -
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Product;
