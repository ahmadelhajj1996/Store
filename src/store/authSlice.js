<<<<<<< HEAD
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isLoading: false,
  // error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});


export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;


=======
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isLoading: false,
  // error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});


export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;


>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
