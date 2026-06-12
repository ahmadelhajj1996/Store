import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import notify from "../utils/toastr";

const initialState = {
  cart: [],
  totalAmount: 0,
  favorites: [],
};

const isSameAttributes = (itemAttr, payloadAttr) => {
  if (!itemAttr && !payloadAttr) return true;
  if (!itemAttr || !payloadAttr) return false;

  return String(itemAttr.option_id) === String(payloadAttr.option_id);
};

const findCartItem = (cart, variation_id, attributes = null) => {
  return cart.find(
    (item) =>
      item.variation_id === variation_id &&
      isSameAttributes(item.attributes, attributes),
  );
};

const calculateTotal = (state) => {
  state.totalAmount = state.cart.reduce((sum, item) => {
    const price = Number(item.price || 0);
    return sum + price * item.quantity;
  }, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    /* -------------------- ADD TO CART -------------------- */
    addToCart: (state, action) => {
      const {
        product_id,
        variation_id,
        attributes = null,
        image,
        stock_quantity,
        quantity = 1,
        product_name,
        variation_sku,
        price = 0,
      } = action.payload;

      const normalizedPrice = Number(price) || 0;

      const existingItem = findCartItem(state.cart, variation_id, attributes);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({
          product_id,
          variation_id,
          attributes,
          image,
          quantity,
          stock_quantity,
          product_name,
          variation_sku,
          price: normalizedPrice,
        });
      }

      calculateTotal(state);
      notify("تمت الاضافة بنجاح", "success");
    },

    /* -------------------- REMOVE FROM CART -------------------- */
    removeFromCart: (state, action) => {
      const { variation_id, attributes = null } = action.payload;

      state.cart = state.cart.filter(
        (item) =>
          !(
            item.variation_id === variation_id &&
            isSameAttributes(item.attributes, attributes)
          ),
      );

      calculateTotal(state);
    },

    /* -------------------- INCREASE -------------------- */
    increaseQuantity: (state, action) => {
      const { variation_id, attributes = null } = action.payload;

      const item = findCartItem(state.cart, variation_id, attributes);

      if (!item) return;

      item.quantity += 1;
      calculateTotal(state);
    },

    /* -------------------- DECREASE -------------------- */
    decreaseQuantity: (state, action) => {
      const { variation_id, attributes = null } = action.payload;

      const item = findCartItem(state.cart, variation_id, attributes);

      if (!item) return;

      if (item.quantity === 1) {
        state.cart = state.cart.filter(
          (i) =>
            !(
              i.variation_id === variation_id &&
              isSameAttributes(i.attributes, attributes)
            ),
        );
      } else {
        item.quantity -= 1;
      }

      calculateTotal(state);
    },

    /* -------------------- CLEAR CART -------------------- */
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
    },

    /* -------------------- FAVORITES -------------------- */
    addToFavorites: (state, action) => {
      const {
        product_id,
        variation_id,
        product_name,
        variation_sku,
        image,
        stock_quantity,
        price,
        attributes = null,
      } = action.payload;

      const exists = state.favorites.find(
        (item) =>
          item.variation_id === variation_id &&
          isSameAttributes(item.attributes, attributes),
      );

      if (!exists) {
        state.favorites.push({
          product_id,
          variation_id,
          product_name,
          variation_sku,
          image,
          price,
          stock_quantity,
          attributes,
        });

        notify("تمت الاضافة بنجاح", "success");
      }
    },

    removeFromFavorites: (state, action) => {
      const { variation_id, attributes = null } = action.payload;

      state.favorites = state.favorites.filter(
        (item) =>
          !(
            item.variation_id === variation_id &&
            isSameAttributes(item.attributes, attributes)
          ),
      );
    },

    updateStockAfterOrder: (state, action) => {
      const orderedItems = action.payload;

      if (!orderedItems || !Array.isArray(orderedItems)) return;

      state.favorites.forEach((favItem) => {
        const matchedItem = orderedItems.find(
          (item) => item.variation_id === favItem.variation_id,
        );
        if (matchedItem) {
          favItem.stock_quantity = matchedItem.updated_stock;
        }
      });

      state.cart = [];
      state.totalAmount = 0;
    },

    updateVariationStock: (state, action) => {
      const { variation_id, quantity } = action.payload;

      console.log("🔴 Redux hit:", variation_id, quantity);
      console.log(
        "🛒 Cart items:",
        state.cart.map((i,index) => ({
          variation_id: i.variation_id,
          id:index,
          stock_quantity: i.stock_quantity,
        })),
      );

      state.cart = state.cart.map((item) =>
        String(item.variation_id) === String(variation_id)
          ? { ...item, stock_quantity: quantity }
          : item,
      );

      state.favorites = state.favorites.map((item) =>
        String(item.variation_id) === String(variation_id)
          ? { ...item, stock_quantity: quantity }
          : item,
      );
    },
  },
});


export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  addToFavorites,
  removeFromFavorites,
  updateStockAfterOrder,
  updateVariationStock,
} = cartSlice.actions;

const persistConfig = {
  key: "bag",
  storage,
  whitelist: ["favorites", "totalAmount", "cart"],
  version: 1, // ✅ bump this whenever state shape changes
  migrate: (state) => Promise.resolve(state),
};


export default persistReducer(persistConfig, cartSlice.reducer);
