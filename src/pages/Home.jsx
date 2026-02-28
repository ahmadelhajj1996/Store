import { useProductSwiper } from "../hooks/useProductSwiper";

import Slider from "../components/Slider";
import Section from "../components/Section";
import Reserve from "../components/Reserve";
import Map from "../components/Map";
import {
  classification_product as Product,
  ViewAllCard,
} from "../components/Classificationproduct";
{
  /* offers , Sliders , Send Message  */
}

function Home() {

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
      <Slider />

      <Section title="اخر العروض">
        {renderSwiper(Product, ViewAllCard)}
      </Section>

       <Map />
      <Reserve />
    </>
  );
}

export default Home;
