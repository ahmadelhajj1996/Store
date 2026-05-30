import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import SearchItem from "./SearchItem";

function SearchDropdown({ results, loading, query, onClose }) {
  const ref = useRef(null);

  const hasResults =
    results.products?.length ||
    results.categories?.length ||
    results.subcategories?.length;

  // ✅ CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="
        absolute
        top-full
        left-0
        w-full
        mt-2
        bg-white
        border
        rounded-lg
        shadow-xl
        overflow-hidden
        z-50
      "
    >
      {loading && (
        <div className="p-4 text-sm text-gray-500">
          جاري البحث ...
        </div>
      )}

      {!loading && !hasResults && (
        <div className="p-4 text-sm text-gray-500">
          لا توجد نتائج ل {query}
        </div>
      )}

      {!loading && hasResults && (
        <div className="max-h-[450px] overflow-y-auto">
          {results.products?.length > 0 && (
            <div className="p-2">
              <p className="px-2 mb-2 name text-xs">المنتجات</p>

              {results.products.map((item) => (
                <SearchItem
                  key={`product-${item.id}`}
                  item={item}
                  type="product"
                  onClose={onClose}
                />
              ))}
            </div>
          )}

          {results.categories?.length > 0 && (
            <div className="p-2 border-t">
              <p className="px-2 mb-2 name text-xs">الأصناف</p>

              {results.categories.map((item) => (
                <SearchItem
                  key={`category-${item.id}`}
                  item={item}
                  type="category"
                  onClose={onClose}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

SearchDropdown.propTypes = {
  loading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,

  results: PropTypes.shape({
    products: PropTypes.array,
    categories: PropTypes.array,
    subcategories: PropTypes.array,
  }).isRequired,

  onClose: PropTypes.func,
};

export default SearchDropdown;