import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";


const Home = lazy(() => import("../pages/Home"));
const Category = lazy(() => import("../pages/Category"));
const Product = lazy(() => import("../pages/Product"));
const Cart = lazy(() => import("../pages/Cart"));
const Favorites = lazy(() => import("../pages/Favorites"));
const Login = lazy(() => import("../pages/Login"));
const Search = lazy(() => import("../pages/Search"));
const Orders = lazy(() => import("../pages/Orders"));
const Order = lazy(() => import("../pages/Order"));



const AppRoutes = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Category />} />
        <Route path="/items/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/search" element={<Search />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;