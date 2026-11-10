import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    title: 'The Courtyard Villa',
    typology: 'Villa',
    architect: 'Architect 1 (Indore)',
    location: 'Bypass Corridor, Indore',
    specs: '5 BHK Luxury Villa • 4,500 sq.ft',
    description: 'Clean geometry, cantilevered pergolas, and an internal light courtyard designed for passive cross-ventilation.',
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
    description: 'Handcrafted sandstone arches, high ceilings, classical colonnades, and sprawling landscaped lawns.',
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function PortfolioGallery({ onSelectProject, projects: propProjects, data }) {
  const [selectedTypology, setSelectedTypology] = useState('All')

  const rawProjects = propProjects || (Array.isArray(data) ? data : data?.projects) || PROJECTS
  const projectList = rawProjects.map((p, idx) => ({
    id: p._id || p.id || idx + 1,
    title: p.title || p.name || `Signature Project ${idx + 1}`,
    typology: p.typology || p.category || 'Villa',
    architect: p.architect?.name || p.architect || 'Curated Studio',
    location: p.location || 'Indore & Central India',
    specs: p.specs || p.dimensions || 'Bespoke Residence',
    description: p.description || p.excerpt || 'Handcrafted luxury residence executed with single-contract turnkey precision.',
    image: p.image?.asset?.url || p.image || p.coverImage || p.mainImage || '/images/bg-villa.jpg',
  }))

  const filteredProjects =
    selectedTypology === 'All'
      ? projectList
      : projectList.filter((p) => p.typology.toLowerCase() === selectedTypology.toLowerCase())

  return (
    <section
      id="houses"
      className="py-28 sm:py-36 lg:py-40 bg-[#FAF9F5] text-charcoal relative overflow-hidden border-t border-stone-200/80"
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
          {/* ─── Asymmetric Header ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={fadeUp}
              className="lg:col-span-7"
            >
              <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.25em] text-[#8E651E] mb-4">
                Signature Projects
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.18] mb-5">
                Signature Portfolio & Residences
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={1}
              variants={fadeUp}
              className="lg:col-span-5 flex items-end"
            >
              <p className="font-sans text-lg sm:text-xl lg:text-2xl text-stone-600 max-w-2xl leading-relaxed font-normal">
                Indore and Central India signature villas, penthouses, and bespoke bungalows delivered with turnkey precision.
              </p>
            </motion.div>
          </div>

          {/* ─── Typology Filter Pills ─── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={fadeUp}
            className="flex items-center gap-3 sm:gap-4 mb-14 flex-wrap"
          >
            {TYPOLOGIES.map((typology) => (
              <button
                key={typology}
                onClick={() => setSelectedTypology(typology)}
                type="button"
                className={`px-7 py-3 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wider transition-all cursor-pointer ${
                  selectedTypology === typology
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white/90 hover:bg-white text-stone-700 border border-stone-200 hover:text-stone-900'
                }`}
              >
                {typology === 'All' ? 'All Residences' : `${typology}s`}
              </button>
            ))}
          </motion.div>

          {/* ─── Staggered Project Cards ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                custom={index % 3}
                variants={fadeUp}
                className={`h-full ${index % 3 === 1 ? 'lg:mt-12' : ''}`}
              >
                <div className="rounded-3xl border border-stone-200/90 overflow-hidden transition-all duration-300 flex flex-col justify-between luxury-card-hover h-full bg-white/95 hover:bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(46,45,43,0.10)] group">
                  <div>
                    {/* Real Project Photograph with Editorial Framing */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                      
                      {/* Typology Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-xs font-sans font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-stone-900 border border-stone-200 shadow-sm">
                          {project.typology}
                        </span>
                      </div>

                      {/* Location & Specs */}
                      <div className="absolute bottom-3.5 left-4 right-4 z-10 flex items-center justify-between text-xs sm:text-[13px] font-sans text-white drop-shadow-md font-semibold">
                        <span>{project.location}</span>
                        <span className="text-[#E0B568] font-bold">{project.specs.split('•')[0]}</span>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-8 sm:p-9">
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="text-xs font-sans font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full text-[#8E651E] bg-[#8E651E]/10 border border-[#8E651E]/20">
                          {project.specs.split('•')[1] || project.typology}
                        </span>
                        <span className="text-xs sm:text-sm font-sans font-semibold text-stone-500">
                          {project.architect}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3 text-stone-900 group-hover:text-[#8E651E] transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base font-sans font-normal leading-relaxed text-stone-600">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Inquire Action Button */}
                  <div className="px-8 pb-8">
                    <button
                      onClick={() => onSelectProject(project)}
                      type="button"
                      className="w-full py-4 px-5 rounded-2xl text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all bg-stone-900 hover:bg-[#8E651E] text-white cursor-pointer flex items-center justify-center gap-2.5 active:scale-98 shadow-sm"
                    >
                      <span>Inquire About This Design</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  )
}