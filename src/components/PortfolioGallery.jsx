import { useTheme } from '../hooks/useTheme'
import { ArrowUpRight, ImagePlus } from 'lucide-react'

// House & Interior Design Options ready for actual photographs
const HOUSE_OPTIONS = [
  {
    id: 1,
    title: 'Modern House & Interiors',
    style: 'Clean Contemporary Living',
    specs: '4 BHK • Indore',
    description: 'Spacious open living room, modern modular kitchen, and natural lighting design.',
  },
  {
    id: 2,
    title: 'Luxury Villa & Interiors',
    style: 'High Ceiling Contemporary',
    specs: '5 BHK Villa • Indore',
    description: 'Double-height living lounge, luxury master bedroom, and premium interior finishes.',
  },
  {
    id: 3,
    title: 'Classic Estate & Interiors',
    style: 'Royal Heritage & Woodwork',
    specs: '6 BHK Estate • Indore',
    description: 'Grand wooden entrance, handcrafted arches, and timeless traditional interior touches.',
  },
]

export default function PortfolioGallery({ onSelectProject }) {
  const { isDark } = useTheme()

  return (
    <section
      id="houses"
      className={`py-20 transition-colors duration-500 border-t ${
        isDark ? 'bg-neutral-900/50 border-white/5 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-soft tracking-wider uppercase text-amber-500 font-semibold block mb-2">
            Designs & Layouts
          </span>
          <h2 className="text-3xl sm:text-4xl font-soft font-bold tracking-tight mb-3">
            House & Interior Design Options
          </h2>
          <p className={`text-sm sm:text-base font-soft font-normal leading-relaxed ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Explore our house layout and interior designing options. Photo spaces reserved for actual completed projects.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOUSE_OPTIONS.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-neutral-900 border-white/10 hover:border-amber-500/40'
                  : 'bg-stone-50 border-neutral-200 hover:border-amber-500/40 hover:shadow-lg'
              }`}
            >
              {/* Photo Box for House / Interior Photo */}
              <div
                className={`relative h-60 flex flex-col items-center justify-center border-b transition-colors ${
                  isDark
                    ? 'bg-neutral-950/80 border-white/10 text-neutral-500'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-400'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl border border-dashed border-current flex items-center justify-center mb-2 opacity-60">
                  <ImagePlus size={24} className="opacity-75" />
                </div>
                <span className="text-xs font-soft font-medium opacity-70">
                  House / Interior Photo Slot
                </span>

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-soft font-medium bg-black/40 backdrop-blur-md text-amber-300 border border-white/10">
                  {item.specs}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className={`text-lg font-soft font-bold mb-1.5 ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {item.title}
                  </h3>

                  <div className="text-xs font-soft text-amber-500/90 font-medium mb-3">
                    {item.style}
                  </div>

                  <p className={`text-xs font-soft leading-relaxed mb-6 ${
                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => onSelectProject && onSelectProject(item)}
                  type="button"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-soft font-semibold uppercase tracking-wider transition-all bg-amber-500 text-neutral-950 hover:bg-amber-400 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                >
                  <span>Inquire About This Design</span>
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
