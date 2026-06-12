import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { addToCart, removeFromFavorites } from "../store/cartSlice";
import TopLoader from "../components/loaders/TopLoader";
import notify from "../utils/toastr";

function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading] = useState(false);

  const { favorites = [] } = useSelector((state) => state.cart);

  /* -------------------- TOTAL ITEMS -------------------- */
  const totalItems = useMemo(() => favorites.length, [favorites]);

  /* -------------------- REMOVE -------------------- */
  const handleRemove = (item) => {
    // FIX: Send variation_id and attributes object matching slice signature
    dispatch(
      removeFromFavorites({
        variation_id: item.variation_id,
        attributes: item.attributes,
      }),
    );
  };

  /* -------------------- ADD TO CART -------------------- */
  const handleAddToCart = (item) => {
    if (item.stock_quantity === 0) {
      notify("عذراً، هذا المنتج غير متوفر حالياً", "error");
      return;
    }

    const payload = {
      product_id: item.product_id,
      variation_id: item.variation_id,
      product_name: item.product_name,
      variation_sku: item.variation_sku,
      price: item.price,
      image: item.image || null,
      quantity: 1,
      stock_quantity: item.stock_quantity,
      attributes: item.attributes || null, // Stores directly as your neat single object format
    };

    dispatch(addToCart(payload));
  };

  /* -------------------- EMPTY STATE -------------------- */
  if (favorites.length === 0) {
    return (
      <div className="mt-12 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border bg-white">
            <ShoppingBag size={24} className="text-gray-400" />
          </div>

          <h2 className="name mb-2">لا توجد عناصر مفضلة</h2>
          <p className="text-gray-500">لم تقم بإضافة أي منتج إلى المفضلة بعد</p>

          <button onClick={() => navigate("/")} className="button mt-6 py-2">
            ابدأ التسوق
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-6 sm:py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="name flex items-center gap-2">
            العناصر المفضلة
            <span className="tag">{totalItems} عنصر</span>
          </h1>
        </div>

        {/* List */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          {favorites.map((item) => {
            const image = item.image || "/placeholder.png";

            return (
              <div
                key={`${item.product_id}-${item.variation_id}`}
                className="border-b  last:border-b-0"
              >
                <div className="flex gap-1">
                  <div className="h-24 w-20 cursor-pointer overflow-hidden rounded-lg bg-gray-100 ">
                    {loading ? (
                      <TopLoader
                        num={1}
                        cols={1}
                        height="400px"
                        className="rounded-lg bg-inherit"
                      />
                    ) : (
                      <img
                        src={image}
                        alt={item.product_name}
                        className="h-24 w-20 object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-2">
                    <div className="space-y-2">
                      <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 items-center   name text-xs justify-between ">
                        <div>
                          {item.product_name}-
                          <span>({item.attributes.option_value})</span>
                          <span className="text-xs ms-1">
                            {item.stock_quantity == 0 ? (
                              <span className="text-red-600 line-through">
                                غير متوفر حالياً
                              </span>
                            ) : item.stock_quantity < 5 ? (
                              <span className="text-red-600">
                                (متبقي فقط {item.stock_quantity} )
                              </span>
                            ) : item.stock_quantity < 10 ? (
                              <span className="text-orange-500">
                                ( متبقي {item.stock_quantity} )
                              </span>
                            ) : null}
                          </span>
                        </div>
                        <span className="-mt-2 md:text-end">
                          {Number(item.price) || 0} ل.س
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      {item.stock_quantity != 0 && (
                        <ShoppingBag
                          size={20}
                          className="text-blue-600 cursor-pointer"
                          onClick={() => handleAddToCart(item)}
                        />
                      )}

                      {item.stock_quantity == 0 && (
                        <div className=" text-xs text-blue-600 cursor-pointer"
                              onClick={()=>notify('تم تسحيل طلبك')}
                            >
                             ارسال اشعار عند توفر المنتح ؟
                        </div>
                      )}



                      <Trash
                        size={20}
                        className="text-red-600 cursor-pointer"
                        // FIX: Pass the whole item object to match signatures safely
                        onClick={() => handleRemove(item)}
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
  );
}

export default Favorites;
