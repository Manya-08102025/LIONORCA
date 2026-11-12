// Curated Architectural Showcase with 3-Card Sliding Carousel & View All Grid
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import {
  MapPin,
  User,
  ImagePlus,
  X,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  LayoutGrid,
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const ARCHITECTS = [
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

export function ArchitectCard({ architect, index, onSelect }) {
  return (
    <div className="rounded-3xl border border-stone-200/90 p-7 sm:p-9 transition-all duration-300 flex flex-col justify-between group h-full bg-white/95 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.09)] hover:border-champagne/60">
      <div>
        {/* Top Badge: Numbering + Location */}
        <div className="flex items-center justify-between mb-5">
          <span className="font-serif text-base text-[#8E651E] font-bold tracking-widest">
            {index < 9 ? `0${index + 1}` : index + 1}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold px-3 py-1.5 rounded-full border text-[#8E651E] bg-[#8E651E]/10 border-[#8E651E]/20">
            <MapPin size={12} />
            <span>{architect.city || 'Central India'}</span>
          </span>
        </div>

        {/* Architect Portrait & Details */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-16 h-20 sm:w-18 sm:h-22 rounded-2xl border border-stone-200 overflow-hidden flex flex-col items-center justify-center shrink-0 bg-stone-100 text-stone-500">
            {architect.image ? (
              <img
                src={architect.image}
                alt={architect.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <User size={22} className="text-[#8E651E] mb-1" />
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500">Studio</span>
              </>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 group-hover:text-[#8E651E] transition-colors mb-1 truncate">
              {architect.name}
            </h3>
            <div className="text-xs sm:text-sm font-sans font-bold text-[#8E651E] mb-1.5 line-clamp-1">
              {architect.style}
            </div>
            <div className="text-xs sm:text-sm font-sans leading-relaxed text-stone-600 line-clamp-2 font-normal">
              {architect.bio}
            </div>
          </div>
        </div>

        {/* Signature Project & Works */}
        <div className="mb-5 pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between text-xs sm:text-sm font-sans mb-3">
            <span className="font-semibold text-stone-600">Signature Project:</span>
            <span className="font-bold text-[#8E651E] truncate max-w-[170px] text-right">{architect.signatureProject}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {architect.works.map((work) => (
              <div
                key={work.id}
                className="aspect-[4/3] rounded-xl border border-dashed flex flex-col items-center justify-center p-1.5 text-center bg-greige/70 border-ash text-charcoal-muted"
              >
                <ImagePlus size={13} className="text-champagne mb-1" />
                <span className="text-[9px] font-sans font-medium line-clamp-1">{work.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-2">
        <button
          onClick={() => onSelect(architect)}
          type="button"
          className="w-full py-3 px-5 rounded-2xl text-xs font-sans font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 text-neutral-950 bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] shadow-[0_4px_16px_rgba(201,158,74,0.32)] hover:shadow-[0_6px_22px_rgba(201,158,74,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
        >
          <span>View Profile</span>
          <ArrowUpRight size={14} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  )
}

export default function ArchitectShowcase({ onSelectArchitect, architects: propArchitects, data, onViewAll }) {
  const [activeProfile, setActiveProfile] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Dynamically calculate cards shown per view (1 on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window === 'undefined') return
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

  // Seamless data fallback mapping
  const rawList = propArchitects || (Array.isArray(data) ? data : data?.architects) || ARCHITECTS
  const architectList = rawList.map((item, idx) => ({
    id: item._id || item.id || idx + 1,
    name: item.name || item.title || item.architectName || `Architect ${idx + 1}`,
    city: item.city || item.location || 'Central India',
    style: item.style || item.specialization || item.aesthetic || 'Modern Luxury Architecture',
    experience: item.experience || item.yearsExperience || '10+ Years Metro Experience',
    signatureProject: item.signatureProject || item.featuredProject || 'Bespoke Residence',
    bio: item.bio || item.description || item.about || 'Specialises in climate-responsive luxury residences with bespoke interior and exterior architectural delivery.',
    image: item.image?.asset?.url || item.image || item.photo || item.portrait || null,
    works: Array.isArray(item.works || item.portfolio || item.gallery)
      ? (item.works || item.portfolio || item.gallery).map((w, wIdx) => ({
          id: w._id || w.id || `${idx}-${wIdx}`,
          title: typeof w === 'string' ? w : w.title || w.caption || `Work ${wIdx + 1}`,
          image: w.image?.asset?.url || w.image || w.url || null,
        }))
      : [
          { id: `${idx}-a`, title: 'Exterior Elevation' },
          { id: `${idx}-b`, title: 'Interior Living Space' },
          { id: `${idx}-c`, title: 'Master Suite & Foyer' },
        ],
  }))

  const maxIndex = Math.max(0, architectList.length - cardsPerView)

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
    <section id="architects" className="py-20 sm:py-28 lg:py-32 bg-[#FAF9F5] text-charcoal border-t border-stone-200/80 relative overflow-hidden">
      {/* Blurred Luxury Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bg-penthouse.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(8px)',
            transform: 'scale(1.10)',
            opacity: 0.42,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/15 to-white/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        {/* ─── Standardized Luxury Section Header (Center-Aligned) ─── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.25em] text-[#8E651E] mb-3">
            Curated Architectural Network
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-stone-900 leading-[1.18] mb-4">
            Handpicked Architects
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Indore, Mumbai, and Delhi architectural masters matched to your site and aesthetic with guaranteed turnkey delivery.
          </p>
        </div>

        {/* ─── 3-Card Sliding Carousel with Luxury Floating Edge Arrows ─── */}
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
            aria-label="Previous Architects"
            className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-stone-900 border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-95 group"
          >
            <ChevronLeft size={20} className="stroke-[2.2] text-stone-700 group-hover:text-stone-950 transition-colors" />
          </button>

          {/* Right Edge Luxury Floating Arrow */}
          <button
            onClick={handleNext}
            type="button"
            aria-label="Next Architects"
            className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-stone-900 border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-95 group"
          >
            <ChevronRight size={20} className="stroke-[2.2] text-stone-700 group-hover:text-stone-950 transition-colors" />
          </button>

          {/* Sliding Carousel Viewport */}
          <div className="overflow-hidden w-full py-4 -my-4">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {architectList.map((architect, index) => (
                <div
                  key={architect.id}
                  style={{ width: `${100 / cardsPerView}%` }}
                  className="shrink-0 px-3 sm:px-4 h-auto flex flex-col"
                >
                  <ArchitectCard
                    architect={architect}
                    index={index}
                    onSelect={setActiveProfile}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Minimalist Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                type="button"
                aria-label={`Slide to architect group ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-7 h-2 bg-[#8E651E]'
                    : 'w-2 h-2 bg-stone-300 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ─── "View All Architects" Action Button (Navigates to Dedicated Clutter-Free Page) ─── */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <a
            href="/architects"
            onClick={(e) => {
              e.preventDefault()
              if (onViewAll) {
                onViewAll()
              } else {
                window.history.pushState({}, '', '/architects')
                window.dispatchEvent(new PopStateEvent('popstate'))
                window.scrollTo({ top: 0, behavior: 'instant' })
              }
            }}
            className="py-4 px-8 sm:px-10 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-sans font-bold text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.22)] active:scale-95 flex items-center gap-3 cursor-pointer border border-stone-800 group"
          >
            <LayoutGrid size={16} className="text-[#DEB853]" />
            <span>View All Architects ({architectList.length})</span>
            <ArrowUpRight size={15} className="text-[#DEB853] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          ARCHITECT PROFILE MODAL
      ═══════════════════════════════════════════════════ */}
      {activeProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveProfile(null)}
          />

          <div className="relative w-full max-w-2xl rounded-3xl shadow-2xl border border-ash p-8 sm:p-10 my-8 z-10 bg-alabaster text-charcoal">
            <button
              onClick={() => setActiveProfile(null)}
              type="button"
              aria-label="Close profile modal"
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-greige text-charcoal-light hover:text-charcoal cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Profile Header */}
            <div className="flex items-start gap-5 mb-8">
              <div className="w-20 h-24 rounded-2xl border border-ash flex flex-col items-center justify-center shrink-0 bg-greige">
                <User size={28} className="text-champagne mb-1" />
                <span className="text-[10px] font-sans text-charcoal-light">Studio Slot</span>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold mb-1.5 text-champagne">
                  <MapPin size={13} />
                  <span>Based in {activeProfile.city || 'Central India'} • {activeProfile.experience}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-charcoal">{activeProfile.name}</h3>
                <p className="text-sm font-sans font-semibold mt-1 text-champagne">{activeProfile.style}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8 space-y-4 font-sans text-sm leading-relaxed text-charcoal-muted font-light">
              <p>{activeProfile.bio}</p>
              <div className="p-5 rounded-2xl border bg-greige border-ash">
                <span className="text-[11px] uppercase font-semibold tracking-wider block mb-1 text-champagne">Signature Project</span>
                <span className="text-base font-serif font-normal block text-charcoal">{activeProfile.signatureProject}</span>
              </div>
            </div>

            {/* Signature Works */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-wider font-semibold mb-4 text-charcoal-light font-sans">Blueprint Concepts &amp; Works:</h4>
              <div className="grid grid-cols-3 gap-3">
                {activeProfile.works.map((work) => (
                  <div
                    key={work.id}
                    className="aspect-[4/3] rounded-xl border border-dashed flex flex-col items-center justify-center p-2 text-center bg-greige/60 border-ash"
                  >
                    <ImagePlus size={18} className="text-champagne mb-1" />
                    <span className="text-[10px] font-sans font-medium text-charcoal">{work.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-6 border-t border-ash">
              <button
                onClick={() => setActiveProfile(null)}
                type="button"
                className="w-full py-3.5 px-6 rounded-2xl border text-xs font-sans font-bold uppercase tracking-wider transition-all border-stone-300 hover:bg-stone-100 text-stone-700 hover:text-stone-950 cursor-pointer text-center"
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
