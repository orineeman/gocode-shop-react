import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import ProductDetails from "./views/ProductDetails";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </div>
  );
};

export default App;
