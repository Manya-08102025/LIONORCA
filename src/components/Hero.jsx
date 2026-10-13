import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Sun, Moon, Menu, X, ChevronDown, Sparkles, MapPin, Phone } from 'lucide-react'

export default function Hero({ onOpenConsult }) {
  const { isDark, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  // Prevent background scrolling when menu drawer is open
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
    <section className="relative w-full h-screen h-[100dvh] overflow-hidden select-none">
      {/* =========================================================================
          BACKGROUND: FULL-BLEED VERTICAL IMAGE WITH SUBTLE GRADIENT OVERLAY
          - Stacked absolute images (Night on bottom, Day on top with opacity fade)
          - Subtle dark overlay (bg-black/40) for text legibility
      ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Night Image */}
        <img
          src="/images/hero-night.jpg"
          alt="Lionorca Luxury Interior at Night"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />

        {/* Day Image (Crossfades via Opacity) */}
        <img
          src="/images/hero-day.jpg"
          alt="Lionorca Luxury Interior in Daylight"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
            isDark ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
          decoding="async"
        />

        {/* Subtle dark gradient overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* =========================================================================
          MOBILE CANVAS INNER CONTAINER (Strictly 9:16 mobile width focus)
      ========================================================================= */}
      <div className="relative z-10 w-full h-full max-w-[430px] mx-auto">
        {/* -----------------------------------------------------------------------
            1. HEADER / NAVIGATION (Absolute Top)
            - flex justify-between items-start w-full px-6 pt-8 absolute top-0 left-0 z-10
            - Left: Lionorca logo
            - Right: Two 40x40px circular buttons (Theme Toggle & Hamburger)
        ----------------------------------------------------------------------- */}
        <div className="flex justify-between items-start w-full px-6 pt-8 absolute top-0 left-0 z-10">
          {/* Left Side: The Lionorca logo */}
          <div className="flex flex-col select-none">
            <span className="font-serif text-2xl tracking-[0.24em] font-medium text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] leading-none">
              LIONORCA
            </span>
            <span className="font-sans text-[7.5px] tracking-[0.38em] uppercase text-[#C5A059] mt-1 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              ARKITECHTURES
            </span>
          </div>

          {/* Right Side: Two circular icon buttons */}
          <div className="flex items-center gap-4">
            {/* Button 1 (Left Circle): Dark/Light Mode toggle icon (Sun/Moon) */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={isDark ? 'Switch to Daytime mode' : 'Switch to Nighttime mode'}
              title={isDark ? 'Switch to Daytime' : 'Switch to Nighttime'}
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-[#C5A059] flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 shadow-sm"
            >
              {isDark ? (
                <Moon size={18} className="stroke-[1.75]" />
              ) : (
                <Sun size={18} className="text-amber-300 stroke-[1.75]" />
              )}
            </button>

            {/* Button 2 (Right Circle): Hamburger menu icon for contents */}
            <button
              onClick={() => setMenuOpen(true)}
              type="button"
              aria-label="Open Navigation Menu"
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 shadow-sm"
            >
              <Menu size={18} className="stroke-[1.75]" />
            </button>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            2. MAIN TYPOGRAPHY / TAGLINE (Center Left)
            - Middle-left positioning over dark background shelving
            - Text: "the complete \n delivery of \n luxury" (Exact 3-line break)
            - Styling: Left-aligned, Serif font (Playfair Display)
            - Color: Muted Gold (#C5A059) with soft text-shadow
        ----------------------------------------------------------------------- */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full px-6 flex flex-col justify-center items-start z-10 pointer-events-none">
          <h1 className="font-serif text-[38px] xs:text-[42px] sm:text-[46px] font-normal text-[#C5A059] text-left leading-[1.18] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] select-none">
            the complete<br />
            delivery of<br />
            luxury
          </h1>
        </div>

        {/* -----------------------------------------------------------------------
            3. CALL TO ACTION (Absolute Bottom)
            - absolute bottom-10 w-full flex flex-col items-center gap-4
            - The Button: Large, wide solid gold button (CONSULT)
            - Shape: Pill-shaped (rounded-full), width approx 80%
            - Scroll Indicator: Minimalist thin downward-pointing chevron (bouncing subtly)
        ----------------------------------------------------------------------- */}
        <div className="absolute bottom-10 left-0 w-full flex flex-col items-center gap-4 z-10 px-6">
          <button
            onClick={onOpenConsult}
            type="button"
            aria-label="Consult with Lionorca"
            className="w-[80%] max-w-[340px] py-4 rounded-full bg-[#C5A059] hover:bg-[#b8934c] active:scale-95 text-neutral-950 font-sans font-bold tracking-[0.25em] text-sm uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.65)] hover:shadow-[0_6px_30px_rgba(197,160,89,0.45)] cursor-pointer text-center"
          >
            CONSULT
          </button>

          <a
            href="#turnkey"
            aria-label="Scroll to The Turnkey Advantage"
            className="text-white/80 hover:text-white transition-colors cursor-pointer p-1"
          >
            <ChevronDown size={22} className="stroke-[1.5] animate-bounce" />
          </a>
        </div>
      </div>

      {/* =========================================================================
          LUXURY FULLSCREEN MENU DRAWER (When Hamburger is Clicked)
      ========================================================================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-neutral-950/95 backdrop-blur-2xl text-neutral-100 p-6 sm:p-10 animate-in fade-in duration-300">
          {/* Top Bar inside Menu Drawer */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5 max-w-md mx-auto w-full">
            <div className="flex flex-col">
              <span className="text-xl font-serif tracking-[0.25em] font-medium text-white uppercase">
                LIONORCA
              </span>
              <span className="text-[8px] tracking-[0.38em] uppercase text-[#C5A059] font-sans -mt-0.5">
                ARKITECHTURES
              </span>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              type="button"
              aria-label="Close Navigation Menu"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
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
                Single-window accountability vs 50+ vendors.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-sans font-medium block mb-2">
                02
              </span>
              <a
                href="#architects"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-[#C5A059] transition-colors tracking-wide block"
              >
                Curated Regional Architects
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                5 handpicked local masterminds for ₹1Cr+ residences.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-sans font-medium block mb-2">
                03
              </span>
              <a
                href="#process"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-[#C5A059] transition-colors tracking-wide block"
              >
                5-Step Onboarding
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                From discovery to 5% advance & cut-to-cut quotation.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-sans font-medium block mb-2">
                04
              </span>
              <a
                href="#portfolio"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-[#C5A059] transition-colors tracking-wide block"
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
                Concierge Desk
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
