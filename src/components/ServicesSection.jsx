import ScrollReveal from './ScrollReveal'

export const SERVICES_PROJECT_TYPES = [
  {
    id: 'bespoke-villas',
    title: 'Bespoke Villas',
    image: '/images/services/bespoke-villas.jpg',
    fallbackImage: '/images/bg-villa.jpg',
  },
  {
    id: 'premium-apartments',
    title: 'Premium Apartments',
    image: '/images/services/premium-apartments.jpg',
    fallbackImage: '/images/bg-penthouse.jpg',
  },
  {
    id: 'visionary-offices',
    title: 'Visionary Office Spaces',
    image: '/images/services/visionary-offices.jpg',
    fallbackImage: '/images/hero-slide-1.png',
  },
  {
    id: 'serene-farmhouses',
    title: 'Serene Farmhouses',
    image: '/images/services/serene-farmhouses.jpg',
    fallbackImage: '/images/hero-bright-1.jpg',
  },
  {
    id: 'multistorey-buildings',
    title: 'Multi-storey Buildings',
    image: '/images/services/multistorey-buildings.jpg',
    fallbackImage: '/images/hero-arch-2.jpg',
  },
]

export default function ServicesSection({ onOpenConsult }) {
  return (
    <section
      id="services"
      className="py-12 sm:py-16 lg:py-20 bg-[#FCFCFA] text-stone-900 relative overflow-hidden border-t border-stone-200/80"
    >
      {/* Subtle Warm Luxury Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#E8BC4C]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* ─── Centered Two-Line Headline Only ─── */}
        <ScrollReveal duration={0.7} y={20}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-[#111827] leading-[1.18]">
              <span>Every Kind of </span>
              <span className="text-[#8E651E] not-italic">Luxury.</span>
              <span className="block mt-1 sm:mt-1.5 text-[#111827]">Delivered Complete.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* ─── 5 Project Types: Clean Picture + Heading Only (No Badges/Icons) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4 xl:gap-5 items-stretch">
          {SERVICES_PROJECT_TYPES.map((item, index) => (
            <ScrollReveal
              key={item.id}
              delay={index * 80}
              duration={0.7}
              y={24}
              className="h-full"
            >
              <div
                onClick={() =>
                  onOpenConsult?.({
                    name: item.title,
                    typology: item.title,
                  })
                }
                className="rounded-3xl border border-stone-200/90 p-3.5 sm:p-4 transition-all duration-300 flex flex-col group h-full bg-white/95 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(142,101,30,0.14)] hover:border-[#D4AC55]/80 hover:-translate-y-1 cursor-pointer"
              >
                {/* Clean, Large Picture (Pure Photograph) */}
                <div className="relative aspect-[4/3.2] sm:aspect-[4/3.3] rounded-2xl overflow-hidden bg-stone-100 mb-3.5 border border-stone-200/60 shadow-xs">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = item.fallbackImage
                    }}
                  />
                </div>

                {/* Main Typology Heading Below */}
                <div className="py-2.5 text-center flex-1 flex items-center justify-center">
                  <h3 className="font-serif text-lg sm:text-xl lg:text-[19px] xl:text-[21px] font-bold text-[#111827] group-hover:text-[#8E651E] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
