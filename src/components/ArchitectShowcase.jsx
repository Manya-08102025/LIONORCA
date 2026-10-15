import { useTheme } from '../hooks/useTheme'
import { ArrowUpRight, ImagePlus, User } from 'lucide-react'

// Simple, clean roster: Architect 1, Architect 2, Architect 3
const ARCHITECTS = [
  {
    id: 'arch-1',
    name: 'Architect 1',
    style: 'Modern & Minimalist Designs',
    city: 'Indore',
    works: [
      { id: 'w1', title: 'Photo 1' },
      { id: 'w2', title: 'Photo 2' },
      { id: 'w3', title: 'Photo 3' },
    ],
  },
  {
    id: 'arch-2',
    name: 'Architect 2',
    style: 'Luxury Villa Designs',
    city: 'Indore',
    works: [
      { id: 'w1', title: 'Photo 1' },
      { id: 'w2', title: 'Photo 2' },
      { id: 'w3', title: 'Photo 3' },
    ],
  },
  {
    id: 'arch-3',
    name: 'Architect 3',
    style: 'Classic & Royal Designs',
    city: 'Indore',
    works: [
      { id: 'w1', title: 'Photo 1' },
      { id: 'w2', title: 'Photo 2' },
      { id: 'w3', title: 'Photo 3' },
    ],
  },
]

export default function ArchitectShowcase({ onSelectArchitect }) {
  const { isDark } = useTheme()

  return (
    <section
      id="architects"
      className={`py-20 transition-colors duration-500 border-t ${
        isDark ? 'bg-neutral-950 border-white/5 text-neutral-100' : 'bg-stone-50 border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-soft tracking-wider uppercase text-amber-500 font-semibold block mb-2">
            Architects
          </span>
          <h2 className="text-3xl sm:text-4xl font-soft font-bold tracking-tight mb-3">
            Top Architects
          </h2>
          <p className={`text-sm sm:text-base font-soft font-normal leading-relaxed ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Connect with our top architects in Indore. Photo spaces ready for their pictures and portfolio work.
          </p>
        </div>

        {/* Architect Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARCHITECTS.map((architect) => (
            <div
              key={architect.id}
              className={`rounded-2xl border p-6 transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-neutral-900/80 border-white/10 hover:border-amber-500/40'
                  : 'bg-white border-neutral-200 hover:border-amber-500/40 hover:shadow-lg'
              }`}
            >
              <div>
                {/* 1. Architect Picture Box & Basic Info */}
                <div className="flex items-center gap-4 mb-5">
                  {/* Photo Slot */}
                  <div
                    className={`w-20 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center shrink-0 transition-colors ${
                      isDark
                        ? 'bg-neutral-950 border-white/20 text-neutral-400'
                        : 'bg-stone-100 border-neutral-300 text-neutral-500'
                    }`}
                  >
                    <User size={22} className="text-amber-500/80 mb-1" />
                    <span className="text-[10px] font-soft font-medium text-center px-1">
                      Photo Slot
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-xl font-soft font-bold ${
                      isDark ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {architect.name}
                    </h3>
                    <div className="text-xs font-soft text-amber-400/90 font-medium mt-1">
                      {architect.style}
                    </div>
                    <div className="text-xs font-soft text-neutral-400 mt-0.5">
                      {architect.city}
                    </div>
                  </div>
                </div>

                {/* 2. Portfolio / Work Photo Boxes */}
                <div className="mb-5">
                  <span className="text-xs font-soft font-semibold text-neutral-400 block mb-2">
                    Their Work / Portfolio:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {architect.works.map((work) => (
                      <div
                        key={work.id}
                        className={`aspect-[4/3] rounded-lg border border-dashed flex flex-col items-center justify-center p-1.5 text-center ${
                          isDark
                            ? 'bg-neutral-950/70 border-white/15 text-neutral-400'
                            : 'bg-stone-100 border-neutral-300 text-neutral-500'
                        }`}
                      >
                        <ImagePlus size={16} className="text-amber-500/70 mb-1" />
                        <span className="text-[10px] font-soft font-medium">
                          {work.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Consult Button */}
              <button
                onClick={() => onSelectArchitect(architect)}
                type="button"
                className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-soft font-semibold uppercase tracking-wider transition-all bg-amber-500 text-neutral-950 hover:bg-amber-400 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
              >
                <span>Consult Architect</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
