import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  controlCanino: 0,
  controlPapeles: 0,
  controlGendarmeria: 0,
  controlAlcohol: 0,
};

export const controlHistorialSlice = createSlice({
  name: "historial",
  initialState,
  reducers: {
    setCounters: (state, action) => {
      const { controlCanino, controlPapeles, controlGendarmeria, controlAlcohol } = action.payload;
      state.controlCanino = controlCanino;
      state.controlPapeles = controlPapeles;
      state.controlGendarmeria = controlGendarmeria;
      state.controlAlcohol = controlAlcohol;
    },
    incrementCounter: (state, action) => {
      const { field } = action.payload;
      state[field] += 1;
    },
  },
});

export const { setCounters, incrementCounter } = controlHistorialSlice.actions;

export default controlHistorialSlice.reducer;
