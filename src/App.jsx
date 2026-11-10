import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { ThemeProvider } from './hooks/useTheme'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import WorkWithUs from './pages/WorkWithUs'
import Footer from './components/Footer'
import LeadModal from './components/LeadModal'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import AdminApp from './admin/AdminApp'

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.toLowerCase()
      const search = window.location.search.toLowerCase()
      if (pathname.includes('/admin') || search.includes('page=admin') || search.includes('admin')) {
        return '/admin'
      }
      if (pathname.includes('/work-with-us') || pathname.includes('/partner') || search.includes('page=work-with-us') || search.includes('page=partner')) {
        return '/work-with-us'
      }
      return pathname
    }
    return '/'
  })

  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      if (
        window.location.pathname.toLowerCase().includes('/admin') ||
        window.location.search.toLowerCase().includes('admin') ||
        window.location.search.includes('nopreloader') ||
        window.location.search.includes('scroll') ||
        window.__SKIP_PRELOADER__
      ) {
        return false
      }
    }
    return true
  })

  const [isConsultOpen, setIsConsultOpen] = useState(false)
  const [selectedArchitect, setSelectedArchitect] = useState(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.toLowerCase()
      const search = window.location.search.toLowerCase()
      if (pathname.includes('/admin') || search.includes('page=admin') || search.includes('admin')) {
        setCurrentPath('/admin')
      } else if (pathname.includes('/work-with-us') || pathname.includes('/partner') || search.includes('page=work-with-us') || search.includes('page=partner')) {
        setCurrentPath('/work-with-us')
      } else {
        setCurrentPath(pathname)
      }
    }
    window.addEventListener('popstate', handleLocationChange)

    // Seamless SPA routing for internal navigation
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href) return

      if (href === '/admin' || href.startsWith('/admin')) {
        e.preventDefault()
        window.history.pushState({}, '', href)
        setCurrentPath('/admin')
        window.scrollTo({ top: 0, behavior: 'instant' })
      } else if (href === '/work-with-us' || href === '/partner') {
        e.preventDefault()
        window.history.pushState({}, '', href)
        setCurrentPath('/work-with-us')
        window.scrollTo({ top: 0, behavior: 'instant' })
      } else if (href === '/' || href === '#' || href === '/index.html' || href === 'index.html') {
        if (currentPath === '/work-with-us' || currentPath === '/admin') {
          e.preventDefault()
          window.history.pushState({}, '', '/')
          setCurrentPath('/')
          window.scrollTo({ top: 0, behavior: 'instant' })
        } else if (href === '/' || href === '/index.html' || href === 'index.html') {
          e.preventDefault()
          window.history.pushState({}, '', '/')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } else if (href.startsWith('/#') && (currentPath === '/work-with-us' || currentPath === '/admin')) {
        e.preventDefault()
        const hash = href.replace('/', '')
        window.history.pushState({}, '', '/' + hash)
        setCurrentPath('/')
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [currentPath])

  // ══════════════════════════════════════════════════════════
  // LENIS SMOOTH MOMENTUM SCROLL ENGINE (Disabled on /admin)
  // ══════════════════════════════════════════════════════════
  useEffect(() => {
    if (currentPath === '/admin' || currentPath.startsWith('/admin')) {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis
    if (typeof window !== 'undefined') window.lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [currentPath])

  // Pause Lenis momentum when modals are active
  useEffect(() => {
    if (!lenisRef.current) return
    if (isConsultOpen) {
      lenisRef.current.stop()
    } else {
      lenisRef.current.start()
    }
  }, [isConsultOpen])

  const handleOpenConsult = (architect = null) => {
    setSelectedArchitect(architect)
    setIsConsultOpen(true)
  }

  const handleCloseConsult = () => {
    setIsConsultOpen(false)
    setSelectedArchitect(null)
  }

  const handleNavigate = (path, hash = '') => {
    if (path === '/admin' || path.startsWith('/admin')) {
      window.history.pushState({}, '', '/admin')
      setCurrentPath('/admin')
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    if (path === '/work-with-us' || path === '/partner') {
      window.history.pushState({}, '', '/work-with-us')
      setCurrentPath('/work-with-us')
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    const targetUrl = hash ? `/${hash}` : '/'
    window.history.pushState({}, '', targetUrl)
    setCurrentPath('/')

    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // ══════════════════════════════════════════════════════════
  // RENDER ADMIN CMS PORTAL (SECURE & ISOLATED)
  // ══════════════════════════════════════════════════════════
  if (currentPath === '/admin' || currentPath.startsWith('/admin')) {
    return <AdminApp />
  }

  return (
    <ThemeProvider>
      {/* 1. Custom Splash Screen Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen bg-[#FCFCFA] text-charcoal font-sans selection:bg-champagne/20 selection:text-charcoal flex flex-col">
        {/* Sticky Header with Authentic Brand Logo */}
        <Navbar
          currentPath={currentPath}
          onOpenConsult={() => handleOpenConsult()}
          onNavigate={handleNavigate}
        />

        {/* ═══════════════════════════════════════════════════
            MAIN ROUTED VIEW
        ═══════════════════════════════════════════════════ */}
        <main className="flex-1">
          {currentPath === '/work-with-us' ? (
            <WorkWithUs />
          ) : (
            <Home onOpenConsult={handleOpenConsult} />
          )}
        </main>

        {/* Footer */}
        <Footer onOpenConsult={() => handleOpenConsult()} />

        {/* Lead Capture Modal */}
        <LeadModal
          isOpen={isConsultOpen}
          onClose={handleCloseConsult}
          preselectedArchitect={selectedArchitect}
        />

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </div>
    </ThemeProvider>
  )
}
