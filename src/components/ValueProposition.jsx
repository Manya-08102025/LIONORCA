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
        'You talk to just one team. Lionorca handles the architects, contractors, materials, and daily site work for you.',
    },
    {
      problemTitle: 'No One Takes Responsibility',
      problemDesc:
        'When something goes wrong, the architect blames the builder and the builder blames the drawings. Nobody owns the mistake.',
      promiseTitle: 'We Take Full Responsibility',
      promiseDesc:
        'Lionorca owns the outcome from the first sketch to final keys. If anything isn’t right, we fix it—no excuses.',
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
      problemTitle: 'Multiple Authorities – Pending Decisions',
      problemDesc:
        'No ground rules over authority leads to multiple failure over several decisions resulting in delays.',
      promiseTitle: 'Pre-Defined Authorities',
      promiseDesc:
        'Who will take which decision and when. This is pre-discussed and assigned even before the beginning of the designs.',
    },
  ]

  return (
    <section
      id="turnkey"
      className="scroll-mt-20 sm:scroll-mt-24 pt-16 sm:pt-20 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-t border-stone-200/80 bg-[#FAF8F5] text-[#0F172A] relative overflow-hidden"
    >
      {/* Editorial Blurred Luxury Interior Background with luminous contrast */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-bright-1.jpg"
          alt=""
          className="w-full h-full object-cover object-[center_72%]"
          style={{
            filter: 'blur(12px)',
            transform: 'scale(1.10)',
            opacity: 0.85,
          }}
        />
        {/* Soft, translucent luminous glaze for high contrast and pure champagne radiance */}
        <div className="absolute inset-0 bg-[#FAF9F5]/55" />
      </div>

      <div className="max-w-[1180px] mx-auto relative z-10">
        {/* Header - Smooth Editorial Reveal */}
        <ScrollReveal duration={0.7} y={24}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-[#111827] leading-[1.18] mb-4">
              Building a <span className="text-[#C5A059] font-bold">luxury home</span> is more <br className="hidden sm:inline" /> than what you think.
            </h2>

            <p className="font-sans text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
              A luxury home requires more than 70 contractors &amp; vendors to coordinate. Absence of your knowledge &amp; time can cost you quality of your home, your money, your work &amp; your peace.
            </p>
          </div>
        </ScrollReveal>

        {/* Clean Side-by-Side Comparison with Staggered Scroll Entry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* THE PROBLEM (Normal Contractors) */}
          <ScrollReveal delay={0} duration={0.8} y={30} className="h-full">
            <div className="h-full p-7 sm:p-8 rounded-[24px] bg-white border border-[#E5E7EB] shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-left luxury-card-hover flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F3F4F6] text-[#4B5563] flex items-center justify-center shrink-0">
                    <Building2 size={19.5} className="stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="text-[10.5px] sm:text-[11px] font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-[0.16em] text-[#6B7280] block leading-tight">
                      Regular Setup
                    </span>
                    <h3 className="font-['Playfair_Display',serif] text-[23px] sm:text-[24px] font-bold text-[#111827] leading-snug">
                      The Daily Headache
                    </h3>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#F3F4F6] my-4.5" />

                <div className="space-y-4.5 sm:space-y-5">
                  {contrasts.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <span className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 bg-[#E5E7EB] text-[#4B5563]">
                        –
                      </span>
                      <div>
                        <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] sm:text-[16px] font-bold mb-0.5 text-[#111827] leading-snug">
                          {item.problemTitle}
                        </h4>
                        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[12.5px] sm:text-[13px] leading-[1.55] text-[#4B5563] font-normal">
                          {item.problemDesc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* THE LIONORCA PROMISE (Why Lionorca is Different) */}
          <ScrollReveal delay={120} duration={0.8} y={30} className="h-full">
            <div className="h-full p-7 sm:p-8 rounded-[24px] bg-[#FCF9F2] border-[1.5px] border-[#DECA9E] shadow-[0_8px_30px_rgba(202,168,103,0.12)] text-left luxury-card-hover flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#B88E3E] text-[#111827] flex items-center justify-center shrink-0 shadow-xs">
                    <CheckCircle2 size={19.5} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[10.5px] sm:text-[11px] font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-[0.16em] text-[#9A7228] block leading-tight">
                      Why Lionorca is Different
                    </span>
                    <h3 className="font-['Playfair_Display',serif] text-[23px] sm:text-[24px] font-bold text-[#111827] leading-snug">
                      Everything in One Place
                    </h3>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#EBDDBF] my-4.5" />

                <div className="space-y-4.5 sm:space-y-5">
                  {contrasts.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <span className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 bg-[#EFE3C8] text-[#9A7228]">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] sm:text-[16px] font-bold mb-0.5 text-[#9A7228] leading-snug">
                          {item.promiseTitle}
                        </h4>
                        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[12.5px] sm:text-[13px] leading-[1.55] text-[#374151] font-normal">
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
