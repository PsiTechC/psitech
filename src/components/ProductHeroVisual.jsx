import '../styles/ProductHeroVisual.css'

function ProductHeroVisual({ product }) {
  return (
    <div className="phv">
      {/* Central icon */}
      <div className="phv-center">
        <div className="phv-icon-ring">
          <div className="phv-icon-ring r2"></div>
          <div className="phv-icon-ring r3"></div>
          <span className="phv-icon">{product.icon}</span>
        </div>
      </div>

      {/* Orbiting feature nodes */}
      <div className="phv-orbit phv-orbit-1">
        {product.features.slice(0, 4).map((f, i) => (
          <div
            className="phv-node"
            key={i}
            style={{
              '--angle': `${i * 90}deg`,
              '--delay': `${i * 0.5}s`,
            }}
          >
            <span className="phv-node-dot"></span>
            <span className="phv-node-label">{f}</span>
          </div>
        ))}
      </div>

      <div className="phv-orbit phv-orbit-2">
        {product.features.slice(4, 8).map((f, i) => (
          <div
            className="phv-node phv-node-sm"
            key={i}
            style={{
              '--angle': `${i * 90 + 45}deg`,
              '--delay': `${i * 0.7}s`,
            }}
          >
            <span className="phv-node-dot green"></span>
          </div>
        ))}
      </div>

      {/* Data beams */}
      <svg className="phv-beams" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,212,255,0)" />
            <stop offset="50%" stopColor="rgba(0,212,255,0.3)" />
            <stop offset="100%" stopColor="rgba(0,212,255,0)" />
          </linearGradient>
          <linearGradient id="beam2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,255,136,0)" />
            <stop offset="50%" stopColor="rgba(0,255,136,0.2)" />
            <stop offset="100%" stopColor="rgba(0,255,136,0)" />
          </linearGradient>
        </defs>
        <line x1="200" y1="200" x2="50" y2="80" stroke="url(#beam1)" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="0;-16" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="200" y1="200" x2="350" y2="100" stroke="url(#beam1)" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="0;-16" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="200" y1="200" x2="80" y2="340" stroke="url(#beam2)" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="0;-16" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="200" y1="200" x2="330" y2="310" stroke="url(#beam2)" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="0;-16" dur="2.2s" repeatCount="indefinite" />
        </line>
      </svg>

      {/* Floating stat badges */}
      <div className="phv-badge phv-badge-1">
        <span className="phvb-dot"></span>
        <span>{product.specs[0]?.label}: <strong>{product.specs[0]?.value}</strong></span>
      </div>
      <div className="phv-badge phv-badge-2">
        <span className="phvb-dot green"></span>
        <span>{product.specs[1]?.label}: <strong>{product.specs[1]?.value}</strong></span>
      </div>
      <div className="phv-badge phv-badge-3">
        <span className="phvb-dot purple"></span>
        <span>{product.specs[2]?.label}: <strong>{product.specs[2]?.value}</strong></span>
      </div>
    </div>
  )
}

export default ProductHeroVisual
