import { useDispatch } from 'react-redux'
import { itemAdded } from '../features/cart/cartSlice.js'

// Static catalog data does not need to live in Redux.
const products = [
  { id: 'notebook', name: 'Everyday notebook', price: 12 },
  { id: 'mug', name: 'Slow morning mug', price: 18 },
  { id: 'tote', name: 'Go-to tote', price: 24 },
]

function ProductArt({ id }) {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      {id === 'notebook' && <>
        <rect x="57" y="24" width="90" height="119" rx="5" fill="#d1a173" transform="rotate(9 102 84)" />
        <rect x="49" y="19" width="90" height="119" rx="5" fill="#83a58e" transform="rotate(-7 94 79)" />
        <path d="M59 23 45 132" stroke="#557c64" strokeWidth="5" />
        <path d="m122 18-14 118" stroke="#e8dbc0" strokeWidth="3" />
        <path d="m73 57 40 5m-41 3 29 4" stroke="#eaf0e8" strokeWidth="2" />
      </>}
      {id === 'mug' && <>
        <ellipse cx="101" cy="139" rx="54" ry="6" fill="#dbc2ad" opacity=".45" />
        <path d="M135 60h10c35 0 34 47 1 47h-12" fill="none" stroke="#bc7954" strokeWidth="13" />
        <path d="M53 48h86v56c0 45-86 45-86 0Z" fill="#c88862" />
        <ellipse cx="96" cy="48" rx="43" ry="10" fill="#dfad88" />
        <ellipse cx="96" cy="48" rx="34" ry="5" fill="#85573e" />
        <path d="M66 66v36c0 13 5 18 11 21" fill="none" stroke="#dda27d" strokeWidth="4" strokeLinecap="round" />
      </>}
      {id === 'tote' && <>
        <path d="M75 57V39a25 25 0 0 1 50 0v18" fill="none" stroke="#9b8565" strokeWidth="8" />
        <path d="m55 50-8 91q52 9 106 0l-8-91Z" fill="#cbb997" />
        <path d="M76 52v14m48-14v14" stroke="#9b8565" strokeWidth="6" />
        <path d="m57 58-5 77m90-77 5 77" stroke="#ddcdb1" strokeWidth="2" />
        <path d="M86 93h28m-14-14v28" stroke="#6f7354" strokeWidth="3" />
        <path d="M82 114h36" stroke="#9b8565" strokeWidth="2" />
      </>}
    </svg>
  )
}

export default function ProductList() {
  const dispatch = useDispatch()

  return (
    <section className="catalog" aria-labelledby="products-heading">
      <div className="section-heading">
        <h2 id="products-heading">The everyday collection</h2>
        <span>3 simple essentials</span>
      </div>
      <div className="product-grid">
        {products.map((product, index) => (
          <article className="product-card" key={product.id}>
            <div className={`product-art ${product.id}`}>
              <span className="product-number">0{index + 1}</span>
              <ProductArt id={product.id} />
            </div>
            <h3>{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="add-button" onClick={() => dispatch(itemAdded(product))}>
              <span aria-hidden="true">＋</span> Add to cart<span className="sr-only">: {product.name}</span>
            </button>
          </article>
        ))}
      </div>
      <p className="catalog-note"><span aria-hidden="true">↳</span> Every “Add to cart” dispatches an <code>itemAdded</code> action.</p>
    </section>
  )
}
