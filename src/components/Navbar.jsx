import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import products from '../data/products'
import PsitechLogo from './PsitechLogo'
import '../styles/Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const closeAll = () => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }

  const navLink = (href, label) => {
    if (isHome) {
      return <a href={href} onClick={closeAll}>{label}</a>
    }
    return <Link to={`/${href}`} onClick={closeAll}>{label}</Link>
  }

  return (
    <header id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeAll}>
          <PsitechLogo size={32} />
          <span className="logo-text">Psitech</span>
        </Link>
        <nav>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li>{navLink('#home', 'Home')}</li>
            <li>{navLink('#about', 'About')}</li>

            {/* Products Dropdown */}
            <li className="dropdown" ref={dropdownRef}>
              <button
                className="dropdown-toggle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
              >
                Products <span className={`arrow ${dropdownOpen ? 'open' : ''}`}>&#9662;</span>
              </button>
              <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                <div className="dropdown-header">
                  <span className="dropdown-tag">Our Solutions</span>
                  <p>Explore our defense & maritime product portfolio</p>
                </div>
                <div className="dropdown-grid">
                  {products.map((p) => (
                    <Link
                      to={`/product/${p.id}`}
                      className="dropdown-item"
                      key={p.id}
                      onClick={closeAll}
                    >
                      <span className="dropdown-item-icon">{p.icon}</span>
                      <div>
                        <span className="dropdown-item-title">{p.title}</span>
                        <span className="dropdown-item-desc">{p.tagline}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="dropdown-footer">
                  {isHome ? (
                    <a href="#products" className="dropdown-all" onClick={closeAll}>
                      View All Products &rarr;
                    </a>
                  ) : (
                    <Link to="/#products" className="dropdown-all" onClick={closeAll}>
                      View All Products &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </li>

            <li>{navLink('#capabilities', 'Capabilities')}</li>
            <li>{navLink('#industries', 'Industries')}</li>
            <li><Link to="/careers" onClick={closeAll}>Careers</Link></li>
            <li>{navLink('#contact', 'Contact')}</li>
          </ul>
        </nav>
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
