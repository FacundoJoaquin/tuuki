import { configureStore } from '@reduxjs/toolkit'
import createControl from '../features/createControl/createControSlice'
import modalSlice from '../features/showModal/modalSlice'
import pinCreateControlSlice from '../features/pinCreateControl/pinCreateControlSlice'
import gotoLocationSlice from '../features/gotoLocation/gotoLocationSlice'
//import loggedInReducer from '../features/logged/loggedInSlice'

export const store = configureStore({
  reducer: {
    createControl: createControl,
    modal: modalSlice,
    pinCreateControl: pinCreateControlSlice,
    gotoLocation: gotoLocationSlice
    //isLoggedIn: loggedInReducer
  },
})

