import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStockChannel } from "../utils/echo";
import { updateVariationStock } from "../store/cartSlice";
import { store } from "../store/store";


export default function StockListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const channel = getStockChannel();

    const handler = (e) => {
      if (!e?.variationId || e?.quantity === undefined) return;

      // 🔍 Get current cart from Redux store directly
      const currentCart = store.getState().cart.cart;
      console.log("📦 Pusher variationId:", e.variationId);
      console.log(
        "🛒 Cart variation IDs:",
        currentCart.map((i) => i.variation_id),
      );
      console.log(
        "✅ Match?",
        currentCart.some(
          (i) => String(i.variation_id) === String(e.variationId),
        ),
      );

      dispatch(
        updateVariationStock({
          variation_id: e.variationId,
          quantity: e.quantity,
        }),
      );
    };

    channel.bind("stock.updated", handler);

    return () => {
      channel.unbind("stock.updated", handler);
    };
  }, [dispatch]);

  return null;
}
