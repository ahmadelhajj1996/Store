import Breadcrumbs from "../components/Breadcrumbs";
import Section from "../components/Section";
import {
  sortOptions,
  classificationsEquivalent,
  categoriesEquivalent,
} from "../utils/constants";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Sort from "../components/Sort";
import {
  classification_product as Product,
} from "../components/Classificationproduct";

function Category() {
  const location = useLocation();
  const navigate = useNavigate();

  const firstSlash = location.pathname.indexOf("/");
  const secondSlash = location.pathname.lastIndexOf("/");
  const first = location.pathname.substring(firstSlash, secondSlash);
  const second = location.pathname.substring(secondSlash + 1);

  const products = Array(40)
    .fill(null)
    .map((_, index) => ({
      id: index,
      name: `منتج ${index + 1}`,
      description : `وصف  المنتج  ${index + 1} ........... ` ,
      price: "300",
      stock: 10,
    }));

  return (
    <>
      <Section
        title={categoriesEquivalent[`/${second}`] + " ( 200 )"}
        className=" -mt-6"
      >
        {/* use Infinite Query */}
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-8 justify-center text-center items-center">
            {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default Category;

{
  /* <Breadcrumbs
        items={[
          { label: "الرئيسية", route: "/" },
          { label: classificationsEquivalent[first], route: first },
          {
            label:
              categoriesEquivalent[location.pathname.substring(secondSlash)],
          },
        ]}
      /> */
}
