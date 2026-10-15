import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Sun, Moon, Menu, X, Sparkles, MapPin, Phone } from 'lucide-react'

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
    <section className="relative w-full h-screen h-[100dvh] overflow-hidden select-none bg-[#0a0a0a]">
      {/* =========================================================================
          BACKGROUND: AUTHENTIC ARCHITERIORS RESIDENCE INTERIOR
          - Full-bleed vertical image provided by user (hero-bg.png)
          - Supports smooth Day/Night theme ambiance lighting transition
      ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-bg.png"
          alt="Lionorca Architeriors Luxury Interior"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${
            isDark ? 'brightness-100 contrast-100' : 'brightness-110 contrast-95'
          }`}
          loading="eager"
          decoding="async"
        />

        {/* Ambient lighting overlay for daylight vs twilight mood */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
            isDark ? 'bg-black/20' : 'bg-amber-100/10'
          }`}
        />
      </div>

      {/* =========================================================================
          MOBILE CANVAS INNER CONTAINER (Strictly 9:16 mobile framing)
      ========================================================================= */}
      <div className="relative z-10 w-full h-full max-w-[430px] mx-auto flex flex-col justify-between">
        {/* -----------------------------------------------------------------------
            1. HEADER / NAVIGATION (Absolute Top)
            - Left: Authentic Lionorca Architeriors Logo
            - Right: Two Circular Buttons (Dark Mode Toggle + Contents Drawer)
        ----------------------------------------------------------------------- */}
        <div className="flex justify-between items-center w-full px-5 pt-7 absolute top-0 left-0 z-20">
          {/* Left Side: Lionorca Architeriors Brand Logo */}
          <a href="#" className="block select-none hover:opacity-95 transition-opacity">
            <img
              src="/images/logo-transparent.png"
              alt="LIONORCA ARCHITERIORS - the complete delivery of luxury"
              className="h-14 sm:h-16 w-auto max-w-[210px] sm:max-w-[240px] object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
              onError={(e) => {
                // Fallback in case of image load delay
                e.target.style.display = 'none'
                const fallback = document.getElementById('logo-text-fallback')
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            {/* Fallback Typographical Logo */}
            <div id="logo-text-fallback" className="hidden flex-col">
              <span className="font-serif text-2xl tracking-[0.22em] font-medium text-[#D2A337] uppercase leading-none">
                LIONORCA
              </span>
              <span className="font-sans text-[7.5px] tracking-[0.38em] uppercase text-white/80 mt-1">
                ARCHITERIORS
              </span>
            </div>
          </a>

          {/* Right Side: Two Solid Circular Buttons (Dark Mode & Contents) */}
          <div className="flex items-center gap-3">
            {/* Button 1 (Left Circle): Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Dark Mode Active (Click for Light)' : 'Light Mode Active (Click for Dark)'}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E0E0E0] hover:bg-white text-neutral-900 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.4)] active:scale-95"
            >
              {isDark ? (
                <Moon size={18} className="fill-neutral-900 text-neutral-900" />
              ) : (
                <Sun size={20} className="fill-amber-500 text-amber-500" />
              )}
            </button>

            {/* Button 2 (Right Circle): Contents / Hamburger Menu */}
            <button
              onClick={() => setMenuOpen(true)}
              type="button"
              aria-label="Open Contents Menu"
              title="Contents"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E0E0E0] hover:bg-white text-neutral-900 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.4)] active:scale-95"
            >
              <Menu size={20} className="stroke-[2.2] text-neutral-900" />
            </button>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            2. MAIN TYPOGRAPHY / TAGLINE (Center Left)
            - Exact 3-line break: "the complete \n delivery of \n luxury"
            - Serif typography in warm golden ochre (#D2A337)
            - Positioned over dark shelving and wood paneling
        ----------------------------------------------------------------------- */}
        <div className="absolute top-[36%] -translate-y-1/2 left-0 w-full px-6 z-10 pointer-events-none">
          <h1 className="font-serif text-[42px] xs:text-[46px] sm:text-[50px] font-normal text-[#D2A337] text-left leading-[1.12] tracking-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] select-none">
            the complete<br />
            delivery of<br />
            luxury
          </h1>
        </div>

        {/* -----------------------------------------------------------------------
            3. CALL TO ACTION & SCROLL CHEVRON (Absolute Bottom)
            - Wide solid gold pill button with "CONSULT" in serif all caps
            - Thin white "V" scroll indicator underneath
        ----------------------------------------------------------------------- */}
        <div className="absolute bottom-9 left-0 w-full flex flex-col items-center gap-3 z-10 px-6">
          <button
            onClick={onOpenConsult}
            type="button"
            aria-label="Consult with Lionorca Architeriors"
            className="w-[84%] max-w-[340px] py-4 rounded-full bg-[#D2A337] hover:bg-[#c2932b] active:scale-95 text-neutral-950 font-serif font-medium text-2xl tracking-[0.08em] uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.7)] cursor-pointer text-center"
          >
            CONSULT
          </button>

          {/* Minimalist White "V" Scroll Indicator */}
          <a
            href="#turnkey"
            aria-label="Scroll to explore contents"
            className="text-white/95 hover:text-white transition-colors cursor-pointer text-xl font-serif font-light leading-none animate-bounce pt-1"
          >
            V
          </a>
        </div>
      </div>

      {/* =========================================================================
          CONTENTS DRAWER (Triggered by the Right Circle Button)
      ========================================================================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-neutral-950/95 backdrop-blur-2xl text-neutral-100 p-6 sm:p-10 animate-in fade-in duration-300">
          {/* Top Bar inside Contents Drawer */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5 max-w-md mx-auto w-full">
            <div className="flex flex-col">
              <span className="text-xl font-serif tracking-[0.25em] font-medium text-[#D2A337] uppercase">
                LIONORCA
              </span>
              <span className="text-[8px] tracking-[0.38em] uppercase text-white/80 font-sans -mt-0.5">
                ARCHITERIORS • CONTENTS
              </span>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              type="button"
              aria-label="Close Contents Menu"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          {/* Contents List */}
          <nav className="my-auto py-8 space-y-6 max-w-md mx-auto w-full text-left">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D2A337] font-sans font-medium block mb-1">
                01
              </span>
              <a
                href="#turnkey"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-[#D2A337] transition-colors tracking-wide block"
              >
                The Turnkey Advantage.
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                Single-window accountability vs 50+ vendors.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D2A337] font-sans font-medium block mb-1">
                02
              </span>
              <a
                href="#architects"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-[#D2A337] transition-colors tracking-wide block"
              >
                Curated Regional Architects
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                5 handpicked local masterminds for ₹1Cr+ residences.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D2A337] font-sans font-medium block mb-1">
                03
              </span>
              <a
                href="#process"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-[#D2A337] transition-colors tracking-wide block"
              >
                5-Step Onboarding Process
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                Discovery, matchmaking, 5% advance & cut-to-cut quotation.
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D2A337] font-sans font-medium block mb-1">
                04
              </span>
              <a
                href="#portfolio"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-[#D2A337] transition-colors tracking-wide block"
              >
                Portfolio & Budget Tiers
              </a>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                Filter by budget tiers and aesthetic styles.
              </p>
            </div>
          </nav>

          {/* Drawer Footer Actions */}
          <div className="border-t border-white/10 pt-6 space-y-4 max-w-md mx-auto w-full">
            <button
              onClick={() => {
                setMenuOpen(false)
                onOpenConsult()
              }}
              type="button"
              className="w-full py-4 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-[#D2A337] hover:bg-[#c2932b] text-neutral-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              <Sparkles size={16} />
              <span>Schedule Consultation</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 font-sans pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#D2A337]" />
                Indore, MP
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={12} className="text-[#D2A337]" />
                Concierge Desk
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
