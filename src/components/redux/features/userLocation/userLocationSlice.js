import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: "",
  longitude: "",
};

export const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {
    userLocation: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { userLocation } = userLocationSlice.actions;

export default userLocationSlice.reducer;
