import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    image: '/images/hero-bright-1.jpg',
    quote: 'The Complete Delivery of Luxury.',
    description:
      'From your first architectural sketch to the final keys — we design and build your bespoke residence.',
    ctaText: 'Book a Discovery Session',
    action: 'consult',
  },
  {
    id: 2,
    image: '/images/hero-bright-2.jpg',
    quote: 'Designer Designs, Contractor Executes, Nobody Owns the Outcome.',
    description:
      'Lionorca Architeriors owns it end to end with guaranteed milestones and verified craftsmanship.',
    ctaText: 'Book a Discovery Session',
    action: 'consult',
  },
  {
    id: 3,
    image: '/images/hero-bright-3.jpg',
    quote: "World's Finest Design Delivery",
    description:
      'Handpicked metro architectural talent with relentless, daily on-site turnkey delivery in Central India.',
    ctaText: 'Book a Discovery Session',
    action: 'consult',
  },
]

export default function Hero({ onOpenConsult }) {
  const [currentSlide, setCurrentSlide] = useState(0)
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
      nextSlide()
    }
    if (touchStartX.current - touchEndX.current < -50) {
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
          BACKGROUND SLIDES (Raw Gemini Flash Generated Images - 100% As-Is)
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
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* =========================================================================
          MOBILE CANVAS CONTAINER (Strictly 9:16 mobile framing)
      ========================================================================= */}
      <div className="relative z-20 w-full h-full max-w-[440px] mx-auto flex flex-col justify-between pt-16 sm:pt-20">

        {/* -----------------------------------------------------------------------
            SLIDER NAVIGATION ARROWS
        ----------------------------------------------------------------------- */}
        <button
          onClick={prevSlide}
          type="button"
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md border border-white/25"
        >
          <ChevronLeft size={20} className="stroke-[2.2]" />
        </button>

        <button
          onClick={nextSlide}
          type="button"
          aria-label="Next Slide"
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md border border-white/25"
        >
          <ChevronRight size={20} className="stroke-[2.2]" />
        </button>

        {/* -----------------------------------------------------------------------
            2. MAIN TYPOGRAPHY (Directly on image - Bolder, Larger, High Legibility)
        ----------------------------------------------------------------------- */}
        <div className="absolute top-[44%] -translate-y-1/2 left-0 w-full px-10 sm:px-14 z-20 text-left">
          {SLIDES.map((slide, index) => {
            if (index !== currentSlide) return null
            return (
              <div
                key={slide.id}
                className="animate-in fade-in slide-in-from-bottom-2 duration-400 flex flex-col items-start"
              >
                {/* Primary Quote / Tagline (Bold, commanding, crisp against any background) */}
                <h1 className="font-serif text-3xl xs:text-4xl sm:text-[44px] md:text-[48px] font-black text-white text-left leading-[1.12] tracking-tight mb-3.5 [text-shadow:0_3px_20px_rgba(0,0,0,0.95),0_1px_4px_rgba(0,0,0,0.95),0_0_35px_rgba(0,0,0,0.6)]">
                  {index === 0 ? (
                    <>
                      The Complete Delivery of{' '}
                      <span className="text-[#F5D58A] italic font-bold [text-shadow:0_3px_20px_rgba(0,0,0,0.95),0_1px_4px_rgba(0,0,0,0.95)]">
                        Luxury.
                      </span>
                    </>
                  ) : index === 1 ? (
                    <>
                      Designer Designs. Contractor Executes.{' '}
                      <span className="text-[#F5D58A] [text-shadow:0_3px_20px_rgba(0,0,0,0.95),0_1px_4px_rgba(0,0,0,0.95)]">
                        Nobody Owns the Outcome.
                      </span>
                    </>
                  ) : (
                    <>
                      World's Finest{' '}
                      <span className="text-[#F5D58A] [text-shadow:0_3px_20px_rgba(0,0,0,0.95),0_1px_4px_rgba(0,0,0,0.95)]">
                        Design Delivery.
                      </span>
                    </>
                  )}
                </h1>

                {/* Subtitle / Definition */}
                <p className="font-sans text-xs sm:text-sm md:text-base text-white/95 font-bold leading-relaxed max-w-sm [text-shadow:0_2px_14px_rgba(0,0,0,0.95),0_1px_3px_rgba(0,0,0,0.95)]">
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
          {/* Active Slide CTA Button (Rich Bold Champagne Gold) */}
          <button
            onClick={() => handleCtaClick(SLIDES[currentSlide].action)}
            type="button"
            aria-label={SLIDES[currentSlide].ctaText}
            className="w-[88%] max-w-[340px] py-4 px-6 rounded-full bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] active:scale-95 text-neutral-950 font-sans font-black text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_6px_30px_rgba(0,0,0,0.7)] cursor-pointer text-center border border-[#B3872E]/40"
          >
            {SLIDES[currentSlide].ctaText}
          </button>

          {/* Carousel Pagination Dots (No white pill) */}
          <div className="flex items-center gap-2 pt-1">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  index === currentSlide
                    ? 'w-7 h-2 bg-[#F5D58A] shadow-[0_0_10px_rgba(245,213,138,0.9)]'
                    : 'w-2 h-2 bg-white/60 hover:bg-white shadow-sm'
                }`}
              />
            ))}
          </div>

          {/* Minimalist "V" Scroll Indicator */}
          <a
            href="#turnkey"
            aria-label="Scroll to explore contents"
            className="text-white hover:text-white/80 transition-colors cursor-pointer text-xl font-serif font-bold leading-none animate-bounce pt-0.5 [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]"
          >
            V
          </a>
        </div>
      </div>
    </section>
  )
}
