import '../styles/WhyChooseUs.css'

const reasons = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: 'Military-Grade Quality',
    desc: 'Every product certified to MIL-STD-810G and JSS-55555, engineered for the harshest operational environments.',
    gradient: 'var(--gradient-accent)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Atmanirbhar Bharat',
    desc: '100% indigenous design & manufacturing. Zero dependency on foreign defense tech — complete technology sovereignty.',
    gradient: 'linear-gradient(135deg, #0088e0, #0055b8)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4m0 14v4m-9.2-6.8 2.8-2.8M17.4 6.6l2.8-2.8m0 16.4-2.8-2.8M6.6 6.6 3.8 3.8M1 12h4m14 0h4"/>
      </svg>
    ),
    title: 'AI-Powered Intelligence',
    desc: 'Deep learning models trained on 10+ years of defense data for predictive analytics, threat detection & autonomous operations.',
    gradient: 'var(--gradient-purple)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
      </svg>
    ),
    title: 'Real-Time Command',
    desc: 'Live dashboards providing unified operational pictures from fleet-level to soldier-level, enabling faster decision-making.',
    gradient: 'var(--gradient-warm)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Expert Team',
    desc: '200+ engineers with deep domain expertise in oceanography, embedded systems, signal processing & defense electronics.',
    gradient: 'linear-gradient(135deg, #f472b6, #ec4899)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: '24/7 Mission Support',
    desc: 'Round-the-clock support with dedicated defense liaison teams, ensuring zero downtime during critical operations.',
    gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
  },
]

function WhyChooseUs() {
  return (
    <section className="section why-choose">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-tag">Our Edge</span>
          <h2>Why Choose <span className="accent">PsiTech</span></h2>
          <div className="section-line"></div>
        </div>
        <div className="why-grid">
          {reasons.map((r, i) => (
            <div className="why-card fade-in" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="why-icon" style={{ background: r.gradient }}>
                {r.icon}
              </div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <div className="why-shine"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
