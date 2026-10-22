import { Building2, CheckCircle2 } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function ValueProposition() {
  const contrasts = [
    {
      problemTitle: 'Dealing with Too Many People',
      problemDesc:
        'You have to manage the architect, different contractors, and daily labor yourself. It turns into a constant headache.',
      promiseTitle: 'Everything at One Place',
      promiseDesc:
        'You talk to just one team. Linorca handles the architects, contractors, materials, and daily site work for you.',
    },
    {
      problemTitle: 'No One Takes Responsibility',
      problemDesc:
        'When something goes wrong, the architect blames the builder and the builder blames the drawings. Nobody owns the mistake.',
      promiseTitle: 'We Take Full Responsibility',
      promiseDesc:
        'Linorca owns the outcome from the first sketch to final keys. If anything isn’t right, we fix it—no excuses.',
    },
    {
      problemTitle: 'Hidden Costs & Constant Delays',
      problemDesc:
        'Initial quotes look cheap, but prices shoot up mid-project with surprise bills and endless project delays.',
      promiseTitle: 'Fixed Price & On-Time Handover',
      promiseDesc:
        'Clear, fixed milestone costs agreed upfront before construction starts. Zero hidden fees and guaranteed timelines.',
    },
    {
      problemTitle: 'House Doesn’t Match the 3D Design',
      problemDesc:
        'The 3D design looks stunning on a screen, but normal local contractors fail to build it properly in real life.',
      promiseTitle: 'What You See Is What Gets Built',
      promiseDesc:
        'Your real home matches the 3D design 100%. We select every material and supervise construction daily.',
    },
  ]

  return (
    <section
      id="turnkey"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-stone-200/80 bg-[#F9F7F2] text-[#0F172A] relative overflow-hidden"
    >
      {/* Clearly Visible Luxury Interior Design Background with Refined Soft Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bg-villa.jpg"
          alt=""
          className="w-full h-full object-cover ambient-bg-float"
          style={{
            filter: 'blur(6px)',
            transform: 'scale(1.10)',
            opacity: 0.52,
          }}
        />
        {/* Transparent Soft Light Glaze to keep typography sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/35" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#D4AC55]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#B88D38]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - Smooth Blur Up Reveal */}
        <ScrollReveal animation="blur-up" duration={900}>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <p className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#8E651E] mb-3">
              The Problem & The Promise
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.2] mb-4">
              Building a luxury home shouldn’t be a headache.
            </h2>

            <p className="font-sans text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
              With normal contractors, you run between architects and workers with zero accountability.
              With <strong className="text-stone-900 font-bold">LIONORCA</strong>, we handle everything for you under one roof.
            </p>
          </div>
        </ScrollReveal>

        {/* Clean Side-by-Side Comparison with Staggered Scroll Entry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* THE PROBLEM (Normal Contractors) - Smooth Soft-Scale Entry */}
          <ScrollReveal animation="soft-scale" delay={120} duration={850} className="h-full">
            <div className="h-full p-6 sm:p-8 rounded-2xl bg-white/90 backdrop-blur-xl border border-stone-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.04)] text-left luxury-card-hover flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 pb-4 mb-6 border-b border-stone-200">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 border border-stone-200 flex items-center justify-center shrink-0">
                    <Building2 size={20} className="stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-stone-500 block">
                      Normal Contractors
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                      The Daily Headache
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  {contrasts.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 bg-stone-150 bg-stone-200/70 text-stone-600">
                        –
                      </span>
                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold mb-1 text-stone-900">
                          {item.problemTitle}
                        </h4>
                        <p className="font-sans text-xs sm:text-sm leading-relaxed text-stone-600">
                          {item.problemDesc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* THE LINORCA PROMISE (Everything in One Place) - Smooth Soft-Scale Entry */}
          <ScrollReveal animation="soft-scale" delay={240} duration={850} className="h-full">
            <div className="h-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FCF8EE]/95 via-white/95 to-[#F9F5EC]/95 backdrop-blur-xl border-2 border-[#D4AC55]/50 shadow-[0_20px_45px_rgba(212,172,85,0.14)] text-left luxury-card-hover flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 pb-4 mb-6 border-b border-[#8E651E]/20">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] text-neutral-950 flex items-center justify-center shrink-0 shadow-xs">
                    <CheckCircle2 size={20} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#8E651E] block">
                      Why Lionorca is Different
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                      Everything in One Place
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  {contrasts.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 bg-[#8E651E]/15 text-[#8E651E]">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold mb-1 text-[#8E651E]">
                          {item.promiseTitle}
                        </h4>
                        <p className="font-sans text-xs sm:text-sm leading-relaxed text-stone-700 font-medium">
                          {item.promiseDesc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
