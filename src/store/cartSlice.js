<<<<<<< HEAD
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import notify from "../utils/toastr";

const initialState = {
  cart: [],
  totalAmount: 0,
  favorites: [],
};

/* -------------------- HELPERS -------------------- */

const isSameAttributes = (a = [], b = []) => {
  if (a.length !== b.length) return false;

  return a.every((attrA) =>
    b.some(
      (attrB) =>
        attrA.attribute_name === attrB.attribute_name &&
        attrA.attribute_option_name === attrB.attribute_option_name
    )
  );
};

const findCartItem = (cart, variationId, attributes = []) => {
  return cart.find(
    (item) =>
      item.variation_id === variationId &&
      isSameAttributes(item.attributes, attributes)
  );
};

/* -------------------- TOTAL CALCULATOR -------------------- */

const calculateTotal = (state) => {
  state.totalAmount = state.cart.reduce((sum, item) => {
    const price = Number(item.price || 0);
    return sum + price * item.quantity;
  }, 0);
};

/* -------------------- SLICE -------------------- */

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    /* -------------------- ADD TO CART -------------------- */

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

      const existingItem = findCartItem(
        state.cart,
        variation_id,
        attributes
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({
          product_id,
          variation_id,
          attributes,
          image,
          quantity,
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
      const { variationId, attributes = [] } = action.payload;

      state.cart = state.cart.filter(
        (item) =>
          !(
            item.variation_id === variationId &&
            isSameAttributes(item.attributes, attributes)
          )
      );

      calculateTotal(state);
    },

    /* -------------------- INCREASE -------------------- */

    increaseQuantity: (state, action) => {
      const { variationId, attributes = [] } = action.payload;

      const item = findCartItem(state.cart, variationId, attributes);

      if (!item) return;

      item.quantity += 1;
      calculateTotal(state);
    },

    /* -------------------- DECREASE -------------------- */

    decreaseQuantity: (state, action) => {
      const { variationId, attributes = [] } = action.payload;

      const item = findCartItem(state.cart, variationId, attributes);

      if (!item) return;

      if (item.quantity === 1) {
        state.cart = state.cart.filter(
          (i) =>
            !(
              i.variation_id === variationId &&
              isSameAttributes(i.attributes, attributes)
            )
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
        price,
        attributes = [],
      } = action.payload;

      const exists = state.favorites.find(
        (item) =>
          item.variation_id === variation_id &&
          isSameAttributes(item.attributes, attributes)
      );

      if (!exists) {
        state.favorites.push({
          product_id,
          variation_id,
          product_name,
          variation_sku,
          image,
          price,
          attributes,
        });

        notify("تمت الاضافة بنجاح", "success");
      }
    },

    removeFromFavorites: (state, action) => {
      const { variationId, attributes = [] } = action.payload;

      state.favorites = state.favorites.filter(
        (item) =>
          !(
            item.variation_id === variationId &&
            isSameAttributes(item.attributes, attributes)
          )
      );
    },
  },
});

/* -------------------- EXPORTS -------------------- */

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
=======
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import notify from "../utils/toastr";

const initialState = {
  cart: [],
  totalAmount: 0,
  favorites: [],
};

/* -------------------- HELPERS -------------------- */

const isSameAttributes = (currentAttrs = [], newAttrs = []) => {
  if (currentAttrs.length !== newAttrs.length) return false;

  return currentAttrs.every((currentAttr) =>
    newAttrs.some(
      (newAttr) =>
        currentAttr.attribute_name === newAttr.attribute_name &&
        currentAttr.attribute_option_name === newAttr.attribute_option_name,
    ),
  );
};

const findCartItem = (cart, variationId, attributes = []) => {
  return cart.find(
    (item) =>
      item.variation.id === variationId &&
      isSameAttributes(item.attributes, attributes),
  );
};

/* -------------------- TOTAL CALCULATOR (🔥 IMPORTANT) -------------------- */

const calculateTotal = (state) => {
  state.totalAmount = state.cart.reduce((sum, item) => {
    const price = Number(item.variation?.price || 0);
    return sum + price * item.quantity;
  }, 0);
};

/* -------------------- SLICE -------------------- */

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    /* -------------------- ADD -------------------- */

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

      const existingItem = findCartItem(state.cart, variation_id, attributes);

      if (existingItem) {
        existingItem.quantity += quantity;
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
        });
      }

      calculateTotal(state);

      notify("تمت الاضافة بنجاح", "success");
    },

    /* -------------------- REMOVE -------------------- */

    removeFromCart: (state, action) => {
      const { variationId, attributes = [] } = action.payload;

      state.cart = state.cart.filter(
        (item) =>
          !(
            item.variation.id === variationId &&
            isSameAttributes(item.attributes, attributes)
          ),
      );

      calculateTotal(state);
    },

    /* -------------------- INCREASE -------------------- */

    increaseQuantity: (state, action) => {
      const { variationId, attributes = [] } = action.payload;

      const item = findCartItem(state.cart, variationId, attributes);

      if (!item) return;

      item.quantity += 1;

      calculateTotal(state);
    },

    /* -------------------- DECREASE -------------------- */

    decreaseQuantity: (state, action) => {
      const { variationId, attributes = [] } = action.payload;

      const item = findCartItem(state.cart, variationId, attributes);

      if (!item) return;

      if (item.quantity === 1) {
        state.cart = state.cart.filter(
          (i) =>
            !(
              i.variation.id === variationId &&
              isSameAttributes(i.attributes, attributes)
            ),
        );
      } else {
        item.quantity -= 1;
      }

      calculateTotal(state);
    },

    /* -------------------- CLEAR -------------------- */

    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
    },

    /* -------------------- FAVORITES (unchanged) -------------------- */

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
          product: { id: product_id, name: product_name },
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
      }
      notify("تمت الاضافة بنجاح", "success");
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
>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
