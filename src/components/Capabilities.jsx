import '../styles/Capabilities.css'

const capabilities = [
  { num: '01', title: 'Research & Development', desc: 'In-house R&D with domain experts in oceanography, embedded systems, signal processing, and defense electronics.', percent: 95 },
  { num: '02', title: 'Indigenous Manufacturing', desc: 'Made-in-India products aligned with Atmanirbhar Bharat — reducing dependency on foreign defense technology.', percent: 100 },
  { num: '03', title: 'System Integration', desc: 'Seamless integration with existing naval and army platforms, legacy systems, and NATO-standard interfaces.', percent: 90 },
  { num: '04', title: 'Data Analytics & AI', desc: 'Machine learning models for threat detection, predictive maintenance, and ocean pattern analysis.', percent: 92 },
  { num: '05', title: 'Ruggedized Engineering', desc: 'MIL-STD compliant hardware designed for extreme maritime and high-altitude conditions.', percent: 98 },
  { num: '06', title: '24/7 Support & Training', desc: 'Lifecycle support, field maintenance, and comprehensive training programs for defense personnel.', percent: 99 },
]

function Capabilities({ backgroundVideo = '' }) {
  const hasVideo = Boolean(backgroundVideo)

  return (
    <section id="capabilities" className={`section capabilities ${hasVideo ? 'has-video-bg' : ''}`}>
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
          <span className="section-tag">Our Strengths</span>
          <h2>Core <span className="accent">Capabilities</span></h2>
          <div className="section-line"></div>
        </div>
        <div className="cap-grid">
          {capabilities.map((cap, i) => (
            <div className="cap-card fade-in" key={cap.num} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="cap-head">
                <span className="cap-num">{cap.num}</span>
                <span className="cap-percent">{cap.percent}%</span>
              </div>
              <h3>{cap.title}</h3>
              <p>{cap.desc}</p>
              <div className="cap-bar">
                <div className="cap-fill" style={{ '--fill-width': `${cap.percent}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Capabilities
