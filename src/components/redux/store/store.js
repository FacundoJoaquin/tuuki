import { configureStore } from '@reduxjs/toolkit'
import createControl from '../features/createControl/createControSlice'
import modalSlice from '../features/showModal/modalSlice'
import pinCreateControlSlice from '../features/pinCreateControl/pinCreateControlSlice'
import gotoLocationSlice from '../features/gotoLocation/gotoLocationSlice'
import achievementSlice from '../features/achievements/achievementSlice'
import controlHistorialSlice from '../features/controlHistory/controlHistorialSlice'
import historialListSlice from '../features/historialList/historialListSlice'; 
//import loggedInReducer from '../features/logged/loggedInSlice'

export const store = configureStore({
  reducer: {
    createControl: createControl,
    modal: modalSlice,
    pinCreateControl: pinCreateControlSlice,
    gotoLocation: gotoLocationSlice,
    achievement: achievementSlice,
    controlHistorial: controlHistorialSlice,
    historialList: historialListSlice,
    //isLoggedIn: loggedInReducer
  },
})

