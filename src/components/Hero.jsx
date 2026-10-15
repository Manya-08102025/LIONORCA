import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Sun, Moon, Menu, X, ChevronLeft, ChevronRight, Sparkles, MapPin, Phone } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    image: '/images/hero-bg.png',
    tag: "INDIA'S FIRST LUXURY TURNKEY AGGREGATOR",
    quote: "Introducing India's first all-inclusive turnkey aggregator*",
    description: "the complete delivery of luxury — from spatial blueprints to flawless key handover.",
    ctaText: "CONSULT",
    action: "consult",
  },
  {
    id: 2,
    image: '/images/hero-kitchen.jpg',
    tag: "SINGLE POINT OF ACCOUNTABILITY",
    quote: "Eliminating 50+ vendors. One accountable partner.",
    description: "Where bespoke architecture meets surgical construction precision for ₹1Cr+ residences.",
    ctaText: "THE TURNKEY ADVANTAGE",
    action: "turnkey",
  },
  {
    id: 3,
    image: '/images/hero-bedroom.jpg',
    tag: "CURATED REGIONAL ARCHITECTS",
    quote: "Home to Indore's most exclusive bespoke interiors.",
    description: "Handpicked regional architects paired with end-to-end execution and locked milestone pricing.",
    ctaText: "EXPLORE ARCHITECTS",
    action: "architects",
  },
]

export default function Hero({ onOpenConsult }) {
  const { isDark, toggleTheme } = useTheme()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Touch swipe support
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Auto-slide every 5.5 seconds
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5500)
    return () => clearInterval(interval)
  }, [isPaused])

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left -> Next
      nextSlide()
    }
    if (touchStartX.current - touchEndX.current < -50) {
      // Swipe right -> Prev
      prevSlide()
    }
  }

  const handleCtaClick = (action) => {
    if (action === 'consult') {
      onOpenConsult()
    } else if (action === 'turnkey') {
      const el = document.getElementById('turnkey')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else if (action === 'architects') {
      const el = document.getElementById('architects')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      className="relative w-full h-screen h-[100dvh] overflow-hidden select-none bg-[#0a0a0a]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* =========================================================================
          BACKGROUND SLIDES WITH CROSSFADE
      ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.quote}
              className={`w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out ${
                index === currentSlide ? 'scale-105' : 'scale-100'
              } ${isDark ? 'brightness-[0.88] contrast-105' : 'brightness-100 contrast-95'}`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* Subtle multi-layer gradient overlay to guarantee text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75" />
          </div>
        ))}
      </div>

      {/* =========================================================================
          MOBILE CANVAS CONTAINER (Strictly 9:16 mobile framing)
      ========================================================================= */}
      <div className="relative z-20 w-full h-full max-w-[430px] mx-auto flex flex-col justify-between">
        {/* -----------------------------------------------------------------------
            1. HEADER / NAVIGATION (Absolute Top)
            - Left: Authentic Lionorca Architeriors Logo
            - Right: Two Solid Circular Buttons (Dark Mode & Contents)
        ----------------------------------------------------------------------- */}
        <div className="flex justify-between items-center w-full px-5 pt-7 absolute top-0 left-0 z-30">
          {/* Brand Logo */}
          <a href="#" className="block select-none hover:opacity-95 transition-opacity">
            <img
              src="/images/logo-transparent.png"
              alt="LIONORCA ARCHITERIORS - the complete delivery of luxury"
              className="h-14 sm:h-16 w-auto max-w-[210px] sm:max-w-[240px] object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
              onError={(e) => {
                e.target.style.display = 'none'
                const fallback = document.getElementById('logo-text-fallback')
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            <div id="logo-text-fallback" className="hidden flex-col">
              <span className="font-serif text-2xl tracking-[0.22em] font-medium text-[#D2A337] uppercase leading-none">
                LIONORCA
              </span>
              <span className="font-sans text-[7.5px] tracking-[0.38em] uppercase text-white/80 mt-1">
                ARCHITERIORS
              </span>
            </div>
          </a>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Button 1: Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Dark Mode Active' : 'Light Mode Active'}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E0E0E0] hover:bg-white text-neutral-900 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.4)] active:scale-95"
            >
              {isDark ? (
                <Moon size={18} className="fill-neutral-900 text-neutral-900" />
              ) : (
                <Sun size={20} className="fill-amber-500 text-amber-500" />
              )}
            </button>

            {/* Button 2: Contents Drawer */}
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
            LEFT & RIGHT SLIDER NAVIGATION ARROWS
        ----------------------------------------------------------------------- */}
        <button
          onClick={prevSlide}
          type="button"
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md border border-white/20"
        >
          <ChevronLeft size={20} className="stroke-[2]" />
        </button>

        <button
          onClick={nextSlide}
          type="button"
          aria-label="Next Slide"
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md border border-white/20"
        >
          <ChevronRight size={20} className="stroke-[2]" />
        </button>

        {/* -----------------------------------------------------------------------
            2. MAIN TYPOGRAPHY / QUOTE CONTENT (Center Area)
        ----------------------------------------------------------------------- */}
        <div className="absolute top-[42%] -translate-y-1/2 left-0 w-full px-7 sm:px-8 z-20 text-left">
          {SLIDES.map((slide, index) => {
            if (index !== currentSlide) return null
            return (
              <div
                key={slide.id}
                className="animate-in fade-in slide-in-from-bottom-3 duration-500 flex flex-col items-start"
              >
                {/* Pill Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 bg-black/40 border border-[#D2A337]/40 text-[#D2A337] text-[10px] font-sans tracking-[0.25em] uppercase backdrop-blur-md">
                  <Sparkles size={11} />
                  <span>{slide.tag}</span>
                </div>

                {/* Primary Quote / Tagline */}
                <h1 className="font-serif text-3xl xs:text-4xl sm:text-[42px] font-normal text-white text-left leading-[1.18] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] mb-3">
                  {slide.quote}
                </h1>

                {/* Subtitle / Definition */}
                <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-sm drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                  {slide.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* -----------------------------------------------------------------------
            3. CALL TO ACTION, PAGINATION DOTS & SCROLL INDICATOR (Bottom Area)
        ----------------------------------------------------------------------- */}
        <div className="absolute bottom-8 left-0 w-full flex flex-col items-center gap-3.5 z-20 px-6">
          {/* Active Slide CTA Button */}
          <button
            onClick={() => handleCtaClick(SLIDES[currentSlide].action)}
            type="button"
            aria-label={SLIDES[currentSlide].ctaText}
            className="w-[84%] max-w-[340px] py-4 rounded-full bg-[#D2A337] hover:bg-[#c2932b] active:scale-95 text-neutral-950 font-serif font-medium text-xl sm:text-2xl tracking-[0.08em] uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.7)] cursor-pointer text-center"
          >
            {SLIDES[currentSlide].ctaText}
          </button>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center gap-2 pt-1">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  index === currentSlide
                    ? 'w-7 h-2 bg-[#D2A337] shadow-[0_0_8px_rgba(210,163,55,0.8)]'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Minimalist White "V" Scroll Indicator */}
          <a
            href="#turnkey"
            aria-label="Scroll to explore contents"
            className="text-white/90 hover:text-white transition-colors cursor-pointer text-xl font-serif font-light leading-none animate-bounce pt-0.5"
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
