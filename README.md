# Little Store — learning Redux Toolkit

A small Vite + React app in plain JavaScript. Three products, one cart slice, and no backend. Add products, change quantities, clear the cart, and expand **Peek inside the store** to see the actual cart state.

Next project: [Movies Explorer capstone guide](./CAPSTONE.md), with milestones, API recommendations, and deployment instructions. Redux is optional for the capstone; React state and props are sufficient.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Other commands:

```sh
npm test          # Cart behavior and immutability checks
npm run build    # Production build in dist/
npm run preview  # Serve the production build after building
```

## Suggested teaching order

1. **The store — `src/app/store.js`.** `configureStore` creates the shared state container. Registering `cart: cartReducer` gives the state its `{ cart: { items: [] } }` shape.
2. **The provider — `src/main.jsx`.** `<Provider store={store}>` connects the React component tree to that store.
3. **The slice — `src/features/cart/cartSlice.js`.** `createSlice` groups initial state and reducer functions, then generates action creators. A reducer describes how state changes after an action. Redux Toolkit uses Immer, so mutation-style code inside these reducers produces immutable updates. Avoid changing state directly elsewhere.
4. **Dispatch — `src/components/ProductList.jsx`.** `useDispatch()` gives a component the dispatch function. Clicking a product button calls `dispatch(itemAdded(product))`.
5. **Selectors — `src/components/Cart.jsx`.** `useSelector()` subscribes to selected data. Cart rows, quantities, and totals update after actions. `Header` in `src/App.jsx` reads the same count independently, demonstrating shared state without passing cart props through the tree.

The data flow is:

```text
Button click
  → dispatch(itemAdded(product))
  → cart slice reducer
  → updated store
  → useSelector reads the changed values
  → React updates the cart and header
```

For example, `itemAdded({ id: 'notebook', name: 'Everyday notebook', price: 12 })` creates:

```js
{
  type: 'cart/itemAdded',
  payload: { id: 'notebook', name: 'Everyday notebook', price: 12 }
}
```

The reducer adds a new cart row with `quantity: 1`, or increases the quantity for an existing product. Decreasing a quantity of one removes that row. Totals and item counts are calculated with selectors rather than stored separately.

## Try this in class

- Add the same product twice. Notice one row with quantity two, and the matching header badge.
- Add a second product and predict the total before clicking.
- Decrease a quantity to zero, then clear the cart.
- Keep the state preview open while interacting.
- If installed, open the Redux DevTools browser extension to inspect action payloads and state changes. `configureStore` enables its development integration automatically.
- Exercise: add an `itemRemoved` reducer and a button that removes a whole row regardless of quantity.

This lesson deliberately leaves out routing, asynchronous requests, persistence, and checkout. Refreshing starts with an empty cart. Static products stay outside Redux because they do not change. A cart this small could use React state; Redux is used here to demonstrate its shared-state flow.

## Learn more

- [Watch this video to learn more about Redux](https://youtu.be/5yEG6GhoJBs?si=A2mRl4ZWTGgOKmut).
- Official reference: [Redux Quick Start](https://redux.js.org/tutorials/quick-start).
