import { createSlice } from '@reduxjs/toolkit'

const initialState = { items: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    itemAdded(state, action) {
      // The dispatched action carries a product in action.payload.
      const product = action.payload
      const item = state.items.find((item) => item.id === product.id)

      // Redux Toolkit uses Immer, so these updates produce immutable state.
      if (item) {
        item.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },
    quantityDecreased(state, action) {
      const item = state.items.find((item) => item.id === action.payload)
      if (!item) return

      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload)
      }
    },
    cartCleared(state) {
      state.items = []
    },
  },
})

// createSlice generates an action creator for each reducer above.
export const { itemAdded, quantityDecreased, cartCleared } = cartSlice.actions
export default cartSlice.reducer

// Selectors read state. Calculate totals instead of storing duplicate data.
export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0)
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
