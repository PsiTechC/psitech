import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import products from '../data/products'
import PsitechLogo from './PsitechLogo'
import '../styles/Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

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

  return (
    <header id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeAll}>
          <PsitechLogo height={34} />
        </Link>
        <nav>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><NavLink to="/" end onClick={closeAll}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={closeAll}>About</NavLink></li>

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
                  <p>Explore our intelligence product portfolio</p>
                </div>
                <div className="dropdown-grid">
                  {products.filter((p) => !p.hidden).map((p) => (
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
                  <Link to="/products" className="dropdown-all" onClick={closeAll}>
                    View All Products &rarr;
                  </Link>
                </div>
              </div>
            </li>

            <li><NavLink to="/capabilities" onClick={closeAll}>Capabilities</NavLink></li>
            <li><NavLink to="/services" onClick={closeAll}>Services</NavLink></li>
            <li><NavLink to="/careers" onClick={closeAll}>Careers</NavLink></li>
            <li><NavLink to="/contact" onClick={closeAll}>Contact</NavLink></li>
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
