import '../styles/GlobeVisual.css'

function GlobeVisual() {
  return (
    <div className="globe-container">
      {/* Stars Background */}
      <div className="globe-stars">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="g-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Globe */}
      <div className="globe-sphere">
        {/* Globe Surface with Grid */}
        <svg className="globe-svg" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          {/* Outer glow */}
          <defs>
            <radialGradient id="globeGrad" cx="40%" cy="35%" r="50%">
              <stop offset="0%" stopColor="rgba(0,85,184,0.08)" />
              <stop offset="60%" stopColor="rgba(0,85,184,0.03)" />
              <stop offset="100%" stopColor="rgba(0,85,184,0)" />
            </radialGradient>
            <radialGradient id="globeEdge" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(0,85,184,0.15)" />
            </radialGradient>
            <clipPath id="globeClip">
              <circle cx="250" cy="250" r="200" />
            </clipPath>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="bigGlow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Globe base circle */}
          <circle cx="250" cy="250" r="200" fill="rgba(10,22,40,0.9)" stroke="rgba(0,85,184,0.12)" strokeWidth="1" />
          <circle cx="250" cy="250" r="200" fill="url(#globeGrad)" />
          <circle cx="250" cy="250" r="200" fill="url(#globeEdge)" />

          {/* Latitude lines */}
          <g clipPath="url(#globeClip)" opacity="0.15" stroke="rgba(0,85,184,0.5)" strokeWidth="0.5" fill="none">
            <ellipse cx="250" cy="250" rx="200" ry="30" />
            <ellipse cx="250" cy="200" rx="185" ry="25" />
            <ellipse cx="250" cy="150" rx="155" ry="20" />
            <ellipse cx="250" cy="300" rx="185" ry="25" />
            <ellipse cx="250" cy="350" rx="155" ry="20" />
            <ellipse cx="250" cy="100" rx="110" ry="14" />
            <ellipse cx="250" cy="400" rx="110" ry="14" />
          </g>

          {/* Longitude lines */}
          <g clipPath="url(#globeClip)" opacity="0.12" stroke="rgba(0,85,184,0.5)" strokeWidth="0.5" fill="none">
            <ellipse cx="250" cy="250" rx="30" ry="200" />
            <ellipse cx="250" cy="250" rx="80" ry="200" />
            <ellipse cx="250" cy="250" rx="130" ry="200" />
            <ellipse cx="250" cy="250" rx="170" ry="200" />
          </g>

          {/* India landmass (simplified) */}
          <g clipPath="url(#globeClip)">
            <path
              d="M280,195 L295,200 L305,215 L310,230 L315,250 L310,270 L305,285 L295,300 L285,320 L280,335 L275,345 L270,340 L265,325 L260,310 L255,300 L250,290 L248,280 L250,265 L255,250 L258,240 L260,225 L265,210 L270,200 Z"
              fill="rgba(0,85,184,0.12)"
              stroke="rgba(0,85,184,0.35)"
              strokeWidth="1"
            />
            {/* Sri Lanka */}
            <ellipse cx="282" cy="350" rx="6" ry="10" fill="rgba(0,85,184,0.1)" stroke="rgba(0,85,184,0.3)" strokeWidth="0.5" />
          </g>

          {/* Indian Ocean area highlight */}
          <g clipPath="url(#globeClip)">
            <ellipse cx="285" cy="310" rx="80" ry="40" fill="rgba(0,85,184,0.03)" stroke="rgba(0,85,184,0.06)" strokeWidth="0.5" strokeDasharray="4 4">
              <animateTransform attributeName="transform" type="rotate" from="0 285 310" to="360 285 310" dur="30s" repeatCount="indefinite" />
            </ellipse>
          </g>

          {/* Data points on India */}
          <g filter="url(#glow)">
            {/* New Delhi */}
            <circle cx="275" cy="220" r="3" fill="#0055b8">
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Mumbai */}
            <circle cx="258" cy="275" r="2.5" fill="#10b981">
              <animate attributeName="r" values="2.5;4;2.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            {/* Chennai */}
            <circle cx="280" cy="315" r="2" fill="#0055b8">
              <animate attributeName="r" values="2;3.5;2" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Kochi */}
            <circle cx="265" cy="325" r="2" fill="#f59e0b">
              <animate attributeName="r" values="2;3.5;2" dur="2.8s" repeatCount="indefinite" />
            </circle>
            {/* Vizag (Naval base) */}
            <circle cx="285" cy="290" r="2.5" fill="#0055b8">
              <animate attributeName="r" values="2.5;4;2.5" dur="2.2s" repeatCount="indefinite" />
            </circle>
            {/* Andaman */}
            <circle cx="320" cy="300" r="2" fill="#a855f7">
              <animate attributeName="r" values="2;3;2" dur="2.7s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Radar pulse from Delhi */}
          <circle cx="275" cy="220" r="5" fill="none" stroke="rgba(0,85,184,0.4)" strokeWidth="1">
            <animate attributeName="r" values="5;40;80" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="275" cy="220" r="5" fill="none" stroke="rgba(0,85,184,0.3)" strokeWidth="0.5">
            <animate attributeName="r" values="5;40;80" dur="3s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.15;0" dur="3s" begin="1s" repeatCount="indefinite" />
          </circle>

          {/* Data connection lines */}
          <g stroke="rgba(0,85,184,0.2)" strokeWidth="0.5" strokeDasharray="3 3">
            <line x1="275" y1="220" x2="258" y2="275">
              <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="275" y1="220" x2="285" y2="290">
              <animate attributeName="stroke-dashoffset" values="0;-12" dur="2.5s" repeatCount="indefinite" />
            </line>
            <line x1="275" y1="220" x2="280" y2="315">
              <animate attributeName="stroke-dashoffset" values="0;-12" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="285" y1="290" x2="320" y2="300">
              <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Ocean data buoy markers */}
          <g>
            {[
              [220, 330], [200, 360], [240, 370], [180, 340],
              [310, 360], [330, 340], [350, 320], [300, 380],
              [250, 390], [160, 310],
            ].map(([x, y], i) => (
              <g key={i}>
                <rect x={x - 2} y={y - 2} width="4" height="4" fill="rgba(16,185,129,0.3)" transform={`rotate(45 ${x} ${y})`}>
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </rect>
              </g>
            ))}
          </g>

          {/* Globe edge highlight */}
          <circle cx="250" cy="250" r="200" fill="none" stroke="rgba(0,85,184,0.2)" strokeWidth="1.5" />
        </svg>

        {/* Orbital Rings */}
        <div className="orbit orbit-1">
          <div className="satellite sat-1">
            <div className="sat-body"></div>
            <div className="sat-signal"></div>
          </div>
        </div>
        <div className="orbit orbit-2">
          <div className="satellite sat-2">
            <div className="sat-body"></div>
          </div>
        </div>
        <div className="orbit orbit-3">
          <div className="satellite sat-3">
            <div className="sat-body"></div>
            <div className="sat-signal"></div>
          </div>
        </div>
      </div>

      {/* Floating Data Panels */}
      <div className="g-panel g-panel-1">
        <div className="gp-header">
          <span className="gp-dot live"></span>
          <span>FLEET STATUS</span>
        </div>
        <div className="gp-row"><span>INS Vikrant</span><span className="gp-val green">ACTIVE</span></div>
        <div className="gp-row"><span>INS Kolkata</span><span className="gp-val green">ACTIVE</span></div>
        <div className="gp-row"><span>INS Arihant</span><span className="gp-val blue">PATROL</span></div>
      </div>

      <div className="g-panel g-panel-2">
        <div className="gp-header">
          <span className="gp-dot"></span>
          <span>OCEAN DATA</span>
        </div>
        <div className="gp-metric">
          <span className="gp-metric-val">28.4°C</span>
          <span className="gp-metric-label">Sea Temp (IOR)</span>
        </div>
        <div className="gp-bar-wrap">
          <div className="gp-bar">
            <div className="gp-bar-fill" style={{ width: '72%' }}></div>
          </div>
          <span className="gp-bar-label">Sensor Coverage 72%</span>
        </div>
      </div>

      <div className="g-panel g-panel-3">
        <div className="gp-header">
          <span className="gp-dot orange"></span>
          <span>THREAT LEVEL</span>
        </div>
        <div className="gp-threat">
          <span className="gp-threat-val">LOW</span>
          <div className="gp-threat-bars">
            <span className="tb active"></span>
            <span className="tb"></span>
            <span className="tb"></span>
            <span className="tb"></span>
            <span className="tb"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobeVisual
