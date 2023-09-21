import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pinCreateControl: false,
};

export const pinCreateControlSlice = createSlice({
  name: "handleMarkers",
  initialState,
  reducers: {
    handleMarkers: (state) => {
      state.pinCreateControl = true;
    },
    pinCreateControlFalse: (state) => {
      state.pinCreateControl = false;
    },
  },
});

export const { handleMarkers, pinCreateControlFalse } = pinCreateControlSlice.actions;

export default pinCreateControlSlice.reducer;
