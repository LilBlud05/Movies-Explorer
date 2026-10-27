import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice.js'

// The key "cart" makes this slice available at state.cart.
export const store = configureStore({
  reducer: { cart: cartReducer },
})
