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
  },
});

export const { handleMarkers } = pinCreateControlSlice.actions;

export default pinCreateControlSlice.reducer;
