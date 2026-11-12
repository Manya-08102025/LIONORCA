import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  MapPin,
  Sparkles,
  X,
  CheckCircle2,
  Building,
} from 'lucide-react'

export const PROJECTS = [
  {
    id: 1,
    title: 'The Courtyard Villa',
    typology: 'Villa',
    architect: 'Architect 1 (Indore)',
    location: 'Bypass Corridor, Indore',
    specs: '5 BHK Luxury Villa • 4,500 sq.ft',
    description: 'Clean geometry, cantilevered pergolas, and an internal light courtyard designed for passive cross-ventilation and quiet luxury living.',
    image: '/images/bg-villa.jpg',
    highlights: ['Cantilevered Pergolas', 'Internal Light Courtyard', 'Passive Cross-Ventilation', 'Turnkey Execution'],
  },
  {
    id: 2,
    title: 'The Skyview Penthouse',
    typology: 'Penthouse',
    architect: 'Architect 6 (Indore)',
    location: 'Vijay Nagar, Indore',
    specs: '4 BHK Duplex Penthouse • 3,800 sq.ft',
    description: 'Double-height glass walls, bespoke acoustic wood paneling, Italian marble flooring, and an expansive private sunset terrace.',
    image: '/images/bg-penthouse.jpg',
    highlights: ['Double-Height Glazing', 'Bespoke Acoustic Paneling', 'Sunset View Terrace', 'Italian Marble Flooring'],
  },
  {
    id: 3,
    title: 'The Imperial Heritage Bungalow',
    typology: 'Bungalow',
    architect: 'Architect 3 (Delhi)',
    location: 'Bhopal Lakefront',
    specs: '6 BHK Signature Bungalow • 6,200 sq.ft',
    description: 'Handcrafted sandstone arches, high ceilings, classical colonnades, and sprawling landscaped lawns overlooking the serene lake.',
    image: '/images/hero-bright-1.jpg',
    highlights: ['Handcrafted Sandstone Arches', 'Classical Colonnades', 'Lakefront Lawns', 'Artisanal Teak Joinery'],
  },
  {
    id: 4,
    title: 'The Monolith Tropical Villa',
    typology: 'Villa',
    architect: 'Architect 4 (Indore)',
    location: 'Super Corridor, Indore',
    specs: '4 BHK Brutalist Villa • 5,000 sq.ft',
    description: 'Board-formed exposed concrete, floating wood staircases, and lush integrated planters with natural thermal insulation.',
    image: '/images/hero-bright-2.jpg',
    highlights: ['Board-Formed Concrete', 'Floating Cantilevered Stair', 'Integrated Planters', 'Thermal Shading Facade'],
  },
  {
    id: 5,
    title: 'The Panorama Sky Penthouse',
    typology: 'Penthouse',
    architect: 'Architect 2 (Mumbai)',
    location: 'AB Road, Indore',
    specs: '5 BHK Penthouse • 4,800 sq.ft',
    description: 'Curved bespoke ceilings, concealed Italian kitchens, smart automation, and private plunge pool with 360-degree skyline panoramas.',
    image: '/images/bg-luxury-suite.jpg',
    highlights: ['Private Plunge Pool', 'Concealed Italian Kitchen', 'Curved Acoustic Ceilings', 'Full Smart Home Suite'],
  },
  {
    id: 6,
    title: 'The Manor Ancestral Bungalow',
    typology: 'Bungalow',
    architect: 'Architect 5 (Bhopal)',
    location: 'Ujjain Highway Ridge',
    specs: '5 BHK Modern Bungalow • 5,500 sq.ft',
    description: 'Warm teakwood accents, energy-efficient passive cooling, and large wrap-around verandas designed for multi-generational living.',
    image: '/images/hero-bright-3.jpg',
    highlights: ['Wrap-Around Verandas', 'Warm Teak Millwork', 'Passive Geothermal Cooling', 'Courtyard Centerpiece'],
  },
  {
    id: 7,
    title: 'The Glass Pavilion Villa',
    typology: 'Villa',
    architect: 'Architect 1 (Indore)',
    location: 'Rau-Pithampur Ridge, Indore',
    specs: '5 BHK Minimalist Villa • 5,200 sq.ft',
    description: 'Floor-to-ceiling slimline glazing, seamless infinity water channels, and custom brushed-brass architectural details.',
    image: '/images/hero-arch-1.jpg',
    highlights: ['Slimline Minimalist Glazing', 'Reflective Water Channels', 'Brushed Brass Trims', 'Cantilevered Rooflines'],
  },
  {
    id: 8,
    title: 'The Terraced Lakeview Estate',
    typology: 'Bungalow',
    architect: 'Architect 3 (Delhi)',
    location: 'Bhopal Kerwa Valley',
    specs: '6 BHK Hillside Estate • 7,500 sq.ft',
    description: 'Step-terraced green roofs, native stone masonry, and private panoramic deck views over the pristine valley.',
    image: '/images/hero-arch-2.jpg',
    highlights: ['Terraced Green Roofs', 'Native Stone Masonry', 'Panoramic Viewing Decks', 'Private Forest Buffer'],
  },
]

export const TYPOLOGIES = ['All', 'Villa', 'Penthouse', 'Bungalow']

export function ProjectCard({ project, onSelect, onInquire }) {
  return (
    <div className="rounded-3xl border border-stone-200/90 overflow-hidden transition-all duration-300 flex flex-col justify-between group h-full bg-white/95 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.10)] hover:border-champagne/60">
      <div>
        {/* Real Project Photograph with Editorial Framing */}
        <div
          className="relative aspect-[16/10] overflow-hidden bg-stone-100 cursor-pointer"
          onClick={() => onSelect?.(project)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Typology Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-xs font-sans font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-stone-900 border border-stone-200 shadow-xs">
              {project.typology}
            </span>
          </div>

          {/* Location & Specs */}
          <div className="absolute bottom-3.5 left-4 right-4 z-10 flex items-center justify-between text-xs sm:text-[13px] font-sans text-white drop-shadow-md font-semibold">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[#DEB853]" />
              {project.location}
            </span>
            <span className="text-[#DEB853] font-bold">
              {project.specs?.split('•')[0] || project.typology}
            </span>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-7 sm:p-8">
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <span className="text-xs font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-[#8E651E] bg-[#8E651E]/10 border border-[#8E651E]/20">
              {project.specs?.split('•')[1] || project.typology}
            </span>
            <span className="text-xs sm:text-sm font-sans font-semibold text-stone-500">
              {project.architect}
            </span>
          </div>

          <h3
            onClick={() => onSelect?.(project)}
            className="text-2xl sm:text-[26px] font-serif font-bold mb-3 text-stone-900 group-hover:text-[#8E651E] transition-colors leading-snug cursor-pointer line-clamp-1"
          >
            {project.title}
          </h3>

          <p className="text-sm font-sans font-normal leading-relaxed text-stone-600 line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      {/* Inquire Action Button */}
      <div className="px-7 sm:px-8 pb-7 sm:pb-8 pt-2">
        <button
          onClick={() => (onInquire ? onInquire(project) : onSelect?.(project))}
          type="button"
          className="w-full py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all bg-stone-900 hover:bg-[#8E651E] text-white cursor-pointer flex items-center justify-center gap-2.5 active:scale-98 shadow-xs group-hover:shadow-md"
        >
          <span>Inquire About This Design</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default function PortfolioGallery({
  onSelectProject,
  projects: propProjects,
  data,
  onViewAll,
}) {
  const [selectedTypology, setSelectedTypology] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [activeProject, setActiveProject] = useState(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Responsive cardsPerView listener (3 desktop, 2 tablet, 1 mobile)
  useEffect(() => {
    function updateCardsPerView() {
      if (window.innerWidth < 640) {
        setCardsPerView(1)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }
    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  const rawProjects = propProjects || (Array.isArray(data) ? data : data?.projects) || PROJECTS
  const projectList = rawProjects.map((p, idx) => ({
    id: p._id || p.id || idx + 1,
    title: p.title || p.name || `Signature Project ${idx + 1}`,
    typology: p.typology || p.category || 'Villa',
    architect: p.architect?.name || p.architect || 'Curated Studio',
    location: p.location || 'Indore & Central India',
    specs: p.specs || p.dimensions || 'Bespoke Residence',
    description:
      p.description ||
      p.excerpt ||
      'Handcrafted luxury residence executed with single-contract turnkey precision.',
    image: p.image?.asset?.url || p.image || p.coverImage || p.mainImage || '/images/bg-villa.jpg',
    highlights:
      p.highlights || [
        'Turnkey Execution Guarantee',
        'Detailed Working Drawings',
        'Custom Material Selections',
        'Guarded Milestone Handover',
      ],
  }))

  const filteredProjects =
    selectedTypology === 'All'
      ? projectList
      : projectList.filter((p) => p.typology.toLowerCase() === selectedTypology.toLowerCase())

  // Reset index when typology filter changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedTypology])

  const maxIndex = Math.max(0, filteredProjects.length - cardsPerView)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
  }
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX
  }
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext()
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev()
    }
  }

  return (
    <section
      id="houses"
      className="py-20 sm:py-28 lg:py-32 bg-[#FAF9F5] text-charcoal relative overflow-hidden border-t border-stone-200/80"
    >
      {/* Clearly Visible Luxury Interior Design Background with Refined Soft Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bg-villa.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(8px)',
            transform: 'scale(1.10)',
            opacity: 0.38,
          }}
        />
        {/* Transparent Soft Light Glaze */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/45" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        {/* ─── Standardized Luxury Section Header (Center-Aligned) ─── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.25em] text-[#8E651E] mb-3">
            Signature Projects
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-stone-900 leading-[1.18] mb-4">
            Signature Portfolio &amp; Residences
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Indore and Central India signature villas, penthouses, and bespoke bungalows delivered with turnkey precision.
          </p>
        </div>

        {/* ─── Typology Filter Pills (Centered) ─── */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-10 sm:mb-12 flex-wrap">
          {TYPOLOGIES.map((typology) => (
            <button
              key={typology}
              onClick={() => setSelectedTypology(typology)}
              type="button"
              className={`px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wider transition-all cursor-pointer ${
                selectedTypology === typology
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white/90 hover:bg-white text-stone-700 border border-stone-200 hover:text-stone-900'
              }`}
            >
              {typology === 'All' ? 'All Residences' : `${typology}s`}
            </button>
          ))}
        </div>

        {/* ─── 3-Card Sliding Carousel with Floating Luxury Edge Arrows ─── */}
        <div
          className="relative px-2 sm:px-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Edge Luxury Floating Arrow */}
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Previous Projects"
            className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-stone-900 border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-95 group"
          >
            <ChevronLeft
              size={20}
              className="stroke-[2.2] text-stone-700 group-hover:text-stone-950 transition-colors"
            />
          </button>

          {/* Right Edge Luxury Floating Arrow */}
          <button
            onClick={handleNext}
            type="button"
            aria-label="Next Projects"
            className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-stone-900 border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-95 group"
          >
            <ChevronRight
              size={20}
              className="stroke-[2.2] text-stone-700 group-hover:text-stone-950 transition-colors"
            />
          </button>

          {/* Sliding Carousel Viewport */}
          <div className="overflow-hidden w-full py-4 -my-4">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  style={{ width: `${100 / cardsPerView}%` }}
                  className="shrink-0 px-3 sm:px-4 h-auto flex flex-col"
                >
                  <ProjectCard
                    project={project}
                    onSelect={setActiveProject}
                    onInquire={onSelectProject}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Minimalist Pagination Indicators */}
          {maxIndex > 0 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  type="button"
                  aria-label={`Slide to project group ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-7 h-2 bg-[#8E651E]'
                      : 'w-2 h-2 bg-stone-300 hover:bg-stone-500'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ─── "View All Signature Projects" Action Button (Routes to /projects) ─── */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <a
            href="/projects"
            onClick={(e) => {
              e.preventDefault()
              if (onViewAll) {
                onViewAll()
              } else {
                window.history.pushState({}, '', '/projects')
                window.dispatchEvent(new PopStateEvent('popstate'))
                window.scrollTo({ top: 0, behavior: 'instant' })
              }
            }}
            className="py-4 px-8 sm:px-10 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-sans font-bold text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.22)] active:scale-95 flex items-center gap-3 cursor-pointer border border-stone-800 group"
          >
            <LayoutGrid size={16} className="text-[#DEB853]" />
            <span>View All Signature Projects ({projectList.length})</span>
            <ArrowUpRight
              size={15}
              className="text-[#DEB853] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>

      {/* ─── Project Lightbox / Detail Modal ─── */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-stone-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 z-10 my-8 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                type="button"
                aria-label="Close Project Modal"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Modal Cover Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/95 text-stone-900 shadow-sm">
                    {activeProject.typology}
                  </span>
                </div>

                <div className="absolute bottom-5 left-6 right-6 z-10 text-white">
                  <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#DEB853] font-bold mb-1">
                    {activeProject.location} • {activeProject.architect}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                    {activeProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 text-xs font-sans font-semibold text-stone-600 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                  <Building size={16} className="text-[#8E651E] shrink-0" />
                  <span>{activeProject.specs}</span>
                </div>

                <div>
                  <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#8E651E] mb-2">
                    Architectural Concept &amp; Delivery
                  </h4>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-stone-700">
                    {activeProject.description}
                  </p>
                </div>

                {activeProject.highlights && activeProject.highlights.length > 0 && (
                  <div>
                    <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-stone-900 mb-3">
                      Design Highlights &amp; Scope
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeProject.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs sm:text-sm font-sans text-stone-700"
                        >
                          <CheckCircle2 size={15} className="text-[#8E651E] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Consultation Action */}
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-stone-500 font-sans">
                    Single-contract turnkey execution by Lionorca.
                  </span>
                  <button
                    onClick={() => {
                      const proj = activeProject
                      setActiveProject(null)
                      onSelectProject?.(proj)
                    }}
                    type="button"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-stone-900 hover:bg-[#8E651E] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles size={14} className="text-[#DEB853]" />
                    <span>Inquire About This Design</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
