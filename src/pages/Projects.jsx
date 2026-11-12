import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Sparkles,
  MapPin,
  Building,
  X,
  CheckCircle2,
} from 'lucide-react'
import { PROJECTS, TYPOLOGIES, ProjectCard } from '../components/PortfolioGallery'

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

export default function Projects({ onOpenConsult, onBack, projects: propProjects, data }) {
  const [selectedTypology, setSelectedTypology] = useState('All')
  const [activeProject, setActiveProject] = useState(null)

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

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate'))
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  const handleInquire = (project) => {
    if (onOpenConsult) {
      onOpenConsult({ name: project.title, notes: `Inquiry regarding ${project.title} (${project.typology})` })
    }
  }

  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-28 min-h-screen bg-[#FAF9F5] text-charcoal relative">
      {/* Blurred Luxury Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bg-villa.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(10px)',
            transform: 'scale(1.10)',
            opacity: 0.38,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F5]/85 via-[#FAF9F5]/65 to-[#FAF9F5]/90" />
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
            {projectList.length} Signature Residences
          </span>
        </div>

        {/* ─── Editorial Header (Standardized Typography) ─── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.25em] text-[#8E651E] mb-3">
            Curated Residential Portfolio
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-stone-900 leading-[1.18] mb-4">
            All Signature Projects &amp; Residences
          </h1>
          <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Indore and Central India signature villas, penthouses, and bespoke bungalows delivered with single-contract turnkey precision and singular accountability.
          </p>
        </div>

        {/* ─── Typology Filter Pills ─── */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-12 sm:mb-16 flex-wrap">
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

        {/* ─── All Projects Full Grid ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={cardVariants} className="h-full">
              <ProjectCard
                project={project}
                onSelect={setActiveProject}
                onInquire={handleInquire}
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
            <span>Schedule a Discovery Session</span>
          </button>
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
                      handleInquire(proj)
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
    </div>
  )
}

