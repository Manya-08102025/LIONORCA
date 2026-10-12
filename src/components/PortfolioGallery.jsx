import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Eye, ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    title: 'The Courtyard Villa',
    location: 'Nipania, Indore',
    tier: '₹1Cr+ Signature',
    turnkeyBudget: '₹1.85 Cr Turnkey',
    style: 'Minimalist Biophilic',
    partnerArchitect: 'Atelier Vistara',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    area: '4,200 sq. ft.',
  },
  {
    id: 2,
    title: 'Skyline Monolith',
    location: 'Super Corridor, Indore',
    tier: '₹1Cr+ Signature',
    turnkeyBudget: '₹2.40 Cr Turnkey',
    style: 'Contemporary Monolithic',
    partnerArchitect: 'Sthapatya Studio',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    area: '5,600 sq. ft.',
  },
  {
    id: 3,
    title: 'The Sandstone Manor',
    location: 'Bypass Road, Indore',
    tier: '₹1Cr+ Signature',
    turnkeyBudget: '₹3.10 Cr Turnkey',
    style: 'Modern Haveli',
    partnerArchitect: 'Virasat Design Atelier',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    area: '6,800 sq. ft.',
  },
  {
    id: 4,
    title: 'Zenith Pavilion',
    location: 'Mahalakshmi Nagar, Indore',
    tier: '₹75L–₹1Cr',
    turnkeyBudget: '₹95 Lakhs Turnkey',
    style: 'Japandi Luxury',
    partnerArchitect: 'Studio Kanso',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    area: '3,100 sq. ft.',
  },
  {
    id: 5,
    title: 'Terra Verve Eco-Villa',
    location: 'Rau, Indore',
    tier: '₹50L–₹75L',
    turnkeyBudget: '₹68 Lakhs Turnkey',
    style: 'Sustainable Tropical',
    partnerArchitect: 'Aakar Urban Concepts',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    area: '2,600 sq. ft.',
  },
]

export default function PortfolioGallery({ onSelectProject }) {
  const { isDark } = useTheme()
  const [activeTier, setActiveTier] = useState('All')

  const tiers = ['All', '₹1Cr+ Signature', '₹75L–₹1Cr', '₹50L–₹75L']

  const filtered = activeTier === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.tier === activeTier)

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
            Explore our curated residential commissions across Indore. All figures represent all-inclusive turnkey execution costs.
          </p>
        </div>

        {/* Tier Filter Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              type="button"
              className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeTier === tier
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                  : isDark
                  ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-neutral-900 border-white/10 hover:border-amber-500/40'
                  : 'bg-stone-50 border-neutral-200 hover:border-amber-500/40 hover:shadow-lg'
              }`}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-sans tracking-wider uppercase bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                  {item.tier}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-sans block">
                    {item.location} • {item.area}
                  </span>
                  <div className="font-serif text-lg font-bold">
                    {item.title}
                  </div>
                </div>
              </div>

              <div className="p-6">
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
