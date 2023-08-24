import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalState: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalState = !state.modalState;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
