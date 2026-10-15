import { useState, useEffect } from 'react'
import { Menu, X, Sparkles, MapPin, Phone } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../hooks/useTheme'

export default function Navbar({ onOpenConsult }) {
  const { isDark } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Only reveal the sticky header once scrolled past the mobile Hero screen
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
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

  if (!isScrolled && !menuOpen) {
    return null
  }

  return (
    <>
      {/* =========================================================================
          STICKY HEADER (Only appears when scrolling past Hero screen)
      ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-md border-b ${
          isDark
            ? 'bg-neutral-950/85 border-white/10 text-white'
            : 'bg-white/90 border-neutral-200 text-neutral-900 shadow-sm'
        }`}
      >
        <div className="max-w-md sm:max-w-lg md:max-w-xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Authentic Lionorca Brand Logo */}
          <a href="#" className="block select-none hover:opacity-95 transition-opacity">
            <img
              src="/images/lionorca-logo-transparent.png"
              alt="LIONORCA ARCHITERIORS"
              className="h-10 sm:h-11 w-auto max-w-[180px] object-contain drop-shadow-sm"
              onError={(e) => {
                e.target.src = '/images/lionorca-logo.png'
              }}
            />
          </a>

          {/* Header Controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={() => setMenuOpen(true)}
              type="button"
              aria-label="Open Navigation Menu"
              className="w-10 h-10 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              <Menu size={18} className="stroke-[1.75]" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          LUXURY FULLSCREEN MENU DRAWER
      ========================================================================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-neutral-950/95 backdrop-blur-2xl text-neutral-100 p-6 sm:p-10 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-5 max-w-md mx-auto w-full">
            <a href="#" className="block select-none">
              <img
                src="/images/lionorca-logo-transparent.png"
                alt="LIONORCA ARCHITERIORS"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.src = '/images/lionorca-logo.png'
                }}
              />
            </a>

            <button
              onClick={() => setMenuOpen(false)}
              type="button"
              aria-label="Close Navigation Menu"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="my-auto py-8 space-y-6 max-w-md mx-auto w-full text-left">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-sans font-medium block mb-2">
                01
              </span>
              <a
                href="#turnkey"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-[#C5A059] transition-colors tracking-wide block"
              >
                The Turnkey Advantage.
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                One dedicated team for your complete home — zero stress.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-sans font-medium block mb-2">
                02
              </span>
              <a
                href="#process"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-[#C5A059] transition-colors tracking-wide block"
              >
                How It Works (5 Steps)
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                From your first chat to unlocking your finished home.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-sans font-medium block mb-2">
                03
              </span>
              <a
                href="#houses"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-[#C5A059] transition-colors tracking-wide block"
              >
                House & Interior Designs
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                Explore house layouts and interior styles.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-sans font-medium block mb-2">
                04
              </span>
              <a
                href="#architects"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-[#C5A059] transition-colors tracking-wide block"
              >
                Top Architects
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                Indore's top architects and their portfolio work.
              </p>
            </div>
          </nav>

          <div className="border-t border-white/10 pt-6 space-y-4 max-w-md mx-auto w-full">
            <button
              onClick={() => {
                setMenuOpen(false)
                onOpenConsult()
              }}
              type="button"
              className="w-full py-4 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-[#C5A059] hover:bg-[#b8934c] text-neutral-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              <Sparkles size={16} />
              <span>Schedule Consultation</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 font-sans pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#C5A059]" />
                Indore, MP
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={12} className="text-[#C5A059]" />
                Call Us: +91 98930 00000
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
