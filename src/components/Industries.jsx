import '../styles/Industries.css'

const industries = [
  { icon: '⚓', title: 'Indian Navy', desc: 'IoT systems, ocean intelligence, fleet management, and underwater communication for naval operations.', color: '#0055b8' },
  { icon: '★', title: 'Indian Army', desc: 'Tactical networks, battlefield sensors, secure communications, and command platforms for land forces.', color: '#10b981' },
  { icon: '🛡️', title: 'Indian Coast Guard', desc: 'Coastal surveillance, vessel tracking, search & rescue systems, and maritime border security solutions.', color: '#f59e0b' },
  { icon: '✈', title: 'Indian Air Force', desc: 'Navigation systems, data link integration, airfield monitoring sensors, and weather intelligence.', color: '#8b5cf6' },
  { icon: '🔬', title: 'DRDO & Research', desc: 'Collaborative R&D projects, prototype development, and technology transfer with defense research organizations.', color: '#f472b6' },
  { icon: '🚢', title: 'Maritime & Shipping', desc: 'Commercial vessel monitoring, port management systems, and shipping lane intelligence solutions.', color: '#fbbf24' },
]

function Industries() {
  return (
    <section id="industries" className="section industries">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-tag">Who We Serve</span>
          <h2>Industries & <span className="accent">Sectors</span></h2>
          <div className="section-line"></div>
        </div>
        <div className="ind-grid">
          {industries.map((ind, i) => (
            <div className="ind-card fade-in" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="ind-icon-ring" style={{ '--ring-color': ind.color }}>
                <span className="ind-icon">{ind.icon}</span>
              </div>
              <h3>{ind.title}</h3>
              <p>{ind.desc}</p>
              <div className="ind-line" style={{ background: ind.color }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Industries
