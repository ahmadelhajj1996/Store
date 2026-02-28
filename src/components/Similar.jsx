import Section from "./Section";
import { classification_product as Product } from "./Classificationproduct";

function Similar({ title, products }) {
  return (
    <>
      <Section title={title}>
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-8 justify-center text-center items-center">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default Similar;
