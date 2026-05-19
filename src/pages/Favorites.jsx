import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { addToCart, removeFromFavorites } from "../store/cartSlice";

function Favorites() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { favorites = [] } = useSelector((state) => state.cart);

  /* -------------------- TOTAL ITEMS -------------------- */

  const totalItems = useMemo(() => {
    return favorites.length;
  }, [favorites]);

  /* -------------------- HANDLERS -------------------- */

  const handleRemove = (variationId) => {
    dispatch(removeFromFavorites({ variationId }));
  };

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        product: item.product,
        variation: item.variation,
        quantity: 1,
      }),
    );
  };

  /* -------------------- EMPTY FAVORITES -------------------- */

  if (favorites.length === 0) {
    return (
      <div className="mt-12 flex items-center justify-center px-4">
        <div className="text-center">
          <div
            className="
              mx-auto
              mb-5
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              bg-white
            "
          >
            <ShoppingBag size={24} className="text-gray-400" />
          </div>

          <h2 className="name mb-2">لا توجد عناصر مفضلة</h2>

          <p className="text-gray-500">لم تقم بإضافة أي منتج إلى المفضلة بعد</p>

          <button
            onClick={() => navigate("/")}
            className="
              button
              mt-6
              py-2
            "
          >
            ابدأ التسوق
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-gray-50
        to-gray-100
        px-4
        py-6
        sm:px-6
        sm:py-8
        md:py-12
      "
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div
          className="
            mb-6
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h1 className="name flex items-center gap-2">
              العناصر المفضلة
              <span className="tag">{totalItems} عنصر</span>
            </h1>
          </div>
        </div>

        {/* Favorite Items */}
        <div className="flex flex-col gap-y-6">
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            {favorites.map((item) => {
              const image = item?.variation?.images?.[0] || "/placeholder.png";

              return (
                <div
                  key={`${item.product.id}-${item.variation.id}`}
                  className="border-b p-3 last:border-b-0"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div
                      className="
                        h-20
                        w-20
                        flex-shrink-0
                        overflow-hidden
                        rounded-md
                        bg-gray-100
                        sm:h-28
                        sm:w-28
                        cursor-pointer
                      "
                      onClick={() => navigate(`/items/${item.product.id}`)}
                    >
                      <img
                        src={image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div
                      className="
                        flex
                        flex-1
                        px-0
                        flex-col
                        justify-between
                      "
                    >
                      <div className="flex justify-between items-center gap-3 ">
                        <span>{item.product.name}</span>
                        <span className="price -mt-2  text-xs sm:text-sm">
                          {item.variation.price} ل.س
                        </span>
                      </div>

                      {/* Actions */}
                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >
                        {/* Add To Cart */}

                        <ShoppingBag
                          size={20}
                          className=" text-blue-600 cursor-pointer"
                          onClick={() => handleAddToCart(item)}
                        />

                        <Trash
                          size={20}
                          className=" text-red-600 cursor-pointer"
                          onClick={() => handleRemove(item.variation.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
