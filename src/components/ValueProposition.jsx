import { Building2, CheckCircle2 } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function ValueProposition() {
  const regularItems = [
    {
      title: 'Limited Site Visits and Unlimited Mistakes',
      desc: 'The site needs multiple quality checks, but visits are limited under the contract, resulting in multiple flaws.',
    },
    {
      title: 'Multiple Authorities - Pending Decisions',
      desc: 'Without clear ground rules defining authority, decision-making breaks down and causes significant delays.',
    },
    {
      title: 'Civil & Interior Coordination - The Haunting Tales',
      desc: 'Interior team enters when most of the ground changes are already missed by the civil team & you end up either compromising or paying the damages.',
    },
  ]

  const lionorcaItems = [
    {
      title: 'Multiple Visits & Complete Control',
      desc: 'Every step is preplanned and executed. Regular inspections are performed by Lionorca’s in-house team.',
    },
    {
      title: 'Predefined Authorities',
      desc: 'Clearly establishes decision-makers and timelines before design work starts.',
    },
    {
      title: 'We manage responsibilities from every end.',
      desc: 'Whether it is design or payment, every step is approved before being executed.',
    },
    {
      title: 'Single Point Coordination for Both Civil & Interior',
      desc: 'Whether it’s a civil or interior work, everything will flow through Lionorca’s execution funnel. We decide who will enter & when.',
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
              Building a <span className="text-[#C5A059] font-bold">luxury project</span> is more <br className="hidden sm:inline" /> than what you think.
            </h2>

            <p className="font-sans text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
              A luxury project requires more than 70 contractors and vendors to coordinate. A lack of knowledge, expertise, or time can cost you your budget, quality of work, peace of mind, and current profession.
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
                      REGULAR MODEL
                    </span>
                    <h3 className="font-['Playfair_Display',serif] text-[23px] sm:text-[24px] font-bold text-[#111827] leading-snug">
                      The Daily Headache
                    </h3>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#F3F4F6] my-4.5" />

                <div className="space-y-4.5 sm:space-y-5">
                  {regularItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <span className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 bg-[#E5E7EB] text-[#4B5563]">
                        –
                      </span>
                      <div>
                        <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] sm:text-[16px] font-bold mb-0.5 text-[#111827] leading-snug">
                          {item.title}
                        </h4>
                        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[12.5px] sm:text-[13px] leading-[1.55] text-[#4B5563] font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* THE LIONORCA PROMISE (Lionorca's Model) */}
          <ScrollReveal delay={120} duration={0.8} y={30} className="h-full">
            <div className="h-full p-7 sm:p-8 rounded-[24px] bg-[#FCF9F2] border-[1.5px] border-[#DECA9E] shadow-[0_8px_30px_rgba(202,168,103,0.12)] text-left luxury-card-hover flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#B88E3E] text-[#111827] flex items-center justify-center shrink-0 shadow-xs">
                    <CheckCircle2 size={19.5} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[10.5px] sm:text-[11px] font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-[0.16em] text-[#9A7228] block leading-tight">
                      LIONORCA'S MODEL
                    </span>
                    <h3 className="font-['Playfair_Display',serif] text-[23px] sm:text-[24px] font-bold text-[#111827] leading-snug">
                      The Complete Delivery
                    </h3>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#EBDDBF] my-4.5" />

                <div className="space-y-4.5 sm:space-y-5">
                  {lionorcaItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <span className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 bg-[#EFE3C8] text-[#9A7228]">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] sm:text-[16px] font-bold mb-0.5 text-[#9A7228] leading-snug">
                          {item.title}
                        </h4>
                        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[12.5px] sm:text-[13px] leading-[1.55] text-[#374151] font-normal">
                          {item.desc}
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
