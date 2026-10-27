import { useDispatch, useSelector } from 'react-redux'
import {
  itemAdded,
  quantityDecreased,
  cartCleared,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from '../features/cart/cartSlice.js'

export default function Cart() {
  const dispatch = useDispatch()
  // React-Redux re-renders this component when selected values change.
  const items = useSelector(selectCartItems)
  const count = useSelector(selectCartCount)
  const total = useSelector(selectCartTotal)

  return (
    <aside className="cart" aria-labelledby="cart-heading">
      <div className="section-heading">
        <h2 id="cart-heading">Your cart <span className="cart-count">{count}</span></h2>
        <button className="text-button" disabled={!count} onClick={() => dispatch(cartCleared())}>Clear</button>
      </div>
      {items.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-bag" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><path d="M5 8h14l1.5 13h-17L5 8Z" /><path d="M8 9V6a4 4 0 0 1 8 0v3" /></svg></span>
          <h3>A little empty in here.</h3>
          <p>Add an everyday essential.<br />Watch your shared state grow.</p>
        </div>
      ) : (
        <ul className="cart-items">
          {items.map((item) => (
            <li className="cart-item" key={item.id}>
              <div className="cart-item-title"><h3>{item.name}</h3><span>${(item.price * item.quantity).toFixed(2)}</span></div>
              <div className="cart-item-bottom">
                <span>${item.price.toFixed(2)} each</span>
                <div className="quantity-control" role="group" aria-label={`${item.name} quantity`}>
                  <button aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(quantityDecreased(item.id))}>−</button>
                  <span>{item.quantity}</span>
                  <button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(itemAdded(item))}>+</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total" aria-live="polite" aria-atomic="true"><span>Total · {count} {count === 1 ? 'item' : 'items'}</span><strong>${total.toFixed(2)}</strong></div>
      <p className="cart-note">One shared store. Always in sync.</p>
    </aside>
  )
}
