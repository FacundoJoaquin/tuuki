import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: "",
  longitude: "",
};

export const gotoLocationSlice = createSlice({
  name: "goToLocation",
  initialState,
  reducers: {
    gotoLocation: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { gotoLocation } = gotoLocationSlice.actions;

export default gotoLocationSlice.reducer;
