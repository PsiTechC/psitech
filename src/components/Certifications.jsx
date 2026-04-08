import '../styles/Certifications.css'

const certs = [
  { name: 'ISO 9001:2015', desc: 'Quality Management' },
  { name: 'ISO 27001', desc: 'Information Security' },
  { name: 'MIL-STD-810G', desc: 'Military Standard' },
  { name: 'Make in India', desc: 'Indigenous Manufacturing' },
  { name: 'DRDO Certified', desc: 'Defense Research' },
  { name: 'BIS Approved', desc: 'Bureau of Standards' },
]

function Certifications() {
  return (
    <section className="certifications">
      <div className="container">
        <div className="cert-inner">
          <div className="cert-left">
            <span className="section-tag">Certifications</span>
            <h3>Trusted & <span className="accent">Certified</span></h3>
            <p>Every product meets the most rigorous international and national defense quality standards.</p>
          </div>
          <div className="cert-grid">
            {certs.map((cert) => (
              <div className="cert-card" key={cert.name}>
                <span className="cert-name">{cert.name}</span>
                <span className="cert-desc">{cert.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certifications
