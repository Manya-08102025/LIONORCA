import React from 'react'
import ScrollReveal from './ScrollReveal'

export default function FoundersPhilosophy() {
  return (
    <section
      id="philosophy"
      className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-y border-stone-200/80 relative overflow-hidden"
    >
      {/* Subtle ambient luxury glow for depth */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#DEB853]/5 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
      <div className="absolute bottom-0 left-0 w-[260px] h-[260px] bg-[#DEB853]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Constrained Editorial Width Container */}
      <div className="max-w-4xl lg:max-w-[880px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* ── Left Column: Compact Founder Portrait (Minimized Size) ── */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <ScrollReveal delay={0} duration={0.8} y={20} className="w-full max-w-[200px] sm:max-w-[220px]">
              <div className="relative group">
                {/* Decorative Offset Backdrop Accent */}
                <div className="absolute -inset-1.5 rounded-[18px] border border-[#DEB853]/35 -rotate-1 transition-transform duration-500 group-hover:rotate-0 pointer-events-none" />

                {/* Main Portrait Frame - Compact & Minimized */}
                <div className="relative rounded-[15px] overflow-hidden bg-stone-900 border border-[#E5E0D8] shadow-[0_10px_25px_rgba(0,0,0,0.06)] aspect-[4/5] max-h-[270px] w-full">
                  <img
                    src="/images/akshay-jadaun.jpg"
                    alt="Akshay Jadaun - Founder & Director"
                    className="w-full h-full object-cover object-[center_18%] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle inner dark vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right Column: Philosophy Statement & Highly Legible Sans Quote ── */}
          <div className="lg:col-span-8 flex flex-col justify-center text-left">
            <ScrollReveal delay={100} duration={0.8} y={20}>
              {/* Overline: Lionorca's Ideology */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[1.5px] bg-[#9A7228]" />
                <p className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#9A7228]">
                  Lionorca's Ideology
                </p>
              </div>

              {/* Quote Container with Ambient Quotation Mark */}
              <div className="relative mb-4 sm:mb-5">
                <span
                  className="font-serif text-[60px] sm:text-[75px] text-[#DEB853]/20 leading-none absolute -top-6 -left-3 sm:-top-7 sm:-left-4 select-none pointer-events-none -z-0"
                  aria-hidden="true"
                >
                  “
                </span>

                {/* The Quote: Easy to Read, Highly Legible Modern Sans-Serif Font */}
                <blockquote className="relative z-10">
                  <p className="font-sans text-[15px] sm:text-[17px] lg:text-[18px] leading-[1.6] font-medium text-neutral-800 tracking-normal">
                    “You can’t expect your designer or architect to be creative and run the site at the same time. You need different authorities for different roles.”
                  </p>
                </blockquote>
              </div>

              {/* Founder Name & Designation */}
              <div className="pt-3 border-t border-stone-200/80">
                <h4 className="font-sans text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-snug">
                  Akshay Jadaun
                </h4>
                <p className="font-sans text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#DEB853] mt-0.5">
                  Founder &amp; Director
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
