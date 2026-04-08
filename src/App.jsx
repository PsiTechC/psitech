import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhyChooseUs from './components/WhyChooseUs'
import Products from './components/Products'
import Capabilities from './components/Capabilities'
import Industries from './components/Industries'
import Testimonials from './components/Testimonials'
import Partners from './components/Partners'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProductPage from './pages/ProductPage'
import CareersPage from './pages/CareersPage'
import AdminCareers from './pages/AdminCareers'
import GlobalBackground from './components/GlobalBackground'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    const els = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Hero />
      <About />
      <WhyChooseUs />
      <Products />
      <Capabilities />
      <Industries />
      <Testimonials />
      <Certifications />
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
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
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
