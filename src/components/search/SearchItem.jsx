import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function SearchItem({ item, type, onClose }) {
  const href =
    type === "product"
      ? `/items/${item?.id}`
      : `/${item?.parent_id ? item?.parent_id : item.id}`;

  return (
    <Link
      to={href}
      onClick={() => onClose?.()}
      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-100 transition"
    >
      {type === "product" && (
        <img
          src={item?.image}
          alt={item?.name}
          className="w-12 h-12 rounded-lg object-cover bg-gray-100"
        />
      )}

      <div className="min-w-0 flex flex-col -mt-2">
        <p className="text-sm">{item?.name}</p>
        {type === "product" && (
          <p className="text-sm text-gray-500">{item?.category?.name}</p>
        )}
      </div>
    </Link>
  );
}

SearchItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

    name: PropTypes.string.isRequired,

    image: PropTypes.string,

    category: PropTypes.shape({
      name: PropTypes.string,
    }),
    parent_id: PropTypes.number,
  }).isRequired,

  type: PropTypes.oneOf(["product", "category", "subcategory"]).isRequired,
  onClose: PropTypes.func,
};

export default SearchItem;
