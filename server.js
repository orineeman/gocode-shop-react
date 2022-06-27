import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(express.static("client/build"));
app.use(express.json());
dotenv.config();

const Product = mongoose.model("Product", {
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

app.get("/api/products", (req, res) => {
  const { title } = req.query;
  Product.find().then((products) => {
    if (title) {
      const productsFilter = products.filter((product) =>
        product.title.toLowerCase().includes(title.toLowerCase())
      );
      res.send(productsFilter);
    } else {
      res.send(products);
    }
  });
});

app.post("/api/products", (req, res) => {
  const { title } = req.body;
  Product.insertMany([
    {
      title,
      price: 30,
    },
  ]).then((products) => res.send(products));
});

app.patch("/api/products/:productId", (req, res) => {
  const { title } = req.body;
  const { productId } = req.params;
  Product.findByIdAndUpdate(productId, {
    title,
  })
    .then((product) => res.send(product))
    .catch((e) => res.send("ERROR!"));
});

app.delete("/api/products/:productId", (req, res) => {
  const { productId } = req.params;
  Product.findByIdAndRemove(productId)
    .then((product) => res.send(product))
    .catch((e) => res.send("ERROR!"));
});

app.get("*", (req, res) => {
  res.sendFile("/client/build/index.html");
});

const PORT = process.env.PORT || 8000;

// mongoose.connect("mongodb://localhost:27017/go-code-shop").then(() => {
const { DB_PASS, DB_USER, DB_HOST, DB_NAME } = process.env;
mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`)
  .then(() => {
    app.listen(PORT);
  });
