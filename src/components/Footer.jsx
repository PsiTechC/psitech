import { Link } from 'react-router-dom'
import products from '../data/products'
import PsitechLogo from './PsitechLogo'
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-ambient" aria-hidden="true">
        <span className="fa-grid"></span>
        <span className="fa-glow fa-glow-1"></span>
        <span className="fa-glow fa-glow-2"></span>
        <span className="fa-scanline"></span>
      </div>
      <div className="container">
        {/* Top CTA */}
        <div className="footer-cta">
          <div>
            <h3>Ready to accelerate your intelligence operations?</h3>
            <p>Talk to our team about a scoped pilot tailored to your monitoring needs.</p>
          </div>
          <Link to="/contact" className="btn btn-primary footer-cta-btn">Start a Conversation</Link>
        </div>

        <div className="footer-grid">
          <div className="footer-brand footer-col">
            <Link to="/" className="logo">
              <PsitechLogo height={36} />
            </Link>
            <p>Pioneering satellite and open-source intelligence solutions that turn signal into decision-ready insight.</p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">in</a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">X</a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-link">YT</a>
            </div>
          </div>

          <div className="footer-links footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/capabilities">Capabilities</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>

          <div className="footer-links footer-col">
            <h4>Solutions</h4>
            <ul>
              {products.filter((p) => !p.hidden).map((p) => (
                <li key={p.id}><Link to={`/product/${p.id}`}>{p.title}</Link></li>
              ))}
              <li><Link to="/products">All Products</Link></li>
            </ul>
          </div>

          <div className="footer-links footer-col">
            <h4>Get In Touch</h4>
            <ul>
              <li><a href="mailto:admin@psitech.co.in">admin@psitech.co.in</a></li>
              <li><a href="tel:+912246178380">+91-22-4617-8380</a></li>
              <li><Link to="/contact">Request a Demo</Link></li>
              <li><Link to="/careers">Open Roles</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-certs">
          <span className="footer-certs-label">Certifications</span>
          <div className="footer-certs-row">
            <span className="footer-cert-pill">ISO 9001:2015</span>
            <span className="footer-cert-pill">ISO 27001</span>
            <span className="footer-cert-pill">CMMI Level 3</span>
            <span className="footer-cert-pill">DRDO Certified</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 PsiTech Consultancy Pvt Ltd. All Rights Reserved.</p>
          <p className="footer-note">Confidential information is not shared through this website. For secure communications, contact us through official channels.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
