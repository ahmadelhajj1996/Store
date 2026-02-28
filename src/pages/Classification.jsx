import ClassificationBar from "../components/ClassificationBar";
import Breadcrumbs from "../components/Breadcrumbs";
import Section from "../components/Section";
import {
  classification_product as Product,
  ViewAllCard,
} from "../components/Classificationproduct";
import { categories, classificationsEquivalent } from "../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import { useProductSwiper } from "../hooks/useProductSwiper";

function Classification() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");

  const handleNavigation = (to) => {
    setActiveLink(to);
  };

   const products = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: index,
    name: `منتج ${index + 1}`,
      description : `وصف  المنتج  ${index + 1} ........... ` ,
    price: "300",
    stock: 10,
  }));

  const handleViewAll = () => {
    console.log("View all clicked");
  };

  const { renderSwiper } = useProductSwiper(products, handleViewAll);

  return (
    <>
      <div className="inset-x-0 z-50 mt-4">
        <ClassificationBar
          classifications={categories}
          activeLink={activeLink}
          onNavigate={handleNavigation}
        />
      </div>

      <Section title="الأكثر رواجاً الآن">
        {renderSwiper(Product, ViewAllCard)}
      </Section>

      <Section title="تسوق حسب الموضة">
        {renderSwiper(Product, ViewAllCard)}
      </Section>

      <Section title=" المنتجات المميزة">
        {renderSwiper(Product, ViewAllCard)}
      </Section>
 
    </>
  );
}

export default Classification;
