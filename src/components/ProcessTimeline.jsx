import { useTheme } from '../hooks/useTheme'
import { Coffee, Compass, CheckCircle2, FileText, KeyRound } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const STEPS = [
  {
    step: '01',
    title: 'Discovery & Lifestyle Planning',
    icon: Coffee,
    subtitle: 'Step 1: Discovery',
    description: 'We sit down with you to talk about your dream home, your family’s daily needs, favourite styles, and comfortable budget.',
    deliverable: 'Clear home plan & estimated budget',
  },
  {
    step: '02',
    title: 'Architect Selection',
    icon: Compass,
    subtitle: 'Step 2: Curated Matching',
    description: 'Every architect has a special design touch. We introduce you to the architect whose past work and regional or metro style matches the look you love.',
    deliverable: 'First architect meeting & design ideas',
  },
  {
    step: '03',
    title: 'Design Lock (5-10% Token)',
    icon: CheckCircle2,
    subtitle: 'Step 3: Design Lock',
    description: 'A simple 5-10% token of your estimated project budget lets the architect start drawing custom room layouts and realistic 3D photorealistic elevations.',
    deliverable: 'Official agreement & first 3D views',
  },
  {
    step: '04',
    title: 'Working Drawings & Final Quote',
    icon: FileText,
    subtitle: 'Step 4: Engineering & Quote',
    description: 'We finalize every single detail together—exact room sizes, structural engineering, lighting, wall finishes, and plumbing—producing a fixed, cut-to-cut quote.',
    deliverable: 'Complete ready-to-build drawing set',
  },
  {
    step: '05',
    title: 'Turnkey Execution & Key Handover',
    icon: KeyRound,
    subtitle: 'Step 5: Turnkey Execution',
    description: 'You get one fixed price with no surprise expenses. We handle all materials, on-site engineers, craftsmen, and quality checks until we hand you your ready keys.',
    deliverable: 'Finished home with 10-year warranty',
  },
]

export default function ProcessTimeline() {
  const { isDark } = useTheme()

  return (
    <section
      id="process"
      className="py-24 sm:py-32 border-t border-[#D4AC55]/30 bg-[#FAF7F0] text-neutral-900 relative overflow-hidden"
    >
      {/* Clearly Visible Luxury Architectural Bedroom Suite Background with Refined Soft Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-bedroom.jpg"
          alt=""
          className="w-full h-full object-cover ambient-bg-float"
          style={{
            filter: 'blur(6px)',
            transform: 'scale(1.10)',
            opacity: 0.52,
          }}
        />
        {/* Soft, Transparent Light Glaze to keep steps readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/35" />
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#D4AC55]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#C99E4A]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="blur-up" duration={900}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-soft tracking-[0.25em] uppercase font-bold block mb-3 text-[#8E651E]">
              Simple & Stress-Free
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-soft font-bold tracking-tight mb-4 text-[#1A1A1A]">
              How We Work
            </h2>
            <p className="text-sm sm:text-base font-soft text-stone-600 max-w-lg mx-auto">
              A transparent 5-step journey from your initial vision to turnkey handover with zero surprises.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps Flowchart */}
        <div className="relative">
          {/* Connecting line for desktop */}
          <div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-8 z-0 pointer-events-none bg-gradient-to-r from-transparent via-[#D4AC55]/50 to-transparent"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {STEPS.map((item, index) => {
              const Icon = item.icon
              return (
                <ScrollReveal
                  key={item.step}
                  animation="blur-up"
                  delay={index * 110}
                  duration={800}
                  className="h-full"
                >
                  <div
                    className="p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between luxury-card-hover h-full bg-white/88 backdrop-blur-xl border-[#D4AC55]/30 hover:border-[#D4AC55] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(212,172,85,0.18)] hover:-translate-y-1.5"
                  >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-2xl font-soft font-bold text-[#8E651E]">
                        {item.step}
                      </span>
                      <div className="p-2.5 rounded-xl bg-[#8E651E]/12 text-[#8E651E] border border-[#8E651E]/20">
                        <Icon size={20} />
                      </div>
                    </div>

                    <div className="text-xs font-soft font-bold uppercase tracking-wider mb-1 text-[#8E651E]">
                      {item.subtitle}
                    </div>
                    <h3 className="text-lg font-soft font-bold mb-2.5 text-stone-900">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] font-soft leading-relaxed mb-6 text-stone-600">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D4AC55]/20">
                    <span className="text-[11px] uppercase tracking-wider block font-soft font-bold mb-1 text-[#8E651E]">
                      What You Get
                    </span>
                    <span className="text-xs font-soft font-medium block text-stone-800">
                      {item.deliverable}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}
