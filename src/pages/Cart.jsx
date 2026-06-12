import { useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import notify from "../utils/toastr";
import { usePost } from "../hooks/useApi";
import TopLoader from "../components/loaders/TopLoader";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  updateStockAfterOrder
} from "../store/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const { cart = [], totalAmount = 0 } = useSelector((state) => state.cart);
  const { token, user } = useSelector((state) => state.auth);

  

  /* -------------------------------------------------------------------------- */
  /* TOTALS                                   */
  /* -------------------------------------------------------------------------- */

  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  /* -------------------------------------------------------------------------- */
  /* ORDER PAYLOAD                                */
  /* -------------------------------------------------------------------------- */

  const orderPayload = useMemo(() => {
    return {
      client_id: user?.id,
      subtotal: totalAmount,
      grand_total: totalAmount,
      item_count: totalItems,
      payment_method: "cash",
      payment_status: "pending",
      shipping_address: user?.address || "Default Address",
      billing_address: user?.address || "Default Address",
      notes: "",

      items: cart.map((item) => {
        return {
          product_id: item.product_id,
          variation_id: item.variation_id,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          subtotal: Number(item.quantity) * Number(item.price),
          // FIX: item.attributes is now an object, turn it into an array for your backend API
          selected_attributes: item.attributes
            ? [
                {
                  name: item.attributes.attribute_name,
                  value: item.attributes.option_value,
                },
              ]
            : [],
        };
      }),
    };
  }, [cart, totalAmount, totalItems, user]);

  /* -------------------------------------------------------------------------- */
  /* ACTION HANDLERS                              */
  /* -------------------------------------------------------------------------- */

  const handleIncrease = useCallback(
    (item) => {
      dispatch(
        increaseQuantity({
          variation_id: item.variation_id, // FIX: camelCase to snake_case
          attributes: item.attributes,
        }),
      );
    },
    [dispatch],
  );

  const handleDecrease = useCallback(
    (item) => {
      dispatch(
        decreaseQuantity({
          variation_id: item.variation_id, // FIX: camelCase to snake_case
          attributes: item.attributes,
        }),
      );
    },
    [dispatch],
  );

  const handleRemove = useCallback(
    (item) => {
      dispatch(
        removeFromCart({
          variation_id: item.variation_id, // FIX: camelCase to snake_case
          attributes: item.attributes,
        }),
      );
    },
    [dispatch],
  );

const handleClearCart = useCallback(() => {
    // If your cartSlice doesn't export clearCart anymore because updateStock handles it, 
    // you can pass an empty array to safely wipe out items manually here:
    dispatch(updateStockAfterOrder([]));
    dispatch(clearCart());
  }, [dispatch]);

  /* -------------------------------------------------------------------------- */
  /* ORDER API                                  */
  /* -------------------------------------------------------------------------- */

  const createOrder = usePost({
    invalidateQueries: [["orders"], ["variations"]],

    onSuccess: () => {
      // Create the structure expected by the updateStockAfterOrder reducer.
      // We calculate the fresh stock remaining based on the state elements right before checkout completion.
      const freshlyOrderedItems = cart.map((item) => ({
        variation_id: item.variation_id,
        updated_stock: Math.max(0, item.stock_quantity - item.quantity),
      }));

      // Dispatch the dedicated action to synchronize stock changes & clear the cart atomically
      dispatch(updateStockAfterOrder(freshlyOrderedItems));

      notify("تم تسجيل طلبك بنجاح", "success");
      navigate("/");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message || "حدث خطأ أثناء تسجيل الطلب";
      notify(message, "error");
    },
  });

  const handleConfirm = async () => {
    try {
      if (!token) {
        navigate("/login", {
          state: { from: location.pathname },
        });
        return;
      }

      if (cart.length === 0) {
        notify("السلة فارغة", "warning");
        return;
      }

      setLoading(true);

      await createOrder.mutateAsync({
        url: "/orders",
        data: orderPayload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

     console.log("" , cart);
        


  if (cart.length === 0) {
    return (
      <div className="mt-12 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="bordered mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <ShoppingBag size={24} className="text-gray-400" />
          </div>

          <h2 className="name mb-2">السلة فارغة</h2>
          <p className="text-gray-500">لم تقم بإضافة أي منتج إلى السلة بعد</p>

          <button
            onClick={() => navigate("/")}
            className="button mt-6 py-2 disabled:opacity-50"
          >
            ابدأ التسوق
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex justify-between w-full items-center">
            <h1 className="name flex items-center gap-2">
              سلة التسوق
              <span className="tag">{totalItems} عنصر</span>
            </h1>

            <button
              onClick={handleClearCart}
              disabled={loading}
              className="rounded-lg border border-red-200 px-4 py-2 text-xs mb-2 text-red-600 transition-all hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              حذف الكل
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-y-6">
          {/* Cart Items */}
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            {cart.map((item, index) => {
              const image = item.image || "/placeholder.png";

              return (
                <div key={index} className="border-b  last:border-b-0">
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
                            {item.stock_quantity < 5 ? (
                              <span className="text-red-600">
                                (متبقي فقط {item.stock_quantity} )
                              </span>
                            ) : item.stock_quantity <= 10 ? (
                              <span className="text-orange-500">
                                ( متبقي {item.stock_quantity} )
                              </span>
                            ) : null}
                          </span>
                        </div>
                        

                          <span className="-mt-2 md:text-end">
                            {Number(item.quantity * item.price) || 0} ل.س
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="bordered grid grid-cols-3 place-items-center  rounded-lg border ">
                          <button
                            onClick={() => handleDecrease(item)}
                            className="flex py-1 w-8 items-center justify-center text-cyan-600"
                          >
                            <Minus size={16} />
                          </button>

                          <p className="w-full text-center text-sm">
                            {item.quantity}
                          </p>

                          <button
                            onClick={() => handleIncrease(item)}
                            className="flex py-1 w-8 items-center justify-center text-cyan-600"
                            disabled={item.quantity == item.stock_quantity }
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item)}
                          className="text-red-600 transition-all hover:scale-105"
                        >
                          <Trash size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="space-y-3">
              <div className="flex text-xs items-center justify-between">
                <span>عدد المنتجات</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex text-xs items-center justify-between">
                <span>عدد العناصر المختلفة</span>
                <span>{cart.length}</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">المجموع الكلي</span>
                  <span className="price text-sm">{totalAmount} ل.س</span>
                </div>
              </div>
            </div>

            <div
              className="flex justify-center items-center rounded-lg bordered  text-sm  max-w-sm mx-auto px-2 py-3   mt-6 cursor-pointer bg-cyan-600 text-white"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  جاري تأكيد الطلب...
                </>
              ) : (
                "تأكيد الطلب"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
