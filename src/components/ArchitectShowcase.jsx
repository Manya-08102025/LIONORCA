import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import {
  MapPin,
  Sparkles,
  ArrowUpRight,
  User,
  ImagePlus,
  X,
  ExternalLink,
} from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const ARCHITECTS = [
  {
    id: 1,
    name: 'Architect 1',
    style: 'Modern Minimalist & Courtyard Villas',
    experience: '12+ Years in Central India',
    signatureProject: 'The Courtyard Villa, Indore',
    bio: 'Specialises in climate-responsive luxury residences with internal lightwells, passive cooling, and minimalist stone facades suited for MP climate.',
    works: [
      { id: '1a', title: 'Courtyard Villa Render' },
      { id: '1b', title: 'Interior Living Lounge' },
      { id: '1c', title: 'Cantilever Elevation' },
    ],
  },
  {
    id: 2,
    name: 'Architect 2',
    style: 'Biophilic Luxury & Penthouse Design',
    experience: '15+ Years Metro Experience',
    signatureProject: 'Sea-Facing Highrise & Indore Penthouses',
    bio: 'Brings Mumbai high-luxury sensibilities to Central India. Known for dramatic double-height volumes, seamless indoor-outdoor greenery, and bespoke lighting.',
    works: [
      { id: '2a', title: 'Skyline Terrace' },
      { id: '2b', title: 'Double Height Hall' },
      { id: '2c', title: 'Italian Marble Suite' },
    ],
  },
  {
    id: 3,
    name: 'Architect 3',
    style: 'Neo-Classical & Grand Estates',
    experience: '18+ Years Heritage Architecture',
    signatureProject: 'Lutyens-Inspired Bungalow, Bhopal',
    bio: 'Renowned for timeless symmetry, grand colonnades, handcrafted sandstone work, and sprawling aristocratic estate layouts across North & Central India.',
    works: [
      { id: '3a', title: 'Classical Portico' },
      { id: '3b', title: 'Grand Foyer Staircase' },
      { id: '3c', title: 'Formal Dining Salon' },
    ],
  },
  {
    id: 4,
    name: 'Architect 4',
    style: 'Contemporary Tropical & Concrete Chic',
    experience: '10+ Years Regional Expertise',
    signatureProject: 'The Monolith Residence, Super Corridor',
    bio: 'Integrates board-formed concrete, warm local teakwood, and dramatic water features. Delivers young, cutting-edge architectural statements.',
    works: [
      { id: '4a', title: 'Concrete & Wood Facade' },
      { id: '4b', title: 'Sunken Pool Lounge' },
      { id: '4c', title: 'Glass Pavilion' },
    ],
  },
  {
    id: 5,
    name: 'Architect 5',
    style: 'Sustainable Luxury & Heritage Fusion',
    experience: '14+ Years Central India',
    signatureProject: 'Lakefront Sanctuary, Upper Lake',
    bio: 'Master of integrating serene water views, vernacular stone masonry, and net-zero solar design principles into opulent family retreats.',
    works: [
      { id: '5a', title: 'Lakefront Deck' },
      { id: '5b', title: 'Stone Masonry Gallery' },
      { id: '5c', title: 'Courtyard Water Feature' },
    ],
  },
  {
    id: 6,
    name: 'Architect 6',
    style: 'Warm Brutalism & Bespoke Interiors',
    experience: '11+ Years Precision Craft',
    signatureProject: 'The Amber House, Vijay Nagar',
    bio: 'Known for bespoke material combinations—fluted terracotta, champagne metal trims, and custom architectural millwork with flawless turnkey delivery.',
    works: [
      { id: '6a', title: 'Terracotta Facade' },
      { id: '6b', title: 'Bespoke Brass Kitchen' },
      { id: '6c', title: 'Master Bed Suite' },
    ],
  },
]

export default function ArchitectShowcase({ onSelectArchitect }) {
  const { isDark } = useTheme()
  const [activeProfile, setActiveProfile] = useState(null)

  return (
    <section
      id="architects"
      className="py-24 sm:py-32 border-t border-b border-[#D4AC55]/30 bg-[#FAF8F3] text-stone-900 relative overflow-hidden"
    >
      {/* Clearly Visible Luxury Penthouse Interior Background with Refined Soft Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bg-penthouse.jpg"
          alt=""
          className="w-full h-full object-cover ambient-bg-float"
          style={{
            filter: 'blur(6px)',
            transform: 'scale(1.10)',
            opacity: 0.52,
          }}
        />
        {/* Soft, Transparent Light Glaze to keep content and cards sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/35" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-80 bg-[#D4AC55]/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#C99E4A]/12 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="blur-up" duration={900}>
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
            <span className="text-xs font-soft tracking-[0.25em] uppercase font-bold block mb-2 text-[#8E651E]">
              Curated Architectural Network
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-soft font-bold tracking-tight mb-3 text-stone-900">
              Featured Architects
            </h2>
            <p className="text-sm sm:text-base font-soft font-normal leading-relaxed text-stone-600">
              Indore, Mumbai, and Delhi architectural masters matched to your exact aesthetic.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Architect Cards Grid with Smooth Blur-Up Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ARCHITECTS.map((architect, index) => (
            <ScrollReveal
              key={architect.id}
              animation="blur-up"
              delay={(index % 3) * 120}
              duration={850}
              className="h-full"
            >
              <div className="rounded-2xl border p-6 transition-all duration-500 flex flex-col justify-between group luxury-card-hover h-full bg-white/85 backdrop-blur-2xl border-[#D4AC55]/30 hover:border-[#D4AC55] shadow-[0_10px_35px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(212,172,85,0.18)] hover:-translate-y-1.5">
              <div>
                {/* Top Badge: City & Experience */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-soft font-bold px-2.5 py-0.5 rounded-md border text-[#8E651E] bg-[#8E651E]/10 border-[#8E651E]/20">
                    <MapPin size={11} />
                    <span>{architect.city}</span>
                  </span>
                  <span className="text-[10px] font-soft uppercase tracking-wider text-stone-500 font-medium">
                    {architect.experience}
                  </span>
                </div>

                {/* Architect Header & Portrait Slot */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center shrink-0 transition-colors bg-stone-50 border-stone-300 text-[#8E651E]">
                    <User size={20} className="text-[#8E651E] mb-1" />
                    <span className="text-[9px] font-soft font-medium text-center px-1 text-stone-500">
                      Photo
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-soft font-bold text-stone-900 group-hover:text-[#8E651E] transition-colors">
                      {architect.name}
                    </h3>
                    <div className="text-xs font-soft font-bold mt-1 text-[#8E651E]">
                      {architect.style}
                    </div>
                    <div className="text-xs font-soft mt-1 line-clamp-2 text-stone-600">
                      {architect.bio}
                    </div>
                  </div>
                </div>

                {/* Signature Project & Photo Placeholders */}
                <div className="mb-5 pt-3 border-t border-stone-200">
                  <div className="flex items-center justify-between text-xs font-soft mb-2">
                    <span className="font-semibold text-stone-500">
                      Signature Project:
                    </span>
                    <span className="font-bold text-[#8E651E]">
                      {architect.signatureProject}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {architect.works.map((work) => (
                      <div
                        key={work.id}
                        className="aspect-[4/3] rounded-lg border border-dashed flex flex-col items-center justify-center p-1.5 text-center bg-stone-50 border-stone-200 text-stone-600"
                      >
                        <ImagePlus size={14} className="text-[#8E651E] mb-1" />
                        <span className="text-[9px] font-soft font-medium line-clamp-1">
                          {work.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: View Profile & Consult */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => setActiveProfile(architect)}
                  type="button"
                  className="py-2.5 px-3 rounded-xl text-xs font-soft font-semibold transition-all border cursor-pointer text-center border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-[#8E651E]"
                >
                  View Profile
                </button>

                <button
                  onClick={() => onSelectArchitect(architect)}
                  type="button"
                  className="py-2.5 px-3 rounded-xl text-xs font-soft font-bold uppercase tracking-wider transition-all bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] text-neutral-950 cursor-pointer flex items-center justify-center gap-1 active:scale-98 shadow-sm border border-[#B3872E]/40"
                >
                  <span>Consult</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </ScrollReveal>
          ))}
        </div>
      </div>

      {/* =========================================================================
          CLICK-THROUGH ARCHITECT PROFILE MODAL
      ========================================================================= */}
      {activeProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveProfile(null)}
          />

          <div className="relative w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 my-8 z-10 transition-all bg-white text-stone-900">
            <button
              onClick={() => setActiveProfile(null)}
              type="button"
              aria-label="Close profile modal"
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-900 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Profile Header */}
            <div className="flex items-start gap-5 mb-6">
              <div className="w-20 h-24 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center shrink-0 bg-stone-50 border-stone-300">
                <User
                  size={28}
                  className="text-[#8E651E] mb-1"
                />
                <span className="text-[10px] font-soft text-stone-500">Photo Slot</span>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-soft font-bold mb-1 text-[#8E651E]">
                  <MapPin size={13} />
                  <span>Based in {activeProfile.city} &bull; {activeProfile.experience}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-soft font-bold text-stone-900">
                  {activeProfile.name}
                </h3>
                <p className="text-sm font-soft font-semibold mt-1 text-[#8E651E]">
                  {activeProfile.style}
                </p>
              </div>
            </div>

            {/* Philosophy & Bio */}
            <div className="mb-6 space-y-3 font-soft text-sm leading-relaxed text-stone-600">
              <p>{activeProfile.bio}</p>
              <div className="p-4 rounded-xl border bg-stone-50 border-stone-200">
                <span className="text-xs uppercase font-bold tracking-wider block mb-1 text-[#8E651E]">
                  Signature Project
                </span>
                <span className="text-base font-bold block text-stone-900">
                  {activeProfile.signatureProject}
                </span>
              </div>
            </div>

            {/* Portfolio Works Grid */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-wider font-semibold mb-3 text-stone-500">
                Signature Works & Blueprint Concepts:
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {activeProfile.works.map((work) => (
                  <div
                    key={work.id}
                    className="aspect-[4/3] rounded-xl border border-dashed flex flex-col items-center justify-center p-2 text-center bg-stone-50 border-stone-300"
                  >
                    <ImagePlus
                      size={18}
                      className="text-[#8E651E] mb-1"
                    />
                    <span className="text-[10px] font-soft font-medium text-stone-700">{work.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-200">
              <button
                onClick={() => {
                  const arch = activeProfile
                  setActiveProfile(null)
                  onSelectArchitect(arch)
                }}
                type="button"
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] text-neutral-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-[#B3872E]/30"
              >
                <Sparkles size={16} />
                <span>Consult with {activeProfile.name}</span>
              </button>

              <button
                onClick={() => setActiveProfile(null)}
                type="button"
                className="py-3 px-6 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all border-stone-300 hover:bg-stone-100 text-stone-700 cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
