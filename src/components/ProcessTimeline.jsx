import { Coffee, UserCheck, FileCheck, FileText, KeyRound } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const STEPS = [
  {
    step: '01',
    overline: 'STEP 1: DISCOVERY CALL',
    title: 'Getting to Know Each Other',
    icon: Coffee,
    description:
      "We sit down with you to discuss your dream home, your family's daily needs, your favorite styles, and your investment range. You will also gain an in-depth understanding of Lionorca's working model and operations.",
    deliverable: 'A complete understanding of the process.',
  },
  {
    step: '02',
    overline: 'STEP 2: CURATED MATCHING',
    title: 'Architect/Interior Designer Selection',
    icon: UserCheck,
    description:
      'Every designer has a unique signature style. We help you select our associated and well-synced architects/designers whose past work and signature style match the look you love.',
    deliverable: 'A first introductory meeting with the selected designer to share design ideas.',
  },
  {
    step: '03',
    overline: 'STEP 3: DESIGN ONBOARDING',
    title: 'Layout and 3D views',
    icon: FileCheck,
    description:
      'After the completion of the onboarding process via an agreement, the designer will propose layouts, create mood boards, and generate 3D renders of the entire space before the execution begins.',
    deliverable: 'Official agreement & 3D views.',
  },
  {
    step: '04',
    overline: 'STEP 4: ENGINEERING & FINANCIALS',
    title: 'Working Drawings & Final BOQs',
    icon: FileText,
    description:
      "Once the design is finalized, the principal designer and Lionorca's team collaborate to finalize every working drawing, material charts, and finishes. They will also prepare a detailed, BOQ-based quote with a milestone-based payment plan.",
    deliverable: 'Complete working drawings & a final quote.',
  },
  {
    step: '05',
    overline: 'STEP 5: END-TO-END EXECUTION',
    title: 'Guarded supervision & Key handover',
    icon: KeyRound,
    description:
      "Aligned with the principal designer, Lionorca's in-house team of engineers, project managers, and supervisors provide complete turnkey execution or site management consultancy until final key handover.",
    deliverable: 'A impeccably executed luxury home with full transparency, under Turnkey or Consultancy management.',
  },
]

export default function ProcessTimeline() {
  return (
    <section
      id="process"
      className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-charcoal border-t border-stone-200/80 relative overflow-hidden"
    >
      {/* Architectural Bedroom Interior Background with Refined Bokeh Blur matching reference */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-bedroom.jpg"
          alt=""
          className="w-full h-full object-cover object-[center_32%]"
          style={{
            filter: 'blur(10px) brightness(1.32) contrast(0.88) saturate(1.1)',
            transform: 'scale(1.10)',
            opacity: 0.75,
          }}
        />
        {/* Transparent Warm Glaze for contrast & legibility */}
        <div className="absolute inset-0 bg-[#FBF9F5]/30 backdrop-brightness-100" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* ─── Centered Section Header ─── */}
        <ScrollReveal duration={0.7} y={24}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <p className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#9A7228] mb-2.5">
              SIMPLE &amp; STRESS FREE
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold tracking-tight text-[#111827] leading-[1.16] mb-3.5">
              STEPS TO CLARITY
            </h2>
            <p className="font-sans text-[15px] sm:text-[16.5px] text-[#1F2937] leading-relaxed font-medium max-w-2xl mx-auto">
              A transparent 5-step journey — tailored for full turnkey execution or project management consultancy — with zero surprises.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── 5 Steps Horizontal Row Grid Matching Reference Size Exactly ─── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 lg:gap-4 xl:gap-5 items-stretch">
          {STEPS.map((item, index) => {
            const Icon = item.icon
            return (
              <ScrollReveal
                key={item.step}
                delay={index * 100}
                duration={0.8}
                y={30}
                className="h-full"
              >
                <div className="p-6 sm:p-6.5 xl:p-7 rounded-[24px] border border-[#E5E7EB] transition-all duration-300 flex flex-col justify-between h-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] hover:border-[#D6BF8A]">
                  {/* Top Header & Content */}
                  <div>
                    {/* Numeral and Line-Art Icon in Light Beige/Gold Box */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-serif text-[28px] sm:text-[30px] font-bold text-[#9A7228] leading-none">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#8E651E] flex items-center justify-center shrink-0">
                        <Icon size={19} className="stroke-[1.9]" />
                      </div>
                    </div>

                    {/* Overline in Gold/Accent Text */}
                    <div className="text-[10.5px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.14em] mb-2 text-[#9A7228]">
                      {item.overline}
                    </div>

                    {/* Card Title (Modern Clean Sans-Serif, Bold, Dark Slate) */}
                    <h3 className="text-[17px] sm:text-[18px] lg:text-[18.5px] font-sans font-bold mb-2.5 text-[#1A1A1A] leading-snug">
                      {item.title}
                    </h3>

                    {/* Body Text: High-contrast Dark Slate / Black, Modern Sans-Serif, Increased Legible Size */}
                    <p className="text-[14px] lg:text-[14.5px] xl:text-[15px] font-sans font-normal leading-[1.65] text-[#1A1A1A]">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer / Highlight: Deliverable (WHAT YOU GET) */}
                  <div className="mt-6 pt-4 border-t border-stone-200/80">
                    <p className="font-sans leading-relaxed">
                      <strong className="font-bold text-[#9A7228] uppercase tracking-wider block text-[11px] mb-1">
                        WHAT YOU GET:
                      </strong>
                      <span className="text-[13px] lg:text-[13.5px] font-medium text-gray-900 leading-snug block">
                        {item.deliverable}
                      </span>
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
