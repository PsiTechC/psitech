import { Link } from 'react-router-dom'
import products from '../data/products'
import PsitechLogo from './PsitechLogo'
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Top CTA */}
        <div className="footer-cta">
          <div>
            <h3>Ready to strengthen India's defense capabilities?</h3>
            <p>Let's build the future of indigenous defense technology together.</p>
          </div>
          <a href="#contact" className="btn btn-primary">Start a Conversation</a>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <PsitechLogo size={32} />
              <span className="logo-text">Psitech</span>
            </Link>
            <p>Pioneering defense, maritime, and technology consultancy solutions. Building indigenous capabilities for a stronger India.</p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn" className="social-link">in</a>
              <a href="#" aria-label="Twitter" className="social-link">X</a>
              <a href="#" aria-label="YouTube" className="social-link">YT</a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#capabilities">Capabilities</a></li>
              <li><a href="#industries">Industries</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Solutions</h4>
            <ul>
              {products.map((p) => (
                <li key={p.id}><Link to={`/product/${p.id}`}>{p.title}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Security Policy</a></li>
              <li><a href="#">Export Compliance</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 PsiTech Consultancy Pvt Ltd All Rights Reserved.</p>
          <p className="footer-note">Classified information is not shared through this website. For secure communications, contact us through official defense channels.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
