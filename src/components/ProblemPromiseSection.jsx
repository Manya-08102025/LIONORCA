import React from 'react'
import { ArrowUpRight, Check, AlertCircle, Sparkles } from 'lucide-react'

export default function ProblemPromiseSection({ onOpenConsult }) {
  const points = [
    {
      num: '01',
      title: 'Fractured Responsibility',
      traditional: 'Architects design without construction feasibility; contractors cut corners. Nobody takes final ownership of mistakes.',
      lionorca: 'Single-contract accountability. The architects who design your residence oversee every poured foundation and millwork joint.',
    },
    {
      num: '02',
      title: 'Commercial Budget Drift',
      traditional: 'Artificially low initial estimates turn into aggressive mid-project revisions and unapproved material downgrades.',
      lionorca: 'Transparent, itemized BOQ with fixed material milestones. No surprise markups, no unapproved substitutions.',
    },
    {
      num: '03',
      title: 'Compromised Detailing',
      traditional: 'Intricate 3D visuals get lost in execution due to unskilled labor and lack of precision site templates.',
      lionorca: 'Full-time site engineers and master artisans executing handpicked Italian marble, microtopping, and custom woodwork.',
    },
  ]

  return (
    <section className="relative w-full bg-transparent text-sol-espresso py-20 sm:py-28 px-5 sm:px-8 lg:px-16 border-t border-sol-border/60">
      <div className="max-w-7xl mx-auto">
          {/* Editorial Headline & Subheading */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-sol-border">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-semibold sm:font-bold text-[#1E1D1C] leading-[1.12] tracking-tight">
                Building a luxury home <br />
                <span className="italic font-semibold text-[#A6823B] font-serif">is more than what you think.</span>
              </h2>
            </div>

            <div className="max-w-lg">
              <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#1E1D1C] leading-relaxed font-medium">
                A luxury home requires more than 70 contractors & vendors to coordinate. Absence of your knowledge & time can cost you quality of your home, your money, your work & your peace.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-sans text-[#2E2D2B] font-medium uppercase tracking-wider">
                <span>Indore</span>
                <span>•</span>
                <span>Central India</span>
                <span>•</span>
                <span>Metro Delivery</span>
              </div>
            </div>
          </div>

          {/* Layered Architectural Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-14 items-stretch">
            
            {/* Card 1: The Traditional Friction (Warm Stone Mid-Tone Plane) */}
            <div className="lg:col-span-5 bg-sol-stone/70 rounded-2xl p-7 sm:p-10 border border-sol-border backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-sol-brown mb-6">
                  <AlertCircle className="w-4 h-4 text-sol-brown/80" />
                  Traditional Fragmentation
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-sol-espresso font-normal leading-snug mb-8">
                  Where luxury builds typically fall apart
                </h3>
                
                <div className="space-y-6">
                  {points.map((item) => (
                    <div key={item.num} className="group">
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <span className="text-xs font-sans text-sol-sand font-semibold">{item.num}</span>
                        <h4 className="font-serif text-lg text-sol-espresso/90 font-medium">{item.title}</h4>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-sol-espresso/65 leading-relaxed pl-7 font-light">
                        {item.traditional}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-sol-border/80 text-[11px] font-sans text-sol-espresso/50 uppercase tracking-widest">
                Uncontrolled Timelines & Multiple Blame Games
              </div>
            </div>

            {/* Card 2: The Lionorca Turnkey Delivery (Elevated Luminous Off-White Card) */}
            <div className="lg:col-span-7 bg-sol-card text-sol-espresso rounded-2xl p-7 sm:p-10 border border-sol-border shadow-sm relative flex flex-col justify-between">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-sol-espresso text-sol-card text-[10px] font-sans uppercase tracking-[0.2em] font-semibold px-4 py-1 rounded-full shadow-sm">
                Single Point of Contact
              </div>

              <div>
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-sol-border">
                  <div>
                    <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-sol-sand block mb-1">
                      The Lionorca Model
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-sol-espresso font-normal">
                      Turnkey Ownership from Concept to Keys
                    </h3>
                  </div>
                </div>

                <div className="space-y-7">
                  {points.map((item) => (
                    <div key={item.num} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-sol-sand/15 text-sol-brown flex items-center justify-center shrink-0 mt-1">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg text-sol-espresso font-medium mb-1">
                          {item.title} Resolved
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-sol-espresso/75 leading-relaxed font-light">
                          {item.lionorca}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-10 pt-8 border-t border-sol-border flex flex-col sm:flex-row items-center justify-between gap-5">
                <a
                  href="#process"
                  className="text-xs font-sans text-sol-espresso/70 hover:text-sol-sand transition-colors tracking-wide underline underline-offset-4"
                >
                  Explore detailed 5-step process →
                </a>
                
                <button
                  onClick={() => onOpenConsult?.({ name: 'Private Design-Build Briefing' })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-sol-espresso hover:bg-sol-sand text-sol-card transition-all duration-300 font-sans text-xs uppercase tracking-[0.18em] font-medium group shadow-sm active:scale-95"
                >
                  <span>Reserve Consultation</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
    </section>
  )
}