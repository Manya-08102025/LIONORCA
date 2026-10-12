import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Sparkles, MapPin, Compass, ArrowUpRight } from 'lucide-react'

// 5 Curated Local/Regional Architects (Phase 1 Indore & MP focus)
const REGIONAL_ARCHITECTS = [
  {
    id: 'arch-1',
    name: 'Atelier Vistara',
    leadArchitect: 'Ar. Rajesh Sharma',
    city: 'Indore, MP',
    style: 'Warm Minimalism & Biophilic',
    signatureProject: 'The Courtyard Villa, Nipania',
    turnkeyRange: '₹1.2 Cr – ₹2.5 Cr',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Renowned for seamless indoor-outdoor courtyards, natural ventilation, and quiet architectural luxury.',
  },
  {
    id: 'arch-2',
    name: 'Sthapatya Studio',
    leadArchitect: 'Ar. Neha Mandloi',
    city: 'Indore, MP',
    style: 'Contemporary Monolithic',
    signatureProject: 'Skyline House, Super Corridor',
    turnkeyRange: '₹1.5 Cr – ₹3.2 Cr',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Specializes in bold cantilevered forms, raw textural stone, and double-height architectural glazing.',
  },
  {
    id: 'arch-3',
    name: 'Virasat Design Atelier',
    leadArchitect: 'Ar. Vikramaditya Rathore',
    city: 'Indore, MP',
    style: 'Modern Haveli & Indo-Saracenic',
    signatureProject: 'The Heritage Estate, Bypass Road',
    turnkeyRange: '₹2.0 Cr – ₹4.5 Cr',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description: 'Artfully marrying hand-carved Jodhpur stone, carved jalis, and modern smart home automation.',
  },
  {
    id: 'arch-4',
    name: 'Studio Kanso',
    leadArchitect: 'Ar. Ananya Chouksey',
    city: 'Indore, MP',
    style: 'Japandi & Zen Luxury',
    signatureProject: 'The Timber Pavilion, Mahalakshmi Nagar',
    turnkeyRange: '₹1.1 Cr – ₹2.0 Cr',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    description: 'Pioneers in acoustic wood paneling, low-profile bespoke furniture, and zen water features.',
  },
  {
    id: 'arch-5',
    name: 'Aakar Urban Concepts',
    leadArchitect: 'Ar. Sameer Patidar',
    city: 'Indore, MP',
    style: 'Sustainable Tropical Modernism',
    signatureProject: 'The Terra Residence, Rau',
    turnkeyRange: '₹90 Lakhs – ₹1.8 Cr',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    description: 'Expertise in passive solar orientation, exposed terracotta bricks, and low-energy climate cooling.',
  },
]

export default function ArchitectShowcase({ onSelectArchitect }) {
  const { isDark } = useTheme()
  const [selectedStyle, setSelectedStyle] = useState('All')

  const styles = ['All', 'Warm Minimalism & Biophilic', 'Contemporary Monolithic', 'Modern Haveli & Indo-Saracenic', 'Japandi & Zen Luxury', 'Sustainable Tropical Modernism']

  const filteredArchitects = selectedStyle === 'All'
    ? REGIONAL_ARCHITECTS
    : REGIONAL_ARCHITECTS.filter((a) => a.style === selectedStyle)

  return (
    <section
      id="architects"
      className={`py-24 transition-colors duration-500 border-t ${
        isDark ? 'bg-neutral-900/50 border-white/5 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.3em] uppercase text-amber-500 font-semibold mb-3">
              <Sparkles size={14} />
              <span>Phase 1 Curated Roster</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight">
              5 Handpicked Regional Architects
            </h2>
          </div>
          <p className={`mt-4 md:mt-0 max-w-md text-sm font-light font-sans ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Collaborating with Indore’s most respected design minds. We handle engineering, procurement, and construction so their design integrity is realized down to the millimeter.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedStyle === style
                  ? 'bg-amber-500 text-neutral-950 font-semibold shadow-md'
                  : isDark
                  ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Architect Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArchitects.map((architect) => (
            <div
              key={architect.id}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-neutral-900 border-white/10 hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]'
                  : 'bg-stone-50 border-neutral-200 hover:border-amber-500/40 hover:shadow-lg'
              }`}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={architect.image}
                  alt={architect.signatureProject}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* City badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans tracking-wider uppercase bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                  <MapPin size={12} />
                  <span>{architect.city}</span>
                </div>

                {/* Signature Project Tag */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-sans block">
                    Signature Build
                  </span>
                  <div className="font-serif text-base font-semibold truncate">
                    {architect.signatureProject}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-serif font-bold group-hover:text-amber-500 transition-colors">
                      {architect.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-sans text-amber-500/90 mb-3">
                    <Compass size={14} />
                    <span className="font-medium tracking-wide">{architect.style}</span>
                  </div>

                  <p className={`text-xs font-sans leading-relaxed mb-6 ${
                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {architect.description}
                  </p>
                </div>

                {/* Footer details & Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-sans">
                      Turnkey Budget Scope
                    </span>
                    <span className="text-sm font-semibold font-serif text-amber-400">
                      {architect.turnkeyRange}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectArchitect(architect)}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-neutral-950 border border-amber-500/30 cursor-pointer"
                  >
                    <span>Match</span>
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
