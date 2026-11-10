import ScrollReveal from './ScrollReveal'
import { Sparkles, MapPin, ShieldCheck, Compass } from 'lucide-react'

export default function TrustStrip() {
  const items = [
    { icon: Compass, text: 'Handpicked Architects and Interior Designers' },
    { icon: ShieldCheck, text: 'One Accountable Turnkey Contract' },
    { icon: MapPin, text: 'Indore, Bhopal, Ujjain & Central India' },
  ]

  return (
    <div id="trust-strip" className="w-full py-6 sm:py-8 px-6 sm:px-12 border-b border-stone-200/80 bg-white/70 backdrop-blur-md text-charcoal relative z-20">
      <ScrollReveal className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left relative z-10">
        {/* Desktop inline row */}
        <div className="hidden sm:flex items-center justify-center md:justify-start flex-wrap gap-y-2 gap-x-6 lg:gap-x-10 text-xs sm:text-[13px] font-sans font-medium tracking-wide">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex items-center gap-2.5">
                <Icon
                  size={15}
                  className="text-champagne shrink-0"
                />
                <span className="font-medium text-charcoal/90 tracking-wide">{item.text}</span>
                {index < items.length - 1 && (
                  <span
                    className="text-ash-dark ml-3 hidden lg:inline text-base font-serif"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile compact stack */}
        <div className="sm:hidden flex flex-col items-center gap-1.5 text-xs font-sans font-medium tracking-wide">
          <div className="flex items-center gap-2 text-champagne">
            <Sparkles size={13} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
              The Lionorca Standard
            </span>
          </div>
          <p className="text-center text-[12px] leading-relaxed text-charcoal-muted">
            Handpicked Architects and Interior Designers • One accountable turnkey delivery • Central India
          </p>
        </div>
      </ScrollReveal>
    </div>
  )
}
