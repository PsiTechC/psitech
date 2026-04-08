import '../styles/Partners.css'

const partners = [
  'Indian Navy', 'Indian Army', 'DRDO', 'Indian Coast Guard',
  'ISRO', 'BEL', 'HAL', 'Indian Air Force',
  'NIOT', 'INCOIS', 'Naval Dockyard', 'Ministry of Defence',
]

function Partners() {
  return (
    <section className="partners">
      <div className="container">
        <p className="partners-label">Trusted by India's Premier Defense Organizations</p>
        <div className="partners-track-wrap">
          <div className="partners-track">
            {[...partners, ...partners].map((name, i) => (
              <div className="partner-item" key={i}>
                <div className="partner-logo-box">
                  <span>{name.split(' ').map(w => w[0]).join('')}</span>
                </div>
                <span className="partner-name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partners
