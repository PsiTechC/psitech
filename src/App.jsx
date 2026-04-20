import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Services from './components/Services'
import Capabilities from './components/Capabilities'
import Industries from './components/Industries'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProductPage from './pages/ProductPage'
import ProductsPage from './pages/ProductsPage'
import AboutPage from './pages/AboutPage'
import CapabilitiesPage from './pages/CapabilitiesPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import CareersPage from './pages/CareersPage'
import AdminCareers from './pages/AdminCareers'
import GlobalBackground from './components/GlobalBackground'
import './App.css'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const tryScroll = (attempt = 0) => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (attempt < 10) {
          setTimeout(() => tryScroll(attempt + 1), 60)
        }
      }
      tryScroll()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

function RevealOnScroll() {
  const { pathname } = useLocation()
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    const attach = () => {
      document
        .querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in')
        .forEach((el) => observer.observe(el))
    }
    attach()
    const timeout = setTimeout(attach, 120)
    return () => {
      clearTimeout(timeout)
      observer.disconnect()
    }
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <>
      <Hero />
      <About showJourney={false} />
      <Products />
      <Services />
      <Capabilities />
      <Industries />
      <Contact />
    </>
  )
}

function AppLayout() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      <GlobalBackground />
      <Preloader />
      <ScrollToTop />
      <RevealOnScroll />
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/capabilities" element={<CapabilitiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/admin/careers" element={<AdminCareers />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  )
}

function App() {
  return <AppLayout />
}

export default App
