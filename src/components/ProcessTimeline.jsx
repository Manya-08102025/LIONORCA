import { useTheme } from '../hooks/useTheme'
import { Coffee, Compass, CheckCircle2, FileText, KeyRound } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    title: 'First Chat & Planning',
    icon: Coffee,
    subtitle: 'Understanding Your Dream Home',
    description: 'We sit down with you to talk about your dream home, your family’s daily needs, favourite styles, and comfortable budget.',
    deliverable: 'Clear home plan & estimated budget',
  },
  {
    step: '02',
    title: 'Picking Your Architect',
    icon: Compass,
    subtitle: 'Matching Your Exact Style',
    description: 'Every architect has a special design touch. We introduce you to the architect whose past work matches the look you love.',
    deliverable: 'First architect meeting & design ideas',
  },
  {
    step: '03',
    title: '5% Booking to Begin',
    icon: CheckCircle2,
    subtitle: 'Putting Ideas into 3D',
    description: 'A simple 5% token of your estimated project budget lets the architect start drawing custom room layouts and realistic 3D designs.',
    deliverable: 'Official agreement & first 3D views',
  },
  {
    step: '04',
    title: 'Finalizing Every Detail',
    icon: FileText,
    subtitle: 'Rooms, Ceilings & Wiring',
    description: 'We finalize every single detail together—exact room sizes, lighting, wall finishes, and plumbing—so there are no surprises later.',
    deliverable: 'Complete ready-to-build drawing set',
  },
  {
    step: '05',
    title: 'Fixed Price & Key Handover',
    icon: KeyRound,
    subtitle: 'Zero Stress Construction',
    description: 'You get one fixed price with no surprise expenses. We handle all materials, workers, and quality checks until we hand you your ready keys.',
    deliverable: 'Your finished home with 10-year warranty',
  },
]

export default function ProcessTimeline() {
  const { isDark } = useTheme()

  return (
    <section
      id="process"
      className={`py-20 transition-colors duration-500 border-t ${
        isDark ? 'bg-neutral-950 border-white/5 text-neutral-100' : 'bg-stone-100 border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-soft tracking-[0.25em] uppercase text-amber-500 font-semibold block mb-3">
            Simple & Stress-Free
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-soft font-bold tracking-tight mb-4">
            How It Works in 5 Simple Steps
          </h2>
          <p className={`text-base sm:text-lg font-soft font-normal leading-relaxed ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            No confusing industry jargon, no surprise costs. From our first friendly conversation to unlocking your finished dream home, here is how simply we work together.
          </p>
        </div>

        {/* Steps Flowchart */}
        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20 -translate-y-8 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {STEPS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.step}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    isDark
                      ? 'bg-neutral-900/80 border-white/10 hover:border-amber-500/50 hover:-translate-y-1'
                      : 'bg-white border-neutral-200 hover:border-amber-500/50 hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  <div>
                    {/* Top Step Pill & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-2xl font-soft font-bold text-amber-500">
                        {item.step}
                      </span>
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                        <Icon size={20} />
                      </div>
                    </div>

                    <div className="text-xs font-soft font-medium text-amber-400/90 mb-1">
                      {item.subtitle}
                    </div>
                    <h3 className={`text-lg font-soft font-bold mb-2.5 ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs sm:text-[13px] font-soft leading-relaxed mb-6 ${
                      isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  <div className={`pt-4 border-t ${isDark ? 'border-white/5' : 'border-neutral-100'}`}>
                    <span className="text-[11px] uppercase tracking-wider text-amber-500 block font-soft font-semibold mb-1">
                      What You Get
                    </span>
                    <span className={`text-xs font-soft font-medium block ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      {item.deliverable}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
