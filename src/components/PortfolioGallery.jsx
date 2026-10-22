import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { ArrowUpRight, ImagePlus } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const PROJECTS = [
  {
    id: 1,
    title: 'The Courtyard Villa',
    typology: 'Villa',
    architect: 'Architect 1 (Indore)',
    location: 'Bypass Corridor, Indore',
    specs: '5 BHK Luxury Villa • 4,500 sq.ft',
    description: 'Clean geometry, cantilevered pergolas, and an internal light courtyard designed for cross-ventilation.',
    image: '/images/bg-villa.jpg',
  },
  {
    id: 2,
    title: 'The Skyview Penthouse',
    typology: 'Penthouse',
    architect: 'Architect 6 (Indore)',
    location: 'Vijay Nagar, Indore',
    specs: '4 BHK Duplex Penthouse • 3,800 sq.ft',
    description: 'Double-height glass walls, bespoke acoustic wood paneling, and an expansive private sunset terrace.',
    image: '/images/bg-penthouse.jpg',
  },
  {
    id: 3,
    title: 'The Imperial Heritage Bungalow',
    typology: 'Bungalow',
    architect: 'Architect 3 (Delhi)',
    location: 'Bhopal Lakefront',
    specs: '6 BHK Signature Bungalow • 6,200 sq.ft',
    description: 'Handcrafted sandstone arches, high ceilings, classical columns, and sprawling landscaped lawns.',
    image: '/images/hero-bright-1.jpg',
  },
  {
    id: 4,
    title: 'The Monolith Tropical Villa',
    typology: 'Villa',
    architect: 'Architect 4 (Indore)',
    location: 'Super Corridor, Indore',
    specs: '4 BHK Brutalist Villa • 5,000 sq.ft',
    description: 'Board-formed exposed concrete, floating wood staircases, and lush integrated planters with natural shading.',
    image: '/images/hero-bright-2.jpg',
  },
  {
    id: 5,
    title: 'The Panorama Sky Penthouse',
    typology: 'Penthouse',
    architect: 'Architect 2 (Mumbai)',
    location: 'AB Road, Indore',
    specs: '5 BHK Penthouse • 4,800 sq.ft',
    description: 'Curved bespoke ceilings, concealed Italian kitchens, smart automation, and private plunge pool.',
    image: '/images/bg-luxury-suite.jpg',
  },
  {
    id: 6,
    title: 'The Manor Ancestral Bungalow',
    typology: 'Bungalow',
    architect: 'Architect 5 (Bhopal)',
    location: 'Ujjain Highway Ridge',
    specs: '5 BHK Modern Bungalow • 5,500 sq.ft',
    description: 'Warm teakwood accents, energy-efficient passive cooling, and large wrap-around verandas.',
    image: '/images/hero-bright-3.jpg',
  },
]

const TYPOLOGIES = ['All', 'Villa', 'Penthouse', 'Bungalow']

export default function PortfolioGallery({ onSelectProject }) {
  const { isDark } = useTheme()
  const [selectedTypology, setSelectedTypology] = useState('All')

  const filteredProjects =
    selectedTypology === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.typology === selectedTypology)

  return (
    <section
      id="houses"
      className="py-24 sm:py-32 border-t border-[#D4AC55]/30 bg-[#F6F4ED] text-neutral-900 relative overflow-hidden"
    >
      {/* Clearly Visible Luxury Grand Suite Interior Background with Refined Soft Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bg-luxury-suite.jpg"
          alt=""
          className="w-full h-full object-cover ambient-bg-float"
          style={{
            filter: 'blur(6px)',
            transform: 'scale(1.10)',
            opacity: 0.52,
          }}
        />
        {/* Soft, Transparent Light Glaze to keep project cards popping */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/35" />
        <div className="absolute top-1/4 right-5 w-[500px] h-[500px] bg-[#D4AC55]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-5 w-[500px] h-[500px] bg-[#C99E4A]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="blur-up" duration={900}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-soft tracking-[0.25em] uppercase font-bold block mb-2 text-[#8E651E]">
              Signature Projects
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-soft font-bold tracking-tight mb-3 text-[#1A1A1A]">
              Portfolio & Architectural Typologies
            </h2>
            <p className="text-sm sm:text-base font-soft text-stone-600 max-w-lg mx-auto">
              Explore bespoke residences engineered and delivered with turnkey precision across Indore & Central India.
            </p>
          </div>
        </ScrollReveal>

        {/* Typology Filter Tabs */}
        <ScrollReveal animation="blur-up" delay={120} duration={750}>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
            {TYPOLOGIES.map((typology) => (
              <button
                key={typology}
                onClick={() => setSelectedTypology(typology)}
                type="button"
                className={`px-5 py-2.5 rounded-xl text-xs font-soft font-bold tracking-wider transition-all cursor-pointer ${
                  selectedTypology === typology
                    ? 'bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] text-neutral-950 shadow-md border border-[#B3872E]/40'
                    : 'bg-white/80 backdrop-blur-md text-stone-700 hover:bg-white border border-[#D4AC55]/30 shadow-xs'
                }`}
              >
                {typology === 'All' ? 'All Typologies' : `${typology}s`}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              animation="blur-up"
              delay={(index % 3) * 110}
              duration={800}
              className="h-full"
            >
              <div
                className="rounded-2xl border p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between luxury-card-hover h-full bg-white/90 backdrop-blur-xl border-[#D4AC55]/30 hover:border-[#D4AC55] shadow-[0_10px_35px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(212,172,85,0.2)] hover:-translate-y-1.5 group"
              >
              <div>
                {/* 1. Real Luxury Project Photograph Frame */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-[#D4AC55]/30 bg-stone-100 shadow-inner group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-soft font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-neutral-900 border border-white/50 shadow-xs">
                      {project.typology}
                    </span>
                  </div>

                  {/* Location Tag */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-[11px] font-soft text-white/95 drop-shadow-sm font-medium">
                    <span>{project.location}</span>
                    <span className="text-[#F5D58A] font-bold">{project.specs.split('•')[0]}</span>
                  </div>
                </div>

                {/* 2. Project Details */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-soft font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md text-[#8E651E] bg-[#8E651E]/10 border border-[#8E651E]/20">
                    {project.specs.split('•')[1] || project.typology}
                  </span>
                  <span className="text-[11px] font-soft font-medium text-stone-500">
                    {project.architect}
                  </span>
                </div>

                <h3 className="text-xl font-soft font-bold mb-1.5 text-stone-900 group-hover:text-[#8E651E] transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-[13px] font-soft leading-relaxed mb-4 text-stone-600">
                  {project.description}
                </p>
              </div>

              {/* 3. Inquire CTA Button */}
              <button
                onClick={() => onSelectProject(project)}
                type="button"
                className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-soft font-bold uppercase tracking-wider transition-all bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] text-neutral-950 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-98 border border-[#B3872E]/30"
              >
                <span>Inquire About This Design</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
