import { useTheme } from '../hooks/useTheme'
import { Sparkles, MapPin, ShieldCheck, Compass } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function TrustStrip() {
  const { isDark } = useTheme()

  const items = [
    { icon: Compass, text: 'Handpicked Architects' },
    { icon: ShieldCheck, text: 'One Accountable Turnkey Delivery' },
    { icon: MapPin, text: 'Indore, Bhopal, Ujjain & Nearby' },
  ]

  return (
    <div className="w-full py-5 px-4 sm:px-6 border-b border-[#E5C583]/40 bg-[#F8F5EE] text-stone-900 shadow-xs relative z-20 overflow-hidden">
      {/* Soft Blurred Luxury Interior Glass Plinth Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bg-villa.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(6px)',
            transform: 'scale(1.15)',
            opacity: 0.45,
          }}
        />
        <div className="absolute inset-0 bg-[#F8F5EE]/65 backdrop-blur-md" />
      </div>

      <ScrollReveal animation="blur-up" duration={700}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left relative z-10">
        {/* Desktop inline row */}
        <div className="hidden sm:flex items-center justify-center md:justify-start flex-wrap gap-y-2 gap-x-4 lg:gap-x-8 text-xs sm:text-[13px] font-soft font-medium tracking-wide">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex items-center gap-2">
                <Icon
                  size={15}
                  className={`${
                    isDark ? 'text-[#E5C583]' : 'text-[#8E651E]'
                  } shrink-0`}
                />
                <span className="font-semibold">{item.text}</span>
                {index < items.length - 1 && (
                  <span
                    className={`${
                      isDark ? 'text-[#E5C583]/50' : 'text-[#8E651E]/50'
                    } ml-2 hidden lg:inline`}
                    aria-hidden="true"
                  >
                    &bull;
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile compact stack */}
        <div className="sm:hidden flex flex-col items-center gap-1.5 text-xs font-soft font-medium tracking-wide">
          <div
            className={`flex items-center gap-2 ${
              isDark ? 'text-[#E5C583]' : 'text-[#8E651E]'
            }`}
          >
            <Sparkles size={13} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold">
              The Lionorca Standard
            </span>
          </div>
          <p
            className={`text-center text-[12px] leading-relaxed ${
              isDark ? 'text-neutral-300' : 'text-slate-600'
            }`}
          >
            Handpicked architects &bull; One accountable turnkey delivery &bull; Indore, Bhopal, Ujjain & nearby
          </p>
        </div>
      </div>
    </ScrollReveal>
  </div>
)
}
