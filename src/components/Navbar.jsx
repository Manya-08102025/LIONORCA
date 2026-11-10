import { useState, useEffect } from 'react'
import { X, Sparkles, MapPin, Phone } from 'lucide-react'

export default function Navbar({ onOpenConsult, onNavigate, currentPath }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll state and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  // Close menu drawer with subpage detection:
  // If on a subpage (like /work-with-us), closing the drawer via cross (X) returns to the homepage
  const handleCloseMenu = (e) => {
    e?.preventDefault?.()
    setMenuOpen(false)

    const isSubpage =
      currentPath === '/work-with-us' ||
      (typeof window !== 'undefined' &&
        (window.location.pathname.toLowerCase().includes('/work-with-us') ||
          window.location.pathname.toLowerCase().includes('/partner') ||
          window.location.search.toLowerCase().includes('page=work-with-us') ||
          window.location.search.toLowerCase().includes('page=partner')))

    if (isSubpage) {
      if (onNavigate) {
        onNavigate('/', '')
      } else {
        window.history.pushState({}, '', '/')
        window.dispatchEvent(new PopStateEvent('popstate'))
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
  }

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        handleCloseMenu(e)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen, currentPath])

  const handleNavClick = (href, e) => {
    setMenuOpen(false)
    if (!href) return

    if (onNavigate) {
      e?.preventDefault()
      if (href === '/' || href === '/index.html' || href === 'index.html') {
        onNavigate('/', '')
      } else if (href.startsWith('/#')) {
        onNavigate('/', href.replace('/', ''))
      } else {
        onNavigate(href, '')
      }
      return
    }

    // Direct browser fallback
    if (href === '/' || href === '/index.html' || href === 'index.html') {
      e?.preventDefault()
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState({}, '', '/')
        window.dispatchEvent(new PopStateEvent('popstate'))
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (href.startsWith('/#')) {
      const hash = href.replace('/', '')
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        e?.preventDefault()
        window.history.pushState({}, '', '/' + hash)
        window.dispatchEvent(new PopStateEvent('popstate'))
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      } else {
        const el = document.querySelector(hash)
        if (el) {
          e?.preventDefault()
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
      return
    }

    if (href === '/work-with-us' || href === '/partner') {
      e?.preventDefault()
      window.history.pushState({}, '', href)
      window.dispatchEvent(new PopStateEvent('popstate'))
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
  }

  const navItems = [
    { num: '01', href: '/', label: 'Home', desc: 'Return to the main overview and philosophy.' },
    { num: '02', href: '/#turnkey', label: 'The Problem & Promise', desc: 'LA unifies design and execution under one contract.' },
    { num: '03', href: '/#architects', label: 'Featured Architects', desc: 'Handpicked architects from Indore, Mumbai & Delhi.' },
    { num: '04', href: '/#process', label: 'How It Works', desc: 'Discovery, architect selection, design lock, and turnkey execution.' },
    { num: '05', href: '/#houses', label: 'Signature Projects', desc: 'Villas, penthouses, and bungalows.' },
    { num: '06', href: '/#media', label: 'Media & Insights', desc: 'Podcasts, reels, and site-education videos.' },
    { num: '07', href: '/#contact', label: 'Discovery Session', desc: 'Book a consultation or chat on WhatsApp.' },
  ]

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          CLEAN WHITE EDITORIAL NAVBAR
      ═══════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-300 bg-white border-b ${
          isScrolled
            ? 'border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
            : 'border-gray-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-18 sm:h-20 flex items-center justify-between">
          {/* Authentic Lionorca Brand Logo (Visibly larger on mobile & desktop) */}
          <a
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className="flex items-center select-none hover:opacity-90 transition-opacity py-1 cursor-pointer"
          >
            <img
              src="/images/lionorca-logo-transparent.png"
              alt="LIONORCA ARCHITERIORS"
              className="h-12 sm:h-14 w-auto object-contain max-h-[58px]"
              onError={(e) => {
                e.target.src = '/images/lionorca-full-logo.jpg'
              }}
            />
          </a>

          {/* Minimalist Circular Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(true)}
            type="button"
            aria-label="Open Navigation Menu"
            className="w-10 h-10 rounded-full border border-gray-300 hover:border-black bg-white flex flex-col items-center justify-center gap-[3px] p-2 transition-all cursor-pointer active:scale-95 shadow-xs shrink-0"
          >
            <span className="w-4 h-[1px] bg-black block" />
            <span className="w-4 h-[1px] bg-black block" />
            <span className="w-4 h-[1px] bg-black block" />
          </button>
        </div>

        {/* Dynamic Champagne Gold Reading Progress Line */}
        {isScrolled && (
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-champagne transition-all duration-75 pointer-events-none"
            style={{ width: `${scrollProgress}%` }}
          />
        )}
      </header>

      {/* ═══════════════════════════════════════════════════
          FULLSCREEN MENU DRAWER (GPU Accelerated Native CSS)
      ═══════════════════════════════════════════════════ */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-alabaster text-charcoal p-4 sm:p-6 lg:p-7 animate-fade-in overflow-y-auto max-h-screen">
          {/* Header row */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-ash max-w-5xl mx-auto w-full shrink-0">
            <a
              href="/"
              onClick={(e) => handleNavClick('/', e)}
              className="block select-none cursor-pointer"
            >
              <img
                src="/images/lionorca-logo-transparent.png"
                alt="LIONORCA ARCHITERIORS"
                className="h-8 sm:h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.src = '/images/lionorca-full-logo.jpg'
                }}
              />
            </a>

            <button
              onClick={handleCloseMenu}
              type="button"
              aria-label="Close Navigation Menu"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-ash hover:bg-greige text-charcoal flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <X size={17} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="my-auto py-2 sm:py-3 max-w-lg mx-auto w-full">
            <div className="space-y-2 sm:space-y-2.5 lg:space-y-3">
              {navItems.map((item, i) => (
                <div
                  key={item.num}
                  className="animate-slide-left"
                  style={{ animationDelay: `${50 + i * 30}ms` }}
                >
                  <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-champagne font-sans font-semibold block leading-none mb-0.5">
                    {item.num}
                  </span>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="text-base sm:text-xl lg:text-[22px] font-serif text-charcoal hover:text-champagne transition-colors tracking-wide block font-light leading-snug cursor-pointer"
                  >
                    {item.label}
                  </a>
                  <p className="text-[11px] sm:text-xs text-charcoal-muted font-sans font-light leading-none mt-0.5 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </nav>

          {/* Bottom Consultation CTA & Work With Us / Vendor Portal */}
          <div className="border-t border-ash pt-3 sm:pt-3.5 space-y-2 max-w-lg mx-auto w-full shrink-0">
            <button
              onClick={() => {
                setMenuOpen(false)
                onOpenConsult?.()
              }}
              type="button"
              className="w-full py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase bg-charcoal hover:bg-champagne text-alabaster transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
            >
              <Sparkles size={14} />
              <span>Schedule Consultation</span>
            </button>

            {/* Subtle Secondary Work With Us / Vendor Portal Link/Pill */}
            <a
              href="/work-with-us"
              onClick={(e) => handleNavClick('/work-with-us', e)}
              className="w-full py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.14em] uppercase border border-ash hover:border-charcoal hover:bg-greige text-charcoal transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Work With Us / Vendor Portal</span>
            </a>

            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-charcoal-light font-sans pt-0.5">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-champagne" />
                Indore, MP
              </span>
              <a
                href="tel:+919755667695"
                className="flex items-center gap-1.5 hover:text-champagne transition-colors"
              >
                <Phone size={12} className="text-champagne" />
                Call Us: +91 97556 67695
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
