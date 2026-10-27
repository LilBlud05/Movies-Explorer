import test from 'node:test'
import assert from 'node:assert/strict'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer, {
  itemAdded, quantityDecreased, cartCleared,
  selectCartItems, selectCartCount, selectCartTotal,
} from './cartSlice.js'

const notebook = { id: 'notebook', name: 'Everyday notebook', price: 12 }
const mug = { id: 'mug', name: 'Slow morning mug', price: 18 }
const makeStore = () => configureStore({ reducer: { cart: cartReducer } })

test('starts with an empty cart and zero totals', () => {
  const state = makeStore().getState()
  assert.deepEqual(selectCartItems(state), [])
  assert.equal(selectCartCount(state), 0)
  assert.equal(selectCartTotal(state), 0)
})

test('adding the same product increases quantity without creating another row', () => {
  const store = makeStore()
  store.dispatch(itemAdded(notebook))
  const previousState = store.getState()
  store.dispatch(itemAdded(notebook))
  store.dispatch(itemAdded(mug))
  const state = store.getState()
  assert.equal(selectCartItems(state).length, 2)
  assert.equal(selectCartItems(state)[0].quantity, 2)
  assert.equal(selectCartCount(state), 3)
  assert.equal(selectCartTotal(state), 42)
  assert.equal(previousState.cart.items[0].quantity, 1, 'previous state stays immutable')
  assert.equal(notebook.quantity, undefined, 'catalog data stays unchanged')
})

test('decreasing quantity removes the row when it reaches zero', () => {
  const store = makeStore()
  store.dispatch(itemAdded(notebook))
  store.dispatch(itemAdded(notebook))
  store.dispatch(quantityDecreased(notebook.id))
  assert.equal(selectCartCount(store.getState()), 1)
  store.dispatch(quantityDecreased(notebook.id))
  assert.deepEqual(selectCartItems(store.getState()), [])
  assert.equal(selectCartTotal(store.getState()), 0)
})

test('decreasing an unknown product leaves the cart unchanged', () => {
  const store = makeStore()
  store.dispatch(itemAdded(mug))
  const previousState = store.getState()
  store.dispatch(quantityDecreased('missing'))
  assert.deepEqual(store.getState(), previousState)
})

test('clearing the cart resets items and derived totals', () => {
  const store = makeStore()
  store.dispatch(itemAdded(notebook))
  store.dispatch(itemAdded(mug))
  store.dispatch(cartCleared())
  assert.deepEqual(selectCartItems(store.getState()), [])
  assert.equal(selectCartCount(store.getState()), 0)
  assert.equal(selectCartTotal(store.getState()), 0)
})
