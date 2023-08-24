import { configureStore } from '@reduxjs/toolkit'
import createControl from '../features/counter/createControSlicel'
//import loggedInReducer from '../features/logged/loggedInSlice'
import modalSlice from '../features/showModal/modalSlice'

export const store = configureStore({
  reducer: {
    createControl: createControl,
    modal: modalSlice
    //isLoggedIn: loggedInReducer
  },
})

