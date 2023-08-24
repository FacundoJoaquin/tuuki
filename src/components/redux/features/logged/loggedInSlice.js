import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  isLogged: false,
  accessToken: "",
};

export const loggedInSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    logInOut: (state) => {
      state.isLogged = !state.isLogged;
    },
    setAccessToken: (state, action) => {
        state.accessToken = action.payload;
      },
    },
});

export const { logInOut, setAccessToken  } = loggedInSlice.actions;

export default loggedInSlice.reducer;
