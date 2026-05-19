import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import notify from "../utils/toastr";

const initialState = {
  cart: [],
  totalAmount: 0,
  favorites: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, variation, quantity = 1 } = action.payload;

      const price = variation.price?.["$"] || variation.price || 0;

      const existingItem = state.cart.find(
        (item) =>
          item.product.id === product.id &&
          item.variation.id === variation.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total += price * quantity;
      } else {
        state.cart.push({
          product,
          variation: {
            ...variation,
            images: Array.isArray(variation.images)
              ? variation.images
              : JSON.parse(variation.images || "[]"),
          },
          quantity,
          total: price * quantity,
        });
      }

      state.totalAmount += price * quantity;

      notify("تمت الاضافة بنجاح ", "success");
    },

    removeFromCart: (state, action) => {
      const { variationId } = action.payload;

      const item = state.cart.find(
        (item) => item.variation.id === variationId
      );

      if (!item) return;

      state.totalAmount -= item.total;
      state.cart = state.cart.filter(
        (item) => item.variation.id !== variationId
      );
    },

    increaseQuantity: (state, action) => {
      const { variationId } = action.payload;

      const item = state.cart.find(
        (item) => item.variation.id === variationId
      );

      if (!item) return;

      const price = item.variation.price?.["$"] || item.variation.price || 0;

      item.quantity += 1;
      item.total += price;
      state.totalAmount += price;
    },

    decreaseQuantity: (state, action) => {
      const { variationId } = action.payload;

      const item = state.cart.find(
        (item) => item.variation.id === variationId
      );

      if (!item) return;

      const price = item.variation.price?.["$"] || item.variation.price || 0;

      if (item.quantity === 1) {
        state.cart = state.cart.filter(
          (i) => i.variation.id !== variationId
        );
        state.totalAmount -= price;
      } else {
        item.quantity -= 1;
        item.total -= price;
        state.totalAmount -= price;
      }
    },

    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
    },

    addToFavorites: (state, action) => {
      const { product, variation } = action.payload;

      const exists = state.favorites.find(
        (item) => item.variation.id === variation.id
      );

      if (!exists) {
        state.favorites.push({
          product,
          variation: {
            ...variation,
            images: Array.isArray(variation.images)
              ? variation.images
              : JSON.parse(variation.images || "[]"),
          },
        });

        notify("تمت الاضافة بنجاح", "success");
      }
    },

    removeFromFavorites: (state, action) => {
      const { variationId } = action.payload;

      state.favorites = state.favorites.filter(
        (item) => item.variation.id !== variationId
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
} = cartSlice.actions;

/* -------------------- PERSIST CONFIG -------------------- */

const persistConfig = {
  key: "bag",
  storage,
};

export default persistReducer(persistConfig, cartSlice.reducer);