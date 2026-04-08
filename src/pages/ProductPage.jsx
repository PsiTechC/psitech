import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../data/products'
import ProductHeroVisual from '../components/ProductHeroVisual'
import '../styles/ProductPage.css'

function ProductPage() {
  const { productId } = useParams()
  const product = products.find((p) => p.id === productId)
  const [activeTab, setActiveTab] = useState('overview')
  const statsRef = useRef(null)

  useEffect(() => {
    setActiveTab('overview')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08 }
    )
    setTimeout(() => {
      document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in')
        .forEach((el) => observer.observe(el))
    }, 100)
    return () => observer.disconnect()
  }, [productId])

  if (!product) {
    return (
      <section className="pp-not-found">
        <div className="container">
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </section>
    )
  }

  const otherProducts = products.filter((p) => p.id !== productId)

  return (
    <div className="product-page">
      {/* HERO */}
      <section className="pp-hero" style={{ background: product.heroImage }}>
        <div className="pp-hero-overlay"></div>
        <div className="pp-hero-grid-lines"></div>
        <div className="pp-hero-particles">
          {[...Array(40)].map((_, i) => (
            <div className="pp-dot" key={i} style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s`,
            }} />
          ))}
        </div>
        <div className="container pp-hero-content">
          <div className="pp-hero-grid">
            <div className="pp-hero-left">
              <Link to="/" className="pp-back">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
                Back to Home
              </Link>
              <div className="pp-hero-badge">
                <span className="pp-badge-icon">{product.icon}</span>
                {product.title}
              </div>
              <h1>{product.tagline}</h1>
              <p className="pp-hero-sub">{product.shortDesc}</p>
              <div className="pp-hero-actions">
                <a href="#pp-video" className="btn btn-primary">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8 5v14l11-7z"/></svg>
                  Watch Demo
                </a>
                <a href="#pp-cta" className="btn btn-outline">Request Quote</a>
              </div>
            </div>
            <div className="pp-hero-right">
              <ProductHeroVisual product={product} />
            </div>
          </div>
        </div>
        <div className="pp-hero-fade"></div>
      </section>

      {/* FEATURES MARQUEE */}
      <section className="pp-marquee">
        <div className="pp-marquee-track">
          {[...product.features, ...product.features, ...product.features].map((f, i) => (
            <span className="pp-mt-item" key={i}><span className="pp-mt-dot"></span>{f}</span>
          ))}
        </div>
      </section>

      {/* TABBED CONTENT AREA */}
      <section className="pp-tabs-section section">
        <div className="container">
          <div className="pp-tab-nav fade-in">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'advantages', label: 'Advantages' },
              { id: 'uses', label: 'Applications' },
              { id: 'specs', label: 'Specifications' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`pp-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="pp-tab-content">
              <div className="pp-overview-grid">
                <div className="pp-ov-text fade-in">
                  {product.description.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <div className="pp-ov-sidebar fade-in">
                  <div className="pp-ov-card">
                    <div className="pp-ov-icon-big">{product.icon}</div>
                    <div className="pp-ov-rings">
                      <div className="pp-ring r1"></div>
                      <div className="pp-ring r2"></div>
                      <div className="pp-ring r3"></div>
                    </div>
                  </div>
                  <div className="pp-feature-list">
                    <h4>Key Features</h4>
                    {product.features.map((f, i) => (
                      <div className="pp-fl-item" key={i}>
                        <span className="pp-fl-num">{String(i + 1).padStart(2, '0')}</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ADVANTAGES TAB */}
          {activeTab === 'advantages' && (
            <div className="pp-tab-content">
              <div className="pp-adv-grid">
                {product.advantages.map((adv, i) => (
                  <div className="pp-adv-card fade-in" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                    <div className="pp-adv-num">{String(i + 1).padStart(2, '0')}</div>
                    <h3>{adv.title}</h3>
                    <p>{adv.desc}</p>
                    <div className="pp-adv-glow"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* USES TAB */}
          {activeTab === 'uses' && (
            <div className="pp-tab-content">
              <div className="pp-uses-grid">
                {product.uses.map((use, i) => (
                  <div className="pp-use-card fade-in" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                    <div className="pp-use-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span>{use}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SPECS TAB */}
          {activeTab === 'specs' && (
            <div className="pp-tab-content">
              <div className="pp-specs-grid">
                {product.specs.map((spec, i) => (
                  <div className="pp-spec-card fade-in" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                    <div className="pp-spec-label">{spec.label}</div>
                    <div className="pp-spec-value">{spec.value}</div>
                    <div className="pp-spec-bar">
                      <div className="pp-spec-fill" style={{ width: `${55 + Math.random() * 45}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="pp-video-section section" id="pp-video">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-tag">Product Demo</span>
            <h2>See It In <span className="accent">Action</span></h2>
            <div className="section-line"></div>
          </div>
          <div className="pp-video-wrap fade-in">
            <div className="pp-video-frame">
              <div className="pp-video-placeholder">
                <div className="pp-play-ring">
                  <div className="pp-play-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <h3>Product Demonstration</h3>
                <p>Watch the {product.title} in action</p>
              </div>
            </div>
            <div className="pp-video-meta">
              <div className="pp-vm-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <div><strong>5-8 min</strong><span>Duration</span></div>
              </div>
              <div className="pp-vm-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><path d="m23 7-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
                <div><strong>Field Demo</strong><span>Live testing footage</span></div>
              </div>
              <div className="pp-vm-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <div><strong>Unclassified</strong><span>Public release</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pp-cta" id="pp-cta">
        <div className="container">
          <div className="pp-cta-inner fade-in">
            <h2>Ready to Deploy <span className="accent">{product.title}</span>?</h2>
            <p>Contact our defense solutions team for a detailed consultation, product demonstration, or custom requirements discussion.</p>
            <div className="pp-cta-btns">
              <Link to="/#contact" className="btn btn-primary">Request a Demo</Link>
              <Link to="/#contact" className="btn btn-outline">Download Brochure</Link>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER PRODUCTS */}
      <section className="pp-related section">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-tag">Explore More</span>
            <h2>Other <span className="accent">Solutions</span></h2>
            <div className="section-line"></div>
          </div>
          <div className="pp-related-grid">
            {otherProducts.map((p) => (
              <Link to={`/product/${p.id}`} className="pp-rel-card fade-in" key={p.id}>
                <span className="pp-rel-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.tagline}</p>
                <span className="pp-rel-link">Explore &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductPage
