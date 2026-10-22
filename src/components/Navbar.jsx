import { useState, useEffect } from 'react'
import { Menu, X, Sparkles, MapPin, Phone } from 'lucide-react'

export default function Navbar({ onOpenConsult }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll state and scroll progress for subtle luxury progress line
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

  return (
    <>
      {/* =========================================================================
          SLIM WHITE LUXURY NAVBAR
          - Crisp pure white background so the logo and contents button are 100% visible
          - Eliminates any washing off against the bright interior photo
      ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/98 backdrop-blur-md border-b border-stone-200/80 text-stone-900 ${
          isScrolled ? 'shadow-md' : 'shadow-xs'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Authentic Lionorca Brand Logo (Prominent and crisp against pure white) */}
          <a href="#" className="block select-none hover:opacity-90 transition-opacity">
            <img
              src="/images/lionorca-logo-transparent.png"
              alt="LIONORCA ARCHITERIORS"
              className="h-10 sm:h-12 w-auto object-contain"
              onError={(e) => {
                e.target.src = '/images/lionorca-full-logo.jpg'
              }}
            />
          </a>

          {/* Contents Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              type="button"
              aria-label="Open Contents Menu"
              title="Contents"
              className="h-9 px-3 sm:h-10 sm:px-3.5 rounded-full border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-900 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-xs"
            >
              <Menu size={17} className="stroke-[2.2] text-stone-900" />
              <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-stone-800">
                Contents
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Champagne Gold Reading Progress Line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AC55] via-[#F5D58A] to-[#B88D38] transition-all duration-75 pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* =========================================================================
          LUXURY FULLSCREEN MENU DRAWER (Pure White Luxury Theme)
      ========================================================================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-white/98 backdrop-blur-2xl text-stone-900 p-6 sm:p-10 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-stone-200 pb-5 max-w-md mx-auto w-full">
            <a href="#" className="block select-none">
              <img
                src="/images/lionorca-logo-transparent.png"
                alt="LIONORCA ARCHITERIORS"
                className="h-9 sm:h-11 w-auto object-contain"
                onError={(e) => {
                  e.target.src = '/images/lionorca-full-logo.jpg'
                }}
              />
            </a>

            <button
              onClick={() => setMenuOpen(false)}
              type="button"
              aria-label="Close Navigation Menu"
              className="w-10 h-10 rounded-full border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="my-auto py-8 space-y-6 max-w-md mx-auto w-full text-left">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E651E] font-sans font-bold block mb-2">
                01
              </span>
              <a
                href="#turnkey"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-stone-900 hover:text-[#8E651E] transition-colors tracking-wide block font-bold"
              >
                The Problem & Promise
              </a>
              <p className="text-xs text-stone-500 mt-1 font-sans">
                Designer designs, contractor executes, nobody owns the outcome. LA owns it end to end.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E651E] font-sans font-bold block mb-2">
                02
              </span>
              <a
                href="#architects"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-stone-900 hover:text-[#8E651E] transition-colors tracking-wide block font-bold"
              >
                Featured Architects
              </a>
              <p className="text-xs text-stone-500 mt-1 font-sans">
                Handpicked architects from Indore, Mumbai & Delhi.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E651E] font-sans font-bold block mb-2">
                03
              </span>
              <a
                href="#process"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-stone-900 hover:text-[#8E651E] transition-colors tracking-wide block font-bold"
              >
                How It Works (5 Steps)
              </a>
              <p className="text-xs text-stone-500 mt-1 font-sans">
                Discovery, architect selection, design lock token, and turnkey execution.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E651E] font-sans font-bold block mb-2">
                04
              </span>
              <a
                href="#houses"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-stone-900 hover:text-[#8E651E] transition-colors tracking-wide block font-bold"
              >
                Signature Projects
              </a>
              <p className="text-xs text-stone-500 mt-1 font-sans">
                Villas, penthouses, and bungalows.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E651E] font-sans font-bold block mb-2">
                05
              </span>
              <a
                href="#media"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-stone-900 hover:text-[#8E651E] transition-colors tracking-wide block font-bold"
              >
                Media & Insights
              </a>
              <p className="text-xs text-stone-500 mt-1 font-sans">
                Podcasts, reels, and site-education videos.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E651E] font-sans font-bold block mb-2">
                06
              </span>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-stone-900 hover:text-[#8E651E] transition-colors tracking-wide block font-bold"
              >
                Discovery Session
              </a>
              <p className="text-xs text-stone-500 mt-1 font-sans">
                Book a consultation or chat on WhatsApp.
              </p>
            </div>
          </nav>

          <div className="border-t border-stone-200 pt-6 space-y-4 max-w-md mx-auto w-full">
            <button
              onClick={() => {
                setMenuOpen(false)
                onOpenConsult()
              }}
              type="button"
              className="w-full py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] text-neutral-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 border border-[#B3872E]/30"
            >
              <Sparkles size={16} />
              <span>Schedule Consultation</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#8E651E]" />
                Indore, MP
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={12} className="text-[#8E651E]" />
                Call Us: +91 98930 00000
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
