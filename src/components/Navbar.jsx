import { useState, useEffect } from 'react'
import { Menu, X, Sparkles, MessageCircle, Phone, MapPin } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../hooks/useTheme'

export default function Navbar({ onOpenConsult }) {
  const { isDark } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  // Prevent body scroll when mobile menu drawer is open
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
          MINIMALIST HEADER (Strictly required UI elements: Logo, Theme, Hamburger)
      ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between pointer-events-auto">
          {/* Lionorca Brand Logo (Top Left) */}
          <a href="#" className="flex flex-col group select-none">
            <span className="text-xl sm:text-2xl font-serif tracking-[0.28em] font-medium text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Lionorca
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.38em] uppercase text-amber-400 font-sans -mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              Arkitechtures
            </span>
          </a>

          {/* Header Controls (Theme Toggle & Clean Hamburger Menu) */}
          <div className="flex items-center gap-3">
            {/* Day / Night Theme Toggle */}
            <ThemeToggle />

            {/* Clean Minimalist Hamburger Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              type="button"
              aria-label="Open Navigation Menu"
              className="w-10 h-10 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 shadow-sm"
            >
              <Menu size={20} className="stroke-[1.75]" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          LUXURY FULLSCREEN MENU DRAWER
      ========================================================================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-neutral-950/95 backdrop-blur-xl text-neutral-100 p-6 sm:p-10 animate-in fade-in duration-300">
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex flex-col">
              <span className="text-xl font-serif tracking-[0.25em] font-medium text-white uppercase">
                Lionorca
              </span>
              <span className="text-[8px] tracking-[0.35em] uppercase text-amber-400 font-sans -mt-0.5">
                Arkitechtures
              </span>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              type="button"
              aria-label="Close Navigation Menu"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="my-auto py-8 space-y-6 max-w-md mx-auto w-full">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-sans font-medium block mb-2">
                01
              </span>
              <a
                href="#turnkey"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-amber-400 transition-colors tracking-wide block"
              >
                The Turnkey Advantage
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                Single-window accountability vs 50+ vendors.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-sans font-medium block mb-2">
                02
              </span>
              <a
                href="#architects"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-amber-400 transition-colors tracking-wide block"
              >
                Curated Regional Architects
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                5 handpicked local masterminds for ₹1Cr+ residences.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-sans font-medium block mb-2">
                03
              </span>
              <a
                href="#process"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-amber-400 transition-colors tracking-wide block"
              >
                5-Step Onboarding
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                From discovery to 5% advance & cut-to-cut quotation.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-sans font-medium block mb-2">
                04
              </span>
              <a
                href="#portfolio"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-amber-400 transition-colors tracking-wide block"
              >
                Portfolio Catalog
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                Filter by budget tiers and aesthetic styles.
              </p>
            </div>
          </nav>

          {/* Footer inside Drawer */}
          <div className="border-t border-white/10 pt-6 space-y-4 max-w-md mx-auto w-full">
            <button
              onClick={() => {
                setMenuOpen(false)
                onOpenConsult()
              }}
              type="button"
              className="w-full py-4 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              <Sparkles size={16} />
              <span>Schedule Consultation</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 font-sans pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-amber-400" />
                Indore, MP
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={12} className="text-amber-400" />
                Concierge Desk
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
