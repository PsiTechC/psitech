import '../styles/Industries.css'

const industries = [
  {
    title: 'AI',
    desc: 'Machine learning, computer vision, and NLP models that turn raw data into decision-ready insight.',
    color: '#F5A623',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    title: 'Drone',
    desc: 'Autonomous UAV platforms for mapping, inspection, and real-time aerial intelligence at scale.',
    color: '#10b981',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="2.2" />
        <circle cx="5" cy="5" r="2.2" />
        <circle cx="19" cy="5" r="2.2" />
        <circle cx="5" cy="19" r="2.2" />
        <circle cx="19" cy="19" r="2.2" />
        <path d="M6.5 6.5l4 4M17.5 6.5l-4 4M6.5 17.5l4-4M17.5 17.5l-4-4" />
      </svg>
    ),
  },
  {
    title: 'Defence',
    desc: 'Ruggedised sensor networks, mission software, and secure communications for defence operations.',
    color: '#3b82f6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'IoT',
    desc: 'Edge devices, gateways, and cloud platforms for end-to-end connected product deployments.',
    color: '#a855f7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="2" />
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14" />
      </svg>
    ),
  },
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
            <div className="ind-card fade-in" key={ind.title} style={{ transitionDelay: `${i * 0.08}s` }}>
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
