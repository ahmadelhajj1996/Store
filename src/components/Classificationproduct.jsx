import { Link } from "react-router-dom";

export const classification_product = (props) => {

  const product = props.product || props;

  return (
    <Link to={`/items/1`} className=" flex flex-col gap-y-2 mb-1 ">
      <div className=" relative">
        
      </div>
      <img
        className="w-full h-[310px] rounded-lg object-cover"
        src={'https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg'}
        alt={product.name}
      />

      <div className="flex justify-between items-center mx-2">
        <h2 className="text-sm">{product.name}</h2>
        <h2 className="text-sm underline underline-offset-4">
          {product.price} ل.س
        </h2>
        
      </div>
      <p className="text-start mx-2 text-xs text-green-900">
           {product.description}
      </p>
      <p className="text-start mx-2 text-xs text-green-900">
        متوفر في المخزن ({product.stock})
      </p>
    </Link>
  );
};

//  classification_product;

export const ViewAllCard = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-y-2 cursor-pointer group"
    >
      <div className="w-full h-[310px] rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
        <span className="text-lg font-medium text-gray-600">عرض الكل</span>
      </div>

      <div className="flex justify-between items-center mx-2">
        <h2 className="text-sm opacity-0">Placeholder</h2>
        <h2 className="text-sm opacity-0">Placeholder</h2>
      </div>
      <p className="opacity-0">Placeholder</p>
    </div>
  );
};
