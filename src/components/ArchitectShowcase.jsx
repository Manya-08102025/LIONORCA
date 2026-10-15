import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { MapPin, ArrowUpRight, ImagePlus } from 'lucide-react'

// 3 Curated Architect Placeholder Slots ready for Akshay's actual photographs & details
const PLACEHOLDER_ARCHITECTS = [
  {
    id: 'arch-1',
    name: 'Atelier Partner 01',
    city: 'Indore, MP',
    style: 'Warm Minimalism & Biophilic',
    signatureProject: 'Turnkey Commission — Slot 01',
    turnkeyRange: '₹1Cr+ Turnkey',
    description: 'Reserved slot for official architectural firm profile and project photography.',
  },
  {
    id: 'arch-2',
    name: 'Atelier Partner 02',
    city: 'Indore, MP',
    style: 'Contemporary Monolithic',
    signatureProject: 'Turnkey Commission — Slot 02',
    turnkeyRange: '₹1Cr+ Turnkey',
    description: 'Reserved slot for official architectural firm profile and project photography.',
  },
  {
    id: 'arch-3',
    name: 'Atelier Partner 03',
    city: 'Indore, MP',
    style: 'Modern Luxury & Heritage',
    signatureProject: 'Turnkey Commission — Slot 03',
    turnkeyRange: '₹1Cr+ Turnkey',
    description: 'Reserved slot for official architectural firm profile and project photography.',
  },
]

export default function ArchitectShowcase({ onSelectArchitect }) {
  const { isDark } = useTheme()

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
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-amber-500 font-semibold block mb-3">
              Curated Roster
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Handpicked Regional Architects
            </h2>
          </div>
          <p className={`mt-4 md:mt-0 max-w-md text-sm font-light font-sans ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Collaborating with Indore’s leading design minds. Space reserved for verified architectural partner photography.
          </p>
        </div>

        {/* Architect Cards Grid - Blank Placeholder Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLACEHOLDER_ARCHITECTS.map((architect) => (
            <div
              key={architect.id}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-neutral-900 border-white/10 hover:border-amber-500/40'
                  : 'bg-stone-50 border-neutral-200 hover:border-amber-500/40 hover:shadow-lg'
              }`}
            >
              {/* Clean Blank Box for Image Placement */}
              <div
                className={`relative h-64 flex flex-col items-center justify-center border-b transition-colors ${
                  isDark
                    ? 'bg-neutral-950/80 border-white/10 text-neutral-500'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-400'
                }`}
              >
                {/* Subtle border outline inside */}
                <div className="w-16 h-16 rounded-2xl border border-dashed border-current flex items-center justify-center mb-2 opacity-60">
                  <ImagePlus size={26} className="opacity-70" />
                </div>
                <span className="text-[11px] font-sans tracking-widest uppercase font-medium opacity-60">
                  Photo Slot
                </span>

                {/* City badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans tracking-wider uppercase bg-black/40 backdrop-blur-md text-amber-300 border border-white/10">
                  <MapPin size={12} />
                  <span>{architect.city}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold group-hover:text-amber-500 transition-colors mb-2">
                    {architect.name}
                  </h3>

                  <div className="text-xs font-sans text-amber-500/90 mb-3 font-medium tracking-wide">
                    {architect.style}
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
                    <span>Consult</span>
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
