import { useTheme } from '../hooks/useTheme'
import { MapPin, ArrowUpRight, ImagePlus, User, Sparkles } from 'lucide-react'

// Top Architects Roster with dedicated slots for Architect Portraits & Their Work
const TOP_ARCHITECTS = [
  {
    id: 'arch-1',
    name: 'Atelier Partner 01',
    role: 'Lead Architect',
    city: 'Indore, MP',
    style: 'Modern Minimalist & Biophilic',
    experience: '15+ Years • 25+ Completed Homes',
    turnkeyRange: '₹1Cr+ Turnkey',
    description:
      'Known for open green courtyards, abundant natural light, and clean modern aesthetics.',
    works: [
      { id: 'w1', title: 'Living & Courtyard' },
      { id: 'w2', title: 'Villa Facade' },
      { id: 'w3', title: 'Master Bedroom' },
    ],
  },
  {
    id: 'arch-2',
    name: 'Atelier Partner 02',
    role: 'Principal Architect',
    city: 'Indore, MP',
    style: 'Contemporary Monolithic & Stone',
    experience: '12+ Years • 18+ Luxury Residences',
    turnkeyRange: '₹1.5Cr+ Turnkey',
    description:
      'Renowned for double-height glass lounges, bold natural stone facades, and Italian marble finishes.',
    works: [
      { id: 'w1', title: 'Stone Facade' },
      { id: 'w2', title: 'Double Lounge' },
      { id: 'w3', title: 'Dining Pavilion' },
    ],
  },
  {
    id: 'arch-3',
    name: 'Atelier Partner 03',
    role: 'Heritage & Estate Designer',
    city: 'Indore, MP',
    style: 'Royal Heritage & Classical Haveli',
    experience: '20+ Years • 30+ Landmark Estates',
    turnkeyRange: '₹2Cr+ Turnkey',
    description:
      'Masters of handcrafted stone arches, carved teak wood ceilings, and timeless royal Indian luxury.',
    works: [
      { id: 'w1', title: 'Heritage Archway' },
      { id: 'w2', title: 'Teak Wood Interiors' },
      { id: 'w3', title: 'Courtyard Pool' },
    ],
  },
]

export default function ArchitectShowcase({ onSelectArchitect }) {
  const { isDark } = useTheme()

  return (
    <section
      id="architects"
      className={`py-20 sm:py-24 transition-colors duration-500 border-t ${
        isDark ? 'bg-neutral-950 border-white/5 text-neutral-100' : 'bg-stone-50 border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-soft tracking-[0.25em] uppercase text-amber-500 font-semibold block mb-3">
            Top Architects & Creators
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-soft font-bold tracking-tight mb-4">
            Top Architects & Their Work
          </h2>
          <p className={`text-base sm:text-lg font-soft font-normal leading-relaxed ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            We partner with Indore’s finest architectural minds. Below are their profiles and signature project slots, ready for their actual photos and completed work.
          </p>
        </div>

        {/* Architect Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TOP_ARCHITECTS.map((architect) => (
            <div
              key={architect.id}
              className={`rounded-3xl border p-6 transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-neutral-900/80 border-white/10 hover:border-amber-500/40'
                  : 'bg-white border-neutral-200 hover:border-amber-500/40 hover:shadow-xl'
              }`}
            >
              <div>
                {/* 1. Architect Profile Header (Photo Slot + Details) */}
                <div className="flex items-start gap-4 mb-6">
                  {/* Architect Picture Slot */}
                  <div
                    className={`w-24 h-28 sm:w-28 sm:h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center shrink-0 relative transition-colors ${
                      isDark
                        ? 'bg-neutral-950 border-white/20 text-neutral-400'
                        : 'bg-stone-100 border-neutral-300 text-neutral-500'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-1.5">
                      <User size={20} />
                    </div>
                    <span className="text-[10px] font-soft font-medium uppercase tracking-wider text-center px-1">
                      Architect Photo
                    </span>
                  </div>

                  {/* Architect Info */}
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-soft font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
                      <Sparkles size={10} />
                      <span>{architect.style}</span>
                    </div>

                    <h3 className={`text-lg sm:text-xl font-soft font-bold truncate ${
                      isDark ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {architect.name}
                    </h3>

                    <div className="text-xs font-soft text-neutral-400 mt-0.5 mb-1.5">
                      {architect.role} • {architect.city}
                    </div>

                    <div className="text-[11px] font-soft font-medium text-amber-400/90">
                      {architect.experience}
                    </div>
                  </div>
                </div>

                {/* Short Description */}
                <p className={`text-xs sm:text-[13px] font-soft leading-relaxed mb-6 ${
                  isDark ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  {architect.description}
                </p>

                {/* 2. "Their Work" Section (3 Photo Boxes) */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-soft font-bold uppercase tracking-wider text-amber-500">
                      Their Work & Projects
                    </span>
                    <span className="text-[10px] font-soft text-neutral-400">
                      3 Project Slots
                    </span>
                  </div>

                  {/* 3 Photo Boxes Grid */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {architect.works.map((work) => (
                      <div
                        key={work.id}
                        className={`aspect-[4/3] rounded-xl border border-dashed flex flex-col items-center justify-center p-2 text-center transition-colors ${
                          isDark
                            ? 'bg-neutral-950/70 border-white/15 text-neutral-400 hover:border-amber-500/40'
                            : 'bg-stone-100 border-neutral-300 text-neutral-500 hover:border-amber-500/40'
                        }`}
                      >
                        <ImagePlus size={18} className="text-amber-500/80 mb-1 shrink-0" />
                        <span className="text-[10px] font-soft font-medium line-clamp-1 leading-tight">
                          {work.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Card Footer (Budget Scope & Consult Action) */}
              <div className={`pt-4 border-t flex items-center justify-between ${
                isDark ? 'border-white/10' : 'border-neutral-200'
              }`}>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-soft font-medium">
                    Turnkey Scope
                  </span>
                  <span className="text-sm font-soft font-bold text-amber-500">
                    {architect.turnkeyRange}
                  </span>
                </div>

                <button
                  onClick={() => onSelectArchitect(architect)}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-soft font-semibold uppercase tracking-wider transition-all bg-amber-500 text-neutral-950 hover:bg-amber-400 cursor-pointer shadow-sm active:scale-95"
                >
                  <span>Consult</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
