import { useSelector } from 'react-redux'
import { selectCartCount } from './features/cart/cartSlice.js'
import ProductList from './components/ProductList.jsx'
import Cart from './components/Cart.jsx'

function Header() {
  // This separate component reads the same cart state as Cart.
  const count = useSelector(selectCartCount)

  return (
    <header className="header">
      <a className="brand" href="#"><span className="brand-mark" aria-hidden="true">l.</span>little store<span className="brand-dot">.</span></a>
      <div className="header-right"><span className="demo-label">A Redux Toolkit demo</span><a className="header-cart" href="#cart-heading">Cart <span>{count}</span></a></div>
    </header>
  )
}

function StatePreview() {
  const cart = useSelector((state) => state.cart)

  return (
    <details className="state-preview">
      <summary><span><span className="live-dot" /> Peek inside the store</span><code>state.cart</code></summary>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </details>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <section className="intro">
          <p className="eyebrow"><span /> SMALL SHOP, BIG IDEAS</p>
          <h1>Good things.<br /><span>Shared state.</span></h1>
          <p>A tiny shop to explore Redux Toolkit. Add something you like<br className="desktop-break" /> and see how one action brings every component together.</p>
          <div className="lesson-tag"><span aria-hidden="true">✳</span> Made for learning. Built with React + Redux Toolkit.</div>
        </section>
        <div className="shop-layout"><ProductList /><Cart /></div>
        <section className="lesson" aria-labelledby="lesson-heading">
          <div className="lesson-intro"><p className="eyebrow">UNDER THE HOOD</p><h2 id="lesson-heading">One click. A simple flow.</h2><p>Try adding an item, then follow the data.</p></div>
          <ol className="flow">
            <li><span className="step">1</span><div><h3>Dispatch an action</h3><p>A button tells Redux what happened.</p><code>dispatch(itemAdded(product))</code></div></li>
            <li><span className="step">2</span><div><h3>Update the state</h3><p>The slice reducer updates the cart.</p><code>state.items.push(…)</code></div></li>
            <li><span className="step">3</span><div><h3>Update the UI</h3><p>Selectors read the new shared state.</p><code>useSelector(selectCartCount)</code></div></li>
          </ol>
        </section>
        <StatePreview />
      </main>
      <footer><span>Little store. A small start to something bigger.</span><span>React <span className="footer-plus">+</span> Redux Toolkit</span></footer>
    </div>
  )
}