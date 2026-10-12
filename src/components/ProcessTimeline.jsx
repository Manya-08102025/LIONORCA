import { useTheme } from '../hooks/useTheme'
import { Search, UserCheck, CreditCard, FileSpreadsheet, KeyRound } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    title: 'Discovery & Scope Definition',
    icon: Search,
    subtitle: 'Confidential Consultation',
    description: 'We meet to establish your lifestyle vision, site parameters in Indore, spatial requirements, and finalize your target turnkey budget.',
    deliverable: 'Initial Feasibility & Budget Blueprint',
  },
  {
    step: '02',
    title: 'Architect Matchmaking',
    icon: UserCheck,
    subtitle: 'Curated Designer Pairing',
    description: 'Based on your aesthetic preference (Minimalist, Haveli, Japandi, etc.), we pair you with the ideal regional architect from our curated roster.',
    deliverable: 'Direct Introduction & Conceptual Moodboards',
  },
  {
    step: '03',
    title: '5% Token Design Advance',
    icon: CreditCard,
    subtitle: 'Formal Engagement',
    description: 'A transparent 5% token advance based on your preliminary budget (e.g. ₹5 Lakhs on a ₹1 Crore project) is deposited to kick off custom architectural drawings.',
    deliverable: 'Architectural Agreement & Design Retainer',
  },
  {
    step: '04',
    title: 'Comprehensive Working Drawings',
    icon: FileSpreadsheet,
    subtitle: 'Active Engineering Phase',
    description: 'Developing complete structural engineering, MEP (Mechanical, Electrical, Plumbing), 3D photorealistic elevations, and custom joinery detailing.',
    deliverable: 'Complete Ready-to-Build Technical Dossier',
  },
  {
    step: '05',
    title: 'Cut-to-Cut Quotation & Key Handover',
    icon: KeyRound,
    subtitle: 'Turnkey Construction & Delivery',
    description: 'A locked, cut-to-cut quotation is approved before breaking ground. We manage 50+ vendors, material quality tests, and deliver your keys on schedule.',
    deliverable: 'Turnkey Handover with 10-Year Structural Warranty',
  },
]

export default function ProcessTimeline() {
  const { isDark } = useTheme()

  return (
    <section
      id="process"
      className={`py-24 transition-colors duration-500 border-t ${
        isDark ? 'bg-neutral-950 border-white/5 text-neutral-100' : 'bg-stone-100 border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-amber-500 font-semibold block mb-3">
            Predictable & Transparent
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">
            The 5-Step Turnkey Journey
          </h2>
          <p className={`text-base sm:text-lg font-light font-sans leading-relaxed ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            No ambiguity, no contractor runaway costs. From our first conversation to unlocking your finished residence, every milestone is strictly structured.
          </p>
        </div>

        {/* Steps Flowchart */}
        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20 -translate-y-8 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {STEPS.map((item, index) => {
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
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-serif font-bold text-amber-500">
                        {item.step}
                      </span>
                      <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                        <Icon size={20} />
                      </div>
                    </div>

                    <div className="text-[11px] font-sans uppercase tracking-widest text-neutral-400 mb-1">
                      {item.subtitle}
                    </div>
                    <h3 className="text-lg font-serif font-bold mb-3">
                      {item.title}
                    </h3>
                    <p className={`text-xs font-sans leading-relaxed mb-6 ${
                      isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  <div className={`pt-4 border-t ${isDark ? 'border-white/5' : 'border-neutral-100'}`}>
                    <span className="text-[10px] uppercase tracking-wider text-amber-500 block font-sans font-semibold mb-0.5">
                      Milestone Deliverable
                    </span>
                    <span className="text-xs font-sans text-neutral-300 font-medium block">
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
