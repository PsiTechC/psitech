import { Link } from 'react-router-dom'
import products from '../data/products'
import '../styles/Products.css'

function Products() {
  return (
    <section id="products" className="section products-section">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-tag">What We Build</span>
          <h2>Products & <span className="accent">Solutions</span></h2>
          <div className="section-line"></div>
          <p className="section-subtitle">Cutting-edge defense technology engineered for India's security forces</p>
        </div>
        <div className="products-grid">
          {products.filter((p) => !p.hidden).map((product, i) => (
            <Link
              to={`/product/${product.id}`}
              className="product-card fade-in"
              key={product.id}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="pc-glow"></div>
              <div className="pc-top">
                <div className="pc-icon-wrap">
                  <span className="pc-icon">{product.icon}</span>
                </div>
                <span className="pc-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </span>
              </div>
              <h3>{product.title}</h3>
              <p className="pc-tagline">{product.tagline}</p>
              <p className="pc-desc">{product.shortDesc}</p>
              <div className="pc-features">
                {product.features.slice(0, 3).map((f, j) => (
                  <span className="pc-feature" key={j}>
                    <span className="pc-fdot"></span> {f}
                  </span>
                ))}
              </div>
              <span className="pc-link">View Full Details</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
