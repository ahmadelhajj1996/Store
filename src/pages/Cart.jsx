import { useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import notify from "../utils/toastr";
import { usePost } from "../hooks/useApi";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../store/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const { cart = [], totalAmount = 0 } = useSelector((state) => state.cart);

  const { token, user } = useSelector((state) => state.auth);

  /* -------------------------------------------------------------------------- */
  /*                                   TOTALS                                   */
  /* -------------------------------------------------------------------------- */

  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  /* -------------------------------------------------------------------------- */
  /*                              ORDER PAYLOAD                                 */
  /* -------------------------------------------------------------------------- */

  console.log(cart ?? []);

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
          product_id: item.product?.id,
          variation_id: item.variation?.id, // MUST be real ID
          quantity: Number(item.quantity),
          unit_price: Number(item.variation?.price || item.price),
          subtotal:
            Number(item.quantity) * Number(item.variation?.price || item.price),

          selected_attributes: (item.attributes || []).map((attr) => ({
            name: attr.attribute_name,
            value: attr.attribute_option_name,
          })),

        };
      }),
    };
  }, [cart, totalAmount, totalItems, user]);

  /* -------------------------------------------------------------------------- */
  /*                                  HANDLERS                                  */
  /* -------------------------------------------------------------------------- */

  const handleIncrease = useCallback(
    (variationId) => {
      dispatch(increaseQuantity({ variationId }));
    },
    [dispatch],
  );

  const handleDecrease = useCallback(
    (variationId) => {
      dispatch(decreaseQuantity({ variationId }));
    },
    [dispatch],
  );

  const handleRemove = useCallback(
    (variationId) => {
      dispatch(removeFromCart({ variationId }));
    },
    [dispatch],
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const createOrder = usePost({
    invalidateQueries: [["orders"]],

    onSuccess: () => {
      dispatch(clearCart());
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

      const invalidItem = cart.find(
        (item) => !item.variation?.id || !item.product?.id,
      );

      if (invalidItem) {
        notify("هناك منتج غير صالح في السلة", "error");
        return;
      }

      setLoading(true);

      // console.log("USER:", user);
      console.log("ORDER PAYLOAD:", orderPayload);

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

  /* -------------------------------------------------------------------------- */
  /*                                EMPTY CART                                  */
  /* -------------------------------------------------------------------------- */

  if (cart.length === 0) {
    return (
      <div className="mt-12 flex items-center justify-center px-4">
        <div className="text-center">
          <div
            className="
              bordered
              mx-auto
              mb-5
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-white
            "
          >
            <ShoppingBag size={24} className="text-gray-400" />
          </div>

          <h2 className="name mb-2">السلة فارغة</h2>

          <p className="text-gray-500">لم تقم بإضافة أي منتج إلى السلة بعد</p>

          <button
            onClick={() => navigate("/")}
            className="
              button
              mt-6
              py-2
              disabled:opacity-50
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
        sm:px-6
        py-6
        sm:py-8
        md:py-12
      "
    >
      <div className="mx-auto max-w-4xl">
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
          <div className=" flex justify-between w-full items-center">
            <h1 className="name flex items-center gap-2">
              سلة التسوق
              <span className="tag">{totalItems} عنصر</span>
            </h1>
            <button
              onClick={handleClearCart}
              disabled={loading}
              className="
              rounded-lg
              border
              border-red-200
              px-4
              py-2
              text-xs
              mb-2
              text-red-600
              transition-all
              hover:bg-red-600
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            >
              حذف الكل
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-y-6">
          {/* Cart Items */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            {cart.map((item) => {
              const image = item?.variation?.image || "/placeholder.png";

              return (
                <div
                  key={`${item.product.id}-${item.variation.id}`}
                  className="border-b p-4 last:border-b-0"
                >
                  <div className="flex gap-4">
                    <div
                      className="
                        h-24
                        w-20
                        cursor-pointer
                        overflow-hidden
                        rounded-lg
                        bg-gray-100
                        sm:h-28
                        sm:w-28
                      "
                      onClick={() => navigate(`/items/${item.product.id}`)}
                    >
                      <img
                        src={image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center name text-xs   justify-between gap-3">
                          <span className="">{item.product.name}</span>
                          <span className=" -mt-2">{item.total} ل.س</span>
                        </div>

                        {item?.attributes?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.attributes.map((attr, index) => (
                              <span
                                key={index}
                                className="
                                rounded-lg
                                tag
                                p-1
                                text-xs
                                font-normal
                                text-gray-600
                              "
                              >
                                {attr.attribute_name} :{" "}
                                {attr.attribute_option_name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity */}
                        <div
                          className="
                            bordered
                            grid
                            grid-cols-3
                            place-items-center
                            gap-x-2
                            rounded-lg
                            border
                            px-1
                          "
                        >
                          <button
                            onClick={() => handleDecrease(item.variation.id)}
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              text-cyan-600
                            "
                          >
                            <Minus size={18} />
                          </button>

                          <p className="w-full text-center leading-none">
                            {item.quantity}
                          </p>

                          <button
                            onClick={() => handleIncrease(item.variation.id)}
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              text-cyan-600
                            "
                          >
                            <Plus size={18} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(item.variation.id)}
                          className="
                            text-red-600
                            transition-all
                            hover:scale-105
                          "
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">عدد المنتجات</span>

                <span>{totalItems}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">عدد العناصر المختلفة</span>

                <span>{cart.length}</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="name">المجموع الكلي</span>

                  <span className="price text-xl">{totalAmount} ل.س</span>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="
                button
                mt-6
                flex
                w-full
                items-center
                justify-center
                gap-2
                py-3
                text-lg
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  جاري تأكيد الطلب...
                </>
              ) : (
                "تأكيد الطلب"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
