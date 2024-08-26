import "./styles/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateProduct from "./page/product/UpdateProduct";
import { AddProduct, Products } from "./page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/update/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
