import '../styles/Services.css'

const services = [
  {
    title: 'Web Development',
    desc: 'Our web engineers turn your ideas into production-grade platforms — scalable, secure, and built to jump-start your business.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M2 8h20" />
        <circle cx="5" cy="5.5" r="0.5" fill="currentColor" />
        <circle cx="7" cy="5.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Mobile Apps',
    desc: 'We define your mobility roadmap and deliver apps whose architecture aligns with your existing stack and future business outlook.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <line x1="10" y1="18" x2="14" y2="18" />
      </svg>
    ),
  },
  {
    title: 'Custom Software Development',
    desc: 'We ship tailor-made products engineered around the exact workflows, data, and scale your organisation runs on.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
]

function Services({ backgroundVideo = '' }) {
  const hasVideo = Boolean(backgroundVideo)

  return (
    <section id="services" className={`section services-section ${hasVideo ? 'has-video-bg' : ''}`}>
      {hasVideo && (
        <>
          <div className="section-video-bg">
            <video autoPlay muted loop playsInline preload="metadata">
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
          <div className="section-video-overlay"></div>
        </>
      )}
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-tag">Our Services</span>
          <h2>Our <span className="accent">Services</span></h2>
          <div className="section-line"></div>
          <p className="services-intro">
            There are hardly any products and services as efficient and innovatively
            customised for the client as ours. Every client presents a unique challenge —
            our services create value by identifying weak areas and delivering insight into
            what is happening in your organisation, driving growth in the most challenging
            environments.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div
              className="service-card fade-in"
              key={s.title}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="service-icon-wrap">
                <span className="service-icon-pulse"></span>
                <span className="service-icon-ring"></span>
                <span className="service-icon">{s.icon}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="service-corner"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
