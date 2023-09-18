import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    controls: [],
};

export const historialListSlice = createSlice({
  name: "historialList",
  initialState,
  reducers: {
    setHistorialList: (state, action) => {
        // La acción setControls actualizará el estado con el array de controles proporcionado.
        state.controls = action.payload;
      },
  
  },
});

export const { setHistorialList } = historialListSlice.actions;

export default historialListSlice.reducer;
