import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Classification from "../pages/Classification";
import Category from "../pages/Category";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
 


const AppRoutes = () => {
  return (
    <Routes>
  
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Classification  />} />
          <Route path="/:id/:id" element={<Category  />} />
          <Route path="/items/:id" element={ <Product  /> } />
          <Route path="/cart" element={ <Cart  /> } />
          <Route path="/favorites" element={ <Favorites  /> } />
          <Route path="/login" element={ <Login  /> } />

 
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
};

export default AppRoutes;
