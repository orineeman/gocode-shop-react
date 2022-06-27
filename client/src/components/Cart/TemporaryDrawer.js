import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ProductCart from "../ProductCart/ProductCart";

export default function TemporaryDrawer({
  toggleDrawer,
  state,
  anchor,
  setNoHidden,
  addToTheCartArr,
}) {
  let total = 0;
  addToTheCartArr.forEach((p) => {
    total += p.price * p.quantity;
  });

  const list = (anchor) => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    ></Box>
  );
  return (
    <div>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
        <div>
          <div className="div-cart">
            <p>Your cart</p>
          </div>
          <div className="div-cart-product">
            {addToTheCartArr.map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
          </div>
          <div className="price">Total cost: {total} $</div>
        </div>
      </Drawer>
    </div>
  );
}
