import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: '/images/hero-bright-1.jpg',
    quote: 'The Complete Delivery of Luxury.',
    description:
      'Bring your vision to life under one roof — offering complete turnkey execution and dedicated project management consultancy from architectural sketch to final keys.',
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
    quote: 'Finest match of Design Delivery',
    description:
      'Handpicked architects and designers with relentless onsite turnkey delivery.',
    ctaText: 'Book a Discovery Session',
    action: 'consult',
  },
];

export default function Hero({ onOpenConsult }) {
  const [currentSlide, setCurrentSlide] = useState(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.search.match(/slide=(\d+)/);
      if (match) return parseInt(match[1], 10) % SLIDES.length;
    }
    return 0;
  });
  const [isPaused, setIsPaused] = useState(false);

  // Touch swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide every 6.5 seconds (6-7s duration)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  const handleCtaClick = (action) => {
    if (action === 'consult') {
      onOpenConsult?.();
    } else if (action === 'turnkey') {
      const el = document.getElementById('turnkey');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'architects') {
      const el = document.getElementById('architects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full h-screen h-[100dvh] overflow-hidden select-none bg-[#0a0a0a]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides with subtle dimming to compliment the text */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            <img
              src={slide.image}
              alt={slide.quote}
              className="w-full h-full object-cover object-center opacity-85"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Very subtle dimming overlay to enhance text contrast without heavy shadows */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows (Anchored to Screen Edges, Scaled for Mobile Clearance) */}
      <button
        onClick={prevSlide}
        type="button"
        aria-label="Previous Slide"
        className="absolute left-1.5 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md border border-white/20"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[2.2]" />
      </button>

      <button
        onClick={nextSlide}
        type="button"
        aria-label="Next Slide"
        className="absolute right-1.5 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md border border-white/20"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[2.2]" />
      </button>

      {/* Content Container (Centered Grand Desktop & Mobile Framing) */}
      <div className="relative z-20 w-full h-full max-w-[460px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col justify-between pt-16 sm:pt-20">

        {/* Main Typography - Strictly Centered */}
        <div className="absolute top-[44%] -translate-y-1/2 left-0 w-full px-5 sm:px-12 md:px-0 z-20 flex flex-col items-center text-center">
          {SLIDES.map((slide, index) => {
            if (index !== currentSlide) return null;
            return (
              <div
                key={slide.id}
                className="animate-in fade-in slide-in-from-bottom-2 duration-400 flex flex-col items-center text-center w-full"
              >
                {/* Headline: Larger, Bolder Cormorant Garamond Serif Strictly Centered */}
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-[32px] xs:text-[36px] sm:text-[56px] md:text-[64px] lg:text-[70px] font-black text-white text-center leading-[1.08] tracking-tight mb-4 [text-shadow:0_2px_8px_rgba(0,0,0,0.45)] [font-weight:900]"
                >
                  {index === 0 ? (
                    <>
                      <span className="block">The Complete</span>
                      <span className="block">Delivery of</span>
                      <span className="text-[#F5D58A] italic font-bold block [text-shadow:0_2px_8px_rgba(0,0,0,0.45)]">
                        Luxury.
                      </span>
                    </>
                  ) : index === 1 ? (
                    <>
                      <span className="block">Designer Designs.</span>
                      <span className="block">Contractor Executes.</span>
                      <span className="text-[#F5D58A] font-bold block [text-shadow:0_2px_8px_rgba(0,0,0,0.45)]">
                        Nobody Owns the Outcome.
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block">Finest match of</span>
                      <span className="text-[#F5D58A] font-bold block [text-shadow:0_2px_8px_rgba(0,0,0,0.45)]">
                        Design Delivery.
                      </span>
                    </>
                  )}
                </motion.h1>

                {/* Subtitle / Definition - Enhanced Size & Readability Strictly Centered */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans text-[14px] xs:text-[15px] sm:text-[17px] md:text-[18px] text-white font-semibold leading-relaxed w-full max-w-[280px] xs:max-w-[320px] sm:max-w-lg md:max-w-2xl text-center mx-auto [text-shadow:0_2px_10px_rgba(0,0,0,0.9),0_1px_3px_rgba(0,0,0,0.95)]"
                >
                  {slide.description}
                </motion.p>
              </div>
            );
          })}
        </div>

        {/* CTA Button, Pagination Dots & V Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-8 left-0 w-full flex flex-col items-center gap-3.5 z-20 px-6"
        >
          {/* Active Slide CTA Button */}
          <button
            onClick={() => handleCtaClick(SLIDES[currentSlide].action)}
            type="button"
            aria-label={SLIDES[currentSlide].ctaText}
            className="w-[88%] max-w-[340px] py-4 px-6 rounded-full bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] active:scale-95 text-neutral-950 font-sans font-black text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_6px_30px_rgba(0,0,0,0.7)] cursor-pointer text-center border border-[#B3872E]/40"
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
                className={`transition-all duration-300 rounded-full cursor-pointer ${index === currentSlide
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
        </motion.div>
      </div>
    </section>
  );
}



