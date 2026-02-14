import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Classification from "../pages/Classification";
import Category from "../pages/Category";
 


const AppRoutes = () => {
  return (
    <Routes>
  
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Classification  />} />
          <Route path="/:id/:id" element={<Category  />} />
  
 
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
};

export default AppRoutes;
