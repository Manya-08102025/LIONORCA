import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Sparkles,
  MapPin,
  User,
  ImagePlus,
  X,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react'
import { ARCHITECTS, ArchitectCard } from '../components/ArchitectShowcase'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Architects({ onOpenConsult, onBack, architects: propArchitects, data }) {
  const [activeProfile, setActiveProfile] = useState(null)

  const rawList = propArchitects || (Array.isArray(data) ? data : data?.architects) || ARCHITECTS
  const architectList = rawList.map((item, idx) => ({
    id: item._id || item.id || idx + 1,
    name: item.name || item.title || item.architectName || `Architect ${idx + 1}`,
    city: item.city || item.location || 'Central India',
    style: item.style || item.specialization || item.aesthetic || 'Modern Luxury Architecture',
    experience: item.experience || item.yearsExperience || '10+ Years Metro Experience',
    signatureProject: item.signatureProject || item.featuredProject || 'Bespoke Residence',
    bio:
      item.bio ||
      item.description ||
      item.about ||
      'Specialises in climate-responsive luxury residences with bespoke interior and exterior architectural delivery.',
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

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate'))
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-28 min-h-screen bg-[#FAF9F5] text-charcoal relative">
      {/* Blurred Luxury Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bg-penthouse.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(10px)',
            transform: 'scale(1.10)',
            opacity: 0.38,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F5]/80 via-[#FAF9F5]/60 to-[#FAF9F5]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        {/* ─── Top Bar with Luxury "Go Back" Button ─── */}
        <div className="flex items-center justify-between gap-4 mb-10 sm:mb-14">
          <button
            onClick={handleBack}
            type="button"
            aria-label="Go Back to Home"
            className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-stone-50 border border-stone-200/90 text-stone-800 hover:text-black font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-xs hover:shadow-md cursor-pointer group active:scale-95"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1 text-[#8E651E]" />
            <span>Go Back</span>
          </button>

          <span className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-[#8E651E]">
            {architectList.length} Curated Masters
          </span>
        </div>

        {/* ─── Editorial Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.25em] text-[#8E651E] mb-3">
            Curated Architectural Network
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-stone-900 leading-[1.18] mb-4">
            All Handpicked Architects
          </h1>
          <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Indore, Mumbai, and Delhi architectural masters matched to your site and aesthetic with guaranteed turnkey delivery and singular accountability.
          </p>
        </div>

        {/* ─── All Architects Full Grid ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch"
        >
          {architectList.map((architect, index) => (
            <motion.div key={architect.id} variants={cardVariants} className="h-full">
              <ArchitectCard
                architect={architect}
                index={index}
                onSelect={setActiveProfile}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Bottom Navigation & Consultation CTA ─── */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={handleBack}
            type="button"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-xs hover:shadow-sm cursor-pointer group active:scale-95"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1 text-[#8E651E]" />
            <span>Back to Home</span>
          </button>

          <button
            onClick={() => onOpenConsult?.()}
            type="button"
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-sans font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 cursor-pointer"
          >
            <Sparkles size={16} className="text-[#DEB853]" />
            <span>Match With an Architect</span>
          </button>
        </div>
      </div>

      {/* ─── Architect Profile Modal ─── */}
      <AnimatePresence>
        {activeProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProfile(null)}
              className="fixed inset-0 bg-stone-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-stone-200 z-10 my-8 overflow-hidden"
            >
              <button
                onClick={() => setActiveProfile(null)}
                type="button"
                aria-label="Close Profile"
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#8E651E] mb-2">
                <MapPin size={13} />
                <span>{activeProfile.city}</span>
                <span>•</span>
                <span>{activeProfile.experience}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                {activeProfile.name}
              </h3>
              <p className="text-sm font-sans font-semibold text-[#8E651E] mb-4">
                {activeProfile.style}
              </p>

              <p className="text-sm sm:text-base font-sans text-stone-600 leading-relaxed font-normal mb-6">
                {activeProfile.bio}
              </p>

              <div className="mb-6 p-4 rounded-2xl bg-[#FAF9F5] border border-stone-200/80">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Signature Project
                </span>
                <p className="text-sm font-serif font-bold text-stone-900">
                  {activeProfile.signatureProject}
                </p>
              </div>

              <div className="mb-8">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-3">
                  Design Concepts & Architectural Gallery
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {activeProfile.works.map((work) => (
                    <div
                      key={work.id}
                      className="aspect-square rounded-xl bg-stone-100 border border-stone-200/90 flex flex-col items-center justify-center p-3 text-center overflow-hidden relative group/work"
                    >
                      {work.image ? (
                        <img
                          src={work.image}
                          alt={work.title}
                          className="w-full h-full object-cover rounded-lg group-hover/work:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <>
                          <ImagePlus size={18} className="text-[#8E651E] mb-1.5" />
                          <span className="text-[11px] font-sans font-medium text-stone-700 leading-tight">
                            {work.title}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-200">
                <button
                  onClick={() => {
                    setActiveProfile(null)
                    onOpenConsult?.(activeProfile)
                  }}
                  type="button"
                  className="flex-1 py-3.5 px-6 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-sans font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 cursor-pointer text-center"
                >
                  Match With {activeProfile.name}
                </button>
                <button
                  onClick={() => setActiveProfile(null)}
                  type="button"
                  className="py-3.5 px-6 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
