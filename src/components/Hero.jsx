import { useTheme } from '../hooks/useTheme'
import { ArrowRight, Sparkles, ShieldCheck, Sun, Moon } from 'lucide-react'

export default function Hero({ onOpenConsult }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <section className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* =========================================================================
          BACKGROUND LAYERS: STACKED CROSSFADE EXECUTION
          - Bottom layer: Nighttime shot (revealed when daytime layer fades out)
          - Top layer: Daytime shot (opacity 1 in light mode, opacity 0 in dark mode)
          - Smooth CSS transition (1000ms ease-in-out) ensures zero visual flicker.
      ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* Bottom Layer: Night Shot */}
        <img
          src="/images/hero-night.jpg"
          alt="Lynor Luxury Residence Interior at Night"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          loading="eager"
          decoding="async"
        />

        {/* Top Layer: Day Shot (Crossfades via Opacity) */}
        <img
          src="/images/hero-day.jpg"
          alt="Lynor Luxury Residence Interior in Natural Daylight"
          className={`absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-all duration-1000 ease-in-out ${
            isDark ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
          decoding="async"
        />

        {/* Architectural Ambience Overlay: Guarantees high text legibility across both themes */}
        <div
          className={`absolute inset-0 transition-colors duration-1000 ${
            isDark
              ? 'bg-gradient-to-t from-[#0a0a0a] via-black/55 to-black/45'
              : 'bg-gradient-to-t from-neutral-950/85 via-black/40 to-black/35'
          }`}
        />

        {/* Subtle radial vignette for cinematic framing */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      </div>

      {/* =========================================================================
          HERO CONTENT OVERLAY (High Contrast & Legibility)
      ========================================================================= */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Atmosphere Pill & Interactive Micro-Toggle */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md bg-black/40 border border-amber-400/30 text-amber-300 text-xs tracking-[0.2em] uppercase shadow-lg">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-sans font-medium text-[11px] sm:text-xs">
            {isDark ? 'Atmosphere: Twilight Interior' : 'Atmosphere: Natural Daylit Living'}
          </span>
          <button
            onClick={toggleTheme}
            type="button"
            className="ml-1 pl-2 border-l border-white/20 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            title="Toggle theme atmosphere"
          >
            {isDark ? <Sun size={12} /> : <Moon size={12} />}
            <span className="underline decoration-amber-500/60 underline-offset-2">Switch</span>
          </button>
        </div>

        {/* Brand Kicker */}
        <h2 className="text-xs sm:text-sm md:text-base font-sans tracking-[0.35em] sm:tracking-[0.45em] uppercase text-amber-400 font-semibold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Lionorca • Lynor Arkitechtures
        </h2>

        {/* Primary Tagline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          Bespoke Architecture Meets <br className="hidden sm:inline" />
          <span className="italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Flawless Turnkey Execution.
          </span>
        </h1>

        {/* Sub-tagline */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-neutral-200 font-sans font-light leading-relaxed mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Indore’s exclusive single point of contact for ₹1Cr+ turnkey residential projects.
          We bridge the gap between design and construction—orchestrating 50+ specialized vendors so you enjoy the journey.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14">
          <button
            onClick={onOpenConsult}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-300 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Sparkles size={16} />
            <span>Consult With Us</span>
            <ArrowRight size={16} />
          </button>

          <a
            href="#turnkey"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-medium tracking-[0.15em] uppercase transition-all duration-300 bg-black/40 hover:bg-black/60 text-white border border-white/25 hover:border-amber-400/60 backdrop-blur-md cursor-pointer"
          >
            <span>The Turnkey Advantage</span>
          </a>
        </div>

        {/* Credibility / Single Point of Contact Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/15">
          <div className="flex items-center justify-center sm:justify-start gap-3 text-left px-3 py-2 rounded-xl backdrop-blur-sm bg-black/25 border border-white/5">
            <ShieldCheck size={24} className="text-amber-400 shrink-0" />
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-white">Single Point of Contact</div>
              <div className="text-[11px] text-neutral-300">Zero vendor coordination stress</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 text-left px-3 py-2 rounded-xl backdrop-blur-sm bg-black/25 border border-white/5">
            <Sparkles size={24} className="text-amber-400 shrink-0" />
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-white">5 Curated Regional Architects</div>
              <div className="text-[11px] text-neutral-300">Local masterminds & artisans</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 text-left px-3 py-2 rounded-xl backdrop-blur-sm bg-black/25 border border-white/5">
            <span className="text-amber-400 font-serif text-2xl font-bold px-1">₹</span>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-white">₹1Cr+ Turnkey Standard</div>
              <div className="text-[11px] text-neutral-300">5% token advance to begin design</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
