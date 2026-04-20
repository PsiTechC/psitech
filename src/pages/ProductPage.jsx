import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../data/products'
import ProductHeroVisual from '../components/ProductHeroVisual'
import '../styles/ProductPage.css'

const fallbackProductContent = {
  description: 'This intelligence module is designed for continuous monitoring, event detection, and structured analysis across multiple data sources. It is built for fast deployment and analyst-friendly workflows.\n\nThe platform combines secure data ingestion, model-driven enrichment, and operational dashboards so teams can move from raw signal to actionable decisions with confidence.',
  features: [
    'Real-time event monitoring pipeline',
    'Cross-source intelligence fusion',
    'Role-based access and secure audit trails',
    'Alerting and escalation workflows',
    'Interactive analyst dashboard',
    'API-first integration layer',
  ],
  advantages: [
    {
      title: 'Faster Operational Decisions',
      desc: 'Prioritized alerts and structured outputs reduce analyst triage time and improve response speed for mission workflows.',
    },
    {
      title: 'Scalable Architecture',
      desc: 'Modular services and cloud-native deployment patterns support pilot programs and large-scale enterprise rollouts.',
    },
    {
      title: 'Analyst-Centric UX',
      desc: 'Clear visual cues, concise summaries, and drill-down context help teams validate findings quickly.',
    },
    {
      title: 'Low Integration Friction',
      desc: 'Standards-based APIs and export formats integrate with existing SIEM, GIS, and BI tools with minimal customization.',
    },
  ],
  uses: [
    'Strategic risk and scenario monitoring',
    'Infrastructure and project activity tracking',
    'Operational readiness and incident awareness',
    'Supply-chain and vendor intelligence',
    'Regional trend and anomaly detection',
    'Executive briefing and decision support',
  ],
  specs: [
    { label: 'Deployment', value: 'Cloud or single-tenant' },
    { label: 'Latency', value: '< 60 seconds' },
    { label: 'Users', value: 'Role-based multi-team access' },
    { label: 'Security', value: 'Encryption in transit and at rest' },
    { label: 'API', value: 'REST + webhook support' },
    { label: 'Exports', value: 'CSV, JSON, GeoJSON' },
  ],
}

const particleStyles = Array.from({ length: 40 }, (_, i) => ({
  left: `${(i * 17) % 100}%`,
  top: `${(i * 29) % 100}%`,
  animationDelay: `${((i * 7) % 40) / 10}s`,
  animationDuration: `${3 + ((i * 11) % 35) / 10}s`,
}))

function ProductPage() {
  const { productId } = useParams()
  const product = products.find((p) => p.id === productId)
  const [activeTabByProduct, setActiveTabByProduct] = useState({})
  const activeTab = activeTabByProduct[productId] || 'overview'

  const descriptionText = product?.description?.trim()
    ? product.description
    : fallbackProductContent.description
  const features = product?.features?.length
    ? product.features
    : fallbackProductContent.features
  const advantages = product?.advantages?.length
    ? product.advantages
    : fallbackProductContent.advantages
  const uses = product?.uses?.length
    ? product.uses
    : fallbackProductContent.uses
  const specs = product?.specs?.length
    ? product.specs
    : fallbackProductContent.specs

  const specFillWidths = specs.map((_, i) => `${55 + ((i * 13 + 7) % 45)}%`)

  const handleTabChange = (tabId) => {
    setActiveTabByProduct((prev) => {
      if (prev[productId] === tabId) return prev
      return { ...prev, [productId]: tabId }
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08 }
    )

    const timer = setTimeout(() => {
      document
        .querySelectorAll('.product-page .fade-in, .product-page .fade-in-left, .product-page .fade-in-right, .product-page .scale-in')
        .forEach((el) => observer.observe(el))
    }, 50)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [productId, activeTab])

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

  return (
    <div className="product-page">
      {/* HERO */}
      <section className="pp-hero" style={{ background: product.heroImage }}>
        <div className="pp-hero-overlay"></div>
        <div className="pp-hero-grid-lines"></div>
        <div className="pp-hero-particles">
          {particleStyles.map((style, i) => (
            <div className="pp-dot" key={i} style={{
              left: style.left,
              top: style.top,
              animationDelay: style.animationDelay,
              animationDuration: style.animationDuration,
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
                <a href="#pp-cta" className="btn btn-primary">Request a Demo</a>
                <Link to="/contact" className="btn btn-outline">Talk to Sales</Link>
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
          {[...features, ...features, ...features].map((f, i) => (
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
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="pp-tab-content">
              <div className="pp-ov-description fade-in">
                {descriptionText.split('\n\n').filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="pp-key-features fade-in">
                <div className="pp-kf-header">
                  <span className="pp-kf-tag">// Capabilities</span>
                  <h3>Key <span className="accent">Features</span></h3>
                </div>
                <div className="pp-kf-grid">
                  {features.map((f, i) => (
                    <div
                      className="pp-kf-card fade-in"
                      key={i}
                      style={{ transitionDelay: `${i * 0.05}s` }}
                    >
                      <span className="pp-kf-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="pp-kf-text">{f}</span>
                      <span className="pp-kf-corner"></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ADVANTAGES TAB */}
          {activeTab === 'advantages' && (
            <div className="pp-tab-content">
              <div className="pp-adv-grid">
                {advantages.map((adv, i) => (
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
                {uses.map((use, i) => (
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
                {specs.map((spec, i) => (
                  <div className="pp-spec-card fade-in" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                    <div className="pp-spec-label">{spec.label}</div>
                    <div className="pp-spec-value">{spec.value}</div>
                    <div className="pp-spec-bar">
                      <div className="pp-spec-fill" style={{ width: specFillWidths[i] }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pp-cta" id="pp-cta">
        <div className="container">
          <div className="pp-cta-inner fade-in">
            <h2>Ready to Deploy <span className="accent">{product.title}</span>?</h2>
            <p>Talk to our intelligence team for a live demo, technical deep-dive, or a scoped pilot tailored to your monitoring needs.</p>
            <div className="pp-cta-btns">
              <Link to="/contact" className="btn btn-primary">Request a Demo</Link>
              <Link to="/contact" className="btn btn-outline">Download Brochure</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default ProductPage
