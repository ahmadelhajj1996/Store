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
      const {
        product_id,
        variation_id,
        attributes = [],
        image,
        quantity = 1,
        product_name,
        variation_sku,
        price = 0,
      } = action.payload;

      const normalizedPrice = Number(price) || 0;
 
      const existingItem = state.cart.find((item) => {
          return (
            item.variation.id === variation_id
          );
        });
 
        if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total += normalizedPrice * quantity;
      } else {
        state.cart.push({
          product: {
            id: product_id,
            name: product_name,
          },
          variation: {
            id: variation_id,
            sku: variation_sku,
            price: normalizedPrice,
            image,
          },
          attributes,
          quantity,
          total: normalizedPrice * quantity,
        });
      }

      state.totalAmount += normalizedPrice * quantity;

      notify("تمت الاضافة بنجاح", "success");
    },

    removeFromCart: (state, action) => {
      const { variationId } = action.payload;

      const item = state.cart.find((item) => item.variation.id === variationId);

      if (!item) return;

      state.totalAmount -= item.total;

      state.cart = state.cart.filter(
        (item) => item.variation.id !== variationId,
      );
    },

    increaseQuantity: (state, action) => {
      const { variationId } = action.payload;

      const item = state.cart.find((item) => item.variation.id === variationId);

      if (!item) return;

      const price = item.variation.price || 0;

      item.quantity += 1;
      item.total += price;
      state.totalAmount += price;
    },

    decreaseQuantity: (state, action) => {
      const { variationId } = action.payload;

      const item = state.cart.find((item) => item.variation.id === variationId);

      if (!item) return;

      const price = item.variation.price || 0;

      if (item.quantity === 1) {
        state.cart = state.cart.filter((i) => i.variation.id !== variationId);
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
      const {
        product_id,
        variation_id,
        product_name,
        variation_sku,
        image,
        price,
        attributes = [],
      } = action.payload;

      const exists = state.favorites.find(
        (item) => item.variation.id === variation_id,
      );

      if (!exists) {
        state.favorites.push({
          product: {
            id: product_id,
            name: product_name,
          },
          variation: {
            id: variation_id,
            sku: variation_sku,
            price,
            image,
          },
          attributes,
          image,
          price,
          variation_sku,
        });

        notify("تمت الاضافة بنجاح", "success");
      }
    },

    removeFromFavorites: (state, action) => {
      const { variationId } = action.payload;

      state.favorites = state.favorites.filter(
        (item) => item.variation.id !== variationId,
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

/* -------------------- PERSIST -------------------- */

const persistConfig = {
  key: "bag",
  storage,
};

export default persistReducer(persistConfig, cartSlice.reducer);
