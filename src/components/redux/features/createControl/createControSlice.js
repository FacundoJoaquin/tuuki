import { createSlice } from "@reduxjs/toolkit";
//import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  iconUrl: "",
  type: "",
  comment: "",
  timeStamp: "",
  latitude: "",
  longitude: "",
};

export const createControlSlice = createSlice({
  name: "createControl",
  initialState,
  reducers: {
    updateControl: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateControl } = createControlSlice.actions;

export default createControlSlice.reducer;
