import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slice/authSlice'
import passReducer from './slice/passSlicer'

export const store = configureStore({
  reducer: {
    loggedIn: loginReducer,
    passtoken:passReducer,
  },
})