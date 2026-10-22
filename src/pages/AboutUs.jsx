import { useState } from 'react'
import { Play, Sparkles, Shield, Award, Users, CheckCircle2, Phone, Video } from 'lucide-react'

export default function AboutUs({ onOpenConsult }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="pt-24 min-h-screen bg-[#FFFFFF] text-[#0F172A]">
      {/* Header */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] to-[#FFFFFF] border-b border-slate-100 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D1B67F]/15 border border-[#D1B67F]/30 text-[#9E7D3B] text-xs font-semibold uppercase tracking-[0.22em] mb-4">
            <Video size={13} className="text-[#D1B67F]" />
            <span>Video Explanation & Consultation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-5">
            The Turnkey Philosophy &bull; About Linorga
          </h1>
          <p className="font-soft text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Watch our 3-minute video breakdown explaining how Linorga bridges the gap between visionary regional architects and precision site execution.
          </p>
        </div>
      </section>

      {/* Video Player Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center group">
          {/* Video Placeholder Poster Background */}
          <img
            src="/images/hero-bg.png"
            alt="Linorga Video Overview"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Interactive Play Button */}
          {!isPlaying ? (
            <div className="relative z-10 flex flex-col items-center gap-4 text-center p-6">
              <button
                onClick={() => setIsPlaying(true)}
                type="button"
                aria-label="Play video presentation"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#D1B67F] hover:bg-[#c2a56c] text-[#0F172A] flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
              >
                <Play size={32} className="fill-[#0F172A] ml-1" />
              </button>
              <div className="space-y-1">
                <span className="text-white font-serif text-lg sm:text-xl font-bold block">
                  Watch: The Turnkey Solution in 3 Minutes
                </span>
                <span className="text-slate-300 text-xs sm:text-sm font-soft block">
                  How Linorga delivers high-end custom homes with guaranteed milestones
                </span>
              </div>
            </div>
          ) : (
            <div className="relative z-10 w-full h-full p-4 flex flex-col items-center justify-center text-center text-white bg-black/90">
              <div className="max-w-md space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#D1B67F]/20 text-[#D1B67F] flex items-center justify-center mx-auto">
                  <Video size={28} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Video Presentation Demo
                </h3>
                <p className="text-sm text-slate-300 font-soft leading-relaxed">
                  "At Linorga, our turnkey model is simple: you approve the drawings, and we execute every brick, beam, and finish with verified milestones."
                </p>
                <div className="pt-2">
                  <button
                    onClick={onOpenConsult}
                    type="button"
                    className="px-6 py-3 rounded-full bg-[#D1B67F] text-[#0F172A] font-semibold text-xs tracking-wider uppercase"
                  >
                    Book Your Live Consultation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Brand Story & Philosophy */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
              Our Origin
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
              Built on Transparency & Craftsmanship
            </h2>
            <p className="font-soft text-base text-slate-600 leading-relaxed">
              Linorga was founded in Indore to solve the single biggest headache in Indian luxury construction: the constant friction between visionary architectural drawings and ground-level labor execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#D1B67F]/15 text-[#9E7D3B] flex items-center justify-center mb-3">
                <Shield size={20} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0F172A] mb-2">Unified Accountability</h3>
              <p className="text-sm text-slate-600 font-soft leading-relaxed">
                We contractually assume 100% responsibility for structural stability, aesthetic conformity, procurement quality, and timely handover.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#D1B67F]/15 text-[#9E7D3B] flex items-center justify-center mb-3">
                <Award size={20} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0F172A] mb-2">Architectural Sanctity</h3>
              <p className="text-sm text-slate-600 font-soft leading-relaxed">
                We never compromise on architectural design. The finishes, spatial proportions, and lighting you fell in love with on screen will be real in your living room.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenConsult}
              type="button"
              className="px-8 py-4 rounded-full bg-[#D1B67F] hover:bg-[#c2a56c] text-[#0F172A] font-semibold text-xs tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Book a Video Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
