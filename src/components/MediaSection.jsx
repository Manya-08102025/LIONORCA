import { useState } from 'react'
import { Play, Radio, Film, Video, ArrowRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function MediaSection({ onOpenConsult }) {
  const [activeMedia, setActiveMedia] = useState(null)

  const mediaItems = [
    {
      id: 'media-1',
      type: 'podcast',
      badge: 'Architecture Podcast',
      icon: Radio,
      title: 'Episode 12: Why Metro Architects Need Local Site Rigor in MP',
      guest: 'With Ar. Rohit Saxena (Mumbai) & LA Engineering Head',
      duration: '38 mins',
      thumbnail: '/images/hero-slide-1.png',
      description:
        'A frank discussion on the biggest fear of Central India homeowners: hiring Mumbai or Delhi designers without reliable local turnkey execution.',
      linkText: 'Listen to Episode',
    },
    {
      id: 'media-2',
      type: 'reel',
      badge: 'Design Reel',
      icon: Film,
      title: 'The Courtyard Villa: 3D Render vs. Real Site Delivery',
      guest: 'Project Walkthrough • Indore Bypass',
      duration: '90 secs',
      thumbnail: '/images/hero-slide-2.png',
      description:
        'Watch a side-by-side comparison of the initial 3D visualization and the completed villa handover in Indore with zero finish compromise.',
      linkText: 'Watch Short Video',
    },
    {
      id: 'media-3',
      type: 'education',
      badge: 'Site Education',
      icon: Video,
      title: 'How Token Locking Protects Your Luxury Home Budget',
      guest: 'Turnkey Masterclass Series',
      duration: '14 mins',
      thumbnail: '/images/hero-slide-3.png',
      description:
        'Understand how our 5-10% design token and working drawings system guarantees that your final quote never inflates mid-construction.',
      linkText: 'Watch Masterclass',
    },
  ]

  return (
    <section
      id="media"
      className="py-24 sm:py-32 border-t border-b border-[#D4AC55]/30 bg-[#F8F6F1] text-stone-900 relative overflow-hidden"
    >
      {/* Clearly Visible Luxury Architectural Studio Background with Refined Soft Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-slide-1.png"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(8px)',
            transform: 'scale(1.10)',
            opacity: 0.58,
          }}
        />
        {/* Soft, Transparent Light Glaze to keep videos and media cards sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/35" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-80 bg-[#D4AC55]/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#C99E4A]/12 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="blur-up">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.25em] text-[#8E651E] mb-3">
              Media &amp; Insights
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-stone-900 leading-[1.18] mb-4">
              Podcasts, Reels &amp; Site Education
            </h2>
            <p className="font-sans text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Real site walkthroughs, architectural masterclasses, and transparent discussions on luxury home building.
            </p>
          </div>
        </ScrollReveal>

        {/* Media Cards Grid with Staggered Scroll Entry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mediaItems.map((item, index) => {
            const Icon = item.icon
            return (
              <ScrollReveal
                key={item.id}
                delay={index * 120}
                className="h-full"
              >
                <div
                  className="rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 group luxury-card-hover h-full bg-white/88 backdrop-blur-2xl border-[#D4AC55]/30 hover:border-[#D4AC55] shadow-[0_10px_35px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(212,172,85,0.18)] hover:-translate-y-1.5"
                >
                  <div>
                    {/* Media Thumbnail with Play Overlay */}
                    <div
                      className="relative aspect-[16/10] overflow-hidden bg-stone-900 cursor-pointer"
                      onClick={() => setActiveMedia(item)}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-soft font-bold tracking-wider uppercase text-white/90 border border-white/10">
                          <Icon size={11} className="text-[#D4AC55]" />
                          <span>{item.badge}</span>
                        </span>
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-12 h-12 rounded-full bg-[#D4AC55] text-neutral-950 flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-transform">
                          <Play size={22} className="fill-neutral-950 ml-0.5" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 z-10 text-[10px] font-sans font-bold text-white/95 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                        {item.duration}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="text-[11px] font-soft font-bold mb-1 text-[#8E651E]">
                        {item.guest}
                      </div>
                      <h3 className="text-lg font-soft font-bold mb-2.5 leading-snug transition-colors text-stone-900 group-hover:text-[#8E651E]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] font-soft leading-relaxed text-stone-600">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setActiveMedia(item)}
                      type="button"
                      className="w-full py-3 px-4 rounded-xl border text-xs font-soft font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border-stone-300 bg-white hover:bg-[#D4AC55] hover:text-neutral-950 hover:border-[#D4AC55] text-stone-800 shadow-xs"
                    >
                      <span>Watch Now</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>

      {/* =========================================================================
          MEDIA PLAYBACK PREVIEW MODAL
      ========================================================================= */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveMedia(null)}
          />

          <div className="relative w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 my-8 z-10 transition-all bg-white text-stone-900">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
              <span className="text-xs uppercase font-bold tracking-widest text-[#8E651E]">
                {activeMedia.badge}
              </span>
              <button
                onClick={() => setActiveMedia(null)}
                type="button"
                className="text-xs text-stone-400 hover:text-stone-900 cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden bg-black relative mb-4 flex items-center justify-center">
              <img
                src={activeMedia.thumbnail}
                alt={activeMedia.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] text-neutral-950 flex items-center justify-center shadow-2xl mb-3 cursor-pointer hover:scale-105 transition-transform">
                  <Play size={28} className="fill-neutral-950 ml-1" />
                </div>
                <span className="text-white text-xs font-soft font-semibold bg-black/60 px-3 py-1 rounded-md backdrop-blur-md">
                  Preview Video Loaded ({activeMedia.duration})
                </span>
              </div>
            </div>

            <h3 className="text-xl font-soft font-bold mb-2 text-stone-900">
              {activeMedia.title}
            </h3>
            <p className="text-xs sm:text-sm font-soft leading-relaxed mb-6 text-stone-600">
              {activeMedia.description}
            </p>

            <button
              onClick={() => setActiveMedia(null)}
              type="button"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] text-neutral-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer border border-[#B3872E]/30"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
