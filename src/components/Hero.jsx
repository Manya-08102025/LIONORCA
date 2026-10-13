import { useTheme } from '../hooks/useTheme'
import { ChevronDown } from 'lucide-react'

export default function Hero({ onOpenConsult }) {
  const { isDark } = useTheme()

  return (
    <section className="relative w-full h-[100dvh] flex flex-col justify-between items-center overflow-hidden select-none">
      {/* =========================================================================
          VERTICAL BACKGROUND (9:16 Portrait Canvas with Stacked Crossfade)
          - Bottom layer: Nighttime vertical shot
          - Top layer: Daytime vertical shot (opacity 1 in light mode, opacity 0 in dark)
          - 1000ms smooth crossfade without layout flicker
      ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Bottom Layer: Night shot */}
        <img
          src="/images/hero-night.jpg"
          alt="Lynor Architecture Luxury Interior at Night"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />

        {/* Top Layer: Daytime shot */}
        <img
          src="/images/hero-day.jpg"
          alt="Lynor Architecture Luxury Interior in Daylight"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
            isDark ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
          decoding="async"
        />

        {/* Subtle architectural atmosphere gradient: Ensures legibility while letting the vertical view breathe */}
        <div
          className={`absolute inset-0 transition-colors duration-1000 ${
            isDark
              ? 'bg-gradient-to-b from-black/50 via-black/20 to-black/75'
              : 'bg-gradient-to-b from-black/40 via-transparent to-black/65'
          }`}
        />
      </div>

      {/* Top spacing spacer to account for the fixed minimalist header */}
      <div className="h-24 w-full" aria-hidden="true" />

      {/* =========================================================================
          CENTER CANVAS: THE PRIMARY TAGLINE ONLY
          - Ultra-minimalist, editorial luxury typography
          - Free of secondary text, floating boxes, or badges
      ========================================================================= */}
      <div className="relative z-10 w-full max-w-[420px] mx-auto px-6 text-center my-auto">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-light text-white tracking-wide leading-[1.25] drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
          the complete delivery of luxury
        </h1>
      </div>

      {/* =========================================================================
          BOTTOM THUMB ZONE: SOLID HIGH-CONTRAST "CONSULT" BUTTON
          - Positioned comfortably in the mobile thumb-reach zone
          - Ergonomic, high-contrast gold CTA
      ========================================================================= */}
      <div className="relative z-10 w-full max-w-[420px] mx-auto px-6 pb-8 sm:pb-12 flex flex-col items-center">
        <button
          onClick={onOpenConsult}
          type="button"
          aria-label="Consult with Lionorca"
          className="w-full max-w-[280px] sm:max-w-xs py-4 px-8 rounded-full text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase transition-all duration-300 bg-amber-400 hover:bg-amber-300 active:scale-95 text-neutral-950 shadow-[0_4px_30px_rgba(0,0,0,0.65)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.45)] cursor-pointer text-center"
        >
          Consult
        </button>

        {/* Subtle scroll cue to explore full blueprint */}
        <a
          href="#turnkey"
          aria-label="Scroll to discover the turnkey blueprint"
          className="mt-4 p-1 text-white/50 hover:text-white/90 transition-colors"
        >
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}
