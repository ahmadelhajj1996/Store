import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Category from "../pages/Category";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Search from "../pages/Search";

import Test from "../pages/Test";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Category />} />
      <Route path="/items/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/test" element={<Test />} />

      {/* add checkout authenticated page  */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
