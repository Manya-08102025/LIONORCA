import React from 'react'
import ScrollReveal from './ScrollReveal'

export default function FoundersPhilosophy() {
  return (
    <section
      id="philosophy"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-y border-stone-200/80 relative overflow-hidden"
    >
      {/* Subtle ambient luxury glow for depth */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#DEB853]/5 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#DEB853]/5 rounded-full blur-3xl pointer-events-none -ml-28 -mb-28" />

      {/* Constrained Editorial Width Container */}
      <div className="max-w-4xl lg:max-w-[960px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* ── Left Column: Compact Founder Portrait ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <ScrollReveal delay={0} duration={0.8} y={30} className="w-full max-w-[270px] sm:max-w-[300px]">
              <div className="relative group">
                {/* Decorative Offset Backdrop Accent */}
                <div className="absolute -inset-2 rounded-[22px] border border-[#DEB853]/35 -rotate-1 transition-transform duration-500 group-hover:rotate-0 pointer-events-none" />

                {/* Main Portrait Frame - Capped Height for Compact Elegance */}
                <div className="relative rounded-[18px] overflow-hidden bg-stone-900 border border-[#E5E0D8] shadow-[0_14px_35px_rgba(0,0,0,0.06)] aspect-[4/5] max-h-[370px] w-full">
                  <img
                    src="/images/akshay-jadaun.jpg"
                    alt="Akshay Jadaun - Founder & Director"
                    className="w-full h-full object-cover object-[center_18%] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle inner dark vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right Column: Philosophy Statement & Editorial Quote ── */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <ScrollReveal delay={120} duration={0.8} y={30}>
              {/* Overline */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-7 h-[1.5px] bg-[#9A7228]" />
                <p className="text-[10.5px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#9A7228]">
                  Founder's Philosophy
                </p>
              </div>

              {/* Quote Container with Scaled-Down Ambient Quotation Mark */}
              <div className="relative mb-6 sm:mb-7">
                <span
                  className="font-serif text-[80px] sm:text-[100px] text-[#DEB853]/20 leading-none absolute -top-8 -left-4 sm:-top-10 sm:-left-5 select-none pointer-events-none -z-0"
                  aria-hidden="true"
                >
                  “
                </span>

                {/* The Quote (Refined Editorial Scale) */}
                <blockquote className="relative z-10">
                  <p className="font-serif text-xl sm:text-2xl lg:text-[25px] xl:text-[27px] leading-[1.38] font-normal text-gray-900 tracking-tight">
                    “You can’t expect your designer or architect to be creative and run the site at the same time. You need different authorities for different roles.”
                  </p>
                </blockquote>
              </div>

              {/* Founder Name & Designation (Golden Pill Removed) */}
              <div className="pt-4 border-t border-stone-200/80">
                <h4 className="font-sans text-lg sm:text-xl font-bold text-gray-900 tracking-tight leading-snug">
                  Akshay Jadaun
                </h4>
                <p className="font-sans text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#DEB853] mt-0.5">
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
