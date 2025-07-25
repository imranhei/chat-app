import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import chatSlice from './chatSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
  }
})

export default store;