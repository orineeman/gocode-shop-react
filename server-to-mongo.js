import express from "express";
import mongoose from "mongoose";
// import fs from "fs/promises";
import dotenv from "dotenv";

app.use(express.static("client/build"));
app.use(express.json());
dotenv.config();
const app = express();

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
// app.get("/products", (req, res) => {
//   fs.readFile("./products.json", "utf8").then((data) => {
//     const products = JSON.parse(data);

//     products.map((item) => {
//       const { title, price, description, category, image } = item;
//       Product.insertMany([
//         {
//           title,
//           price,
//           description,
//           category,
//           image,
//         },
//       ]).then(res.send("Good"));
//     });
//   });
// });

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

// שאר הכתובות שיכתבו יגיעו לכאן, והקליינט יפנה לכתובות שלמעלה
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
