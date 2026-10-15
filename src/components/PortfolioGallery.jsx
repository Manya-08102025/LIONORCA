import { useTheme } from '../hooks/useTheme'
import { ArrowUpRight, ImagePlus } from 'lucide-react'

// 3 Blank Project Slots ready for Akshay's actual photographs
const PLACEHOLDER_PROJECTS = [
  {
    id: 1,
    title: 'Signature Turnkey Villa 01',
    location: 'Indore, MP',
    tier: '₹1Cr+ Signature',
    turnkeyBudget: '₹1Cr+ Turnkey',
    style: 'Bespoke Modern',
    partnerArchitect: 'Architect Partner 01',
    area: '4,000+ sq. ft.',
  },
  {
    id: 2,
    title: 'Signature Turnkey Villa 02',
    location: 'Indore, MP',
    tier: '₹1Cr+ Signature',
    turnkeyBudget: '₹1Cr+ Turnkey',
    style: 'Contemporary Minimalist',
    partnerArchitect: 'Architect Partner 02',
    area: '5,000+ sq. ft.',
  },
  {
    id: 3,
    title: 'Signature Turnkey Villa 03',
    location: 'Indore, MP',
    tier: '₹1Cr+ Signature',
    turnkeyBudget: '₹1Cr+ Turnkey',
    style: 'Heritage Estate',
    partnerArchitect: 'Architect Partner 03',
    area: '6,000+ sq. ft.',
  },
]

export default function PortfolioGallery({ onSelectProject }) {
  const { isDark } = useTheme()

  return (
    <section
      id="portfolio"
      className={`py-24 transition-colors duration-500 border-t ${
        isDark ? 'bg-neutral-900/60 border-white/5 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-amber-500 font-semibold block mb-3">
              Executed Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Featured Turnkey Residences
            </h2>
          </div>
          <p className={`mt-4 md:mt-0 max-w-md text-sm font-light font-sans ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Explore our curated residential commissions across Indore. Spaces reserved for verified project photography.
          </p>
        </div>

        {/* Projects Grid with Clean Blank Image Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLACEHOLDER_PROJECTS.map((item) => (
            <div
              key={item.id}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-neutral-900 border-white/10 hover:border-amber-500/40'
                  : 'bg-stone-50 border-neutral-200 hover:border-amber-500/40 hover:shadow-lg'
              }`}
            >
              {/* Clean Blank Box for Project Photograph */}
              <div
                className={`relative h-64 flex flex-col items-center justify-center border-b transition-colors ${
                  isDark
                    ? 'bg-neutral-950/80 border-white/10 text-neutral-500'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-400'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl border border-dashed border-current flex items-center justify-center mb-2 opacity-60">
                  <ImagePlus size={26} className="opacity-70" />
                </div>
                <span className="text-[11px] font-sans tracking-widest uppercase font-medium opacity-60">
                  Project Photo Slot
                </span>

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-sans tracking-wider uppercase bg-black/40 backdrop-blur-md text-amber-300 border border-white/10">
                  {item.tier}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-sans block mb-1">
                    {item.location} • {item.area}
                  </span>
                  <div className="font-serif text-lg font-bold">
                    {item.title}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-neutral-400 font-sans">Lead Architect</span>
                  <span className="font-medium text-amber-400">{item.partnerArchitect}</span>
                </div>

                <div className="flex items-center justify-between text-xs mb-6">
                  <span className="text-neutral-400 font-sans">Architectural Style</span>
                  <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>{item.style}</span>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-sans">
                      All-Inclusive Turnkey
                    </span>
                    <span className="text-base font-semibold font-serif text-amber-500">
                      {item.turnkeyBudget}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectProject(item)}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all bg-amber-500 text-neutral-950 hover:bg-amber-400 cursor-pointer shadow-sm"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
