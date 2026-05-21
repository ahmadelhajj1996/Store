import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

 
// You can persist EVERYTHING under one root key
const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], // only these will persist
};

/* -------------------- ROOT REDUCER -------------------- */

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

/* -------------------- PERSISTED REDUCER -------------------- */

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

/* -------------------- STORE -------------------- */

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

/* -------------------- PERSISTOR -------------------- */

export const persistor = persistStore(store);