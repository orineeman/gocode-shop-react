import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AddCartContext from "../CartContext/AddCartContext";
import RemoveCartContext from "../CartContext/RemoveCartContext";
import "./Product.css";
import Rating from "@mui/material/Rating";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Product = ({ product }) => {
  const { addToCart } = useContext(AddCartContext);
  const { removeOfCart } = useContext(RemoveCartContext);
  const [value, setValue] = useState(2);

  return (
    <div className="product-card">
      {/* <div className="product-image"> */}
      {/* <Link to={`/products/${product.id}`}> */}
        {/* <img src={product.image}  alt= ""/> */}
      {/* </Link> */}
      {/* </div> <div className="product-info"> */}
      {/* <h5>{product.title}</h5> */}
      {/* <h6>{product.price}</h6> */}
      {/* </div><div className='btnDiv'> */}
      {/* <button className="addToCart" onClick={()=> addToCart(product.id)}>+</button> */}
      {/* <div className="quantity"> */}
        {/* <div className="quantityNumber">{product.quantity}</div> */}
      {/* </div> */}
      {/* <button className="addToCart" onClick={()=> removeOfCart(product.id)}>-</button> */}
      {/* </div> */}

      <Rating
        name="simple-controlled"
        className="rating"
        value={value}
        size="large"
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />

      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/products/${product.id}`}>
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt="product"
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            {product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => addToCart(product.id)}>
            +
          </Button>
          <div className="quantityNumber">{product.quantity}</div>
          <Button size="small" onClick={() => removeOfCart(product.id)}>
            -
          </Button>
        </CardActions>
      </Card>
      {/*  */}
    </div>
  );
};

export default Product;
