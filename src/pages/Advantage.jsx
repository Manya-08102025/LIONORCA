import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  Clock,
  Coins,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Building2,
  Sparkles,
  Award,
  ArrowRight,
  BadgeCheck,
  FileSpreadsheet
} from 'lucide-react'

export default function Advantage({ onOpenConsult }) {
  const painPoints = [
    {
      id: 'pain-1',
      number: '01',
      title: 'Fractured Coordination',
      icon: AlertTriangle,
      description:
        'Managing separate architects, interior designers, contractors, and vendors leads to blame games and misaligned visions.',
      tag: 'Coordination Chaos',
    },
    {
      id: 'pain-2',
      number: '02',
      title: 'Budget Overruns & Hidden Costs',
      icon: Coins,
      description:
        'Initial estimates rarely match the final bill, resulting in sudden price hikes mid-project.',
      tag: 'Financial Ambiguity',
    },
    {
      id: 'pain-3',
      number: '03',
      title: 'Unpredictable Timelines',
      icon: Clock,
      description:
        'Lack of streamlined project management causes months (or years) of unnecessary delays.',
      tag: 'Unreliable Schedules',
    },
    {
      id: 'pain-4',
      number: '04',
      title: 'Compromised Quality Execution',
      icon: ShieldCheck,
      description:
        'Beautiful 3D designs often get lost in translation due to poor site execution and cheap material substitutions.',
      tag: 'Substandard Finish',
    },
  ]

  const comparisonData = [
    {
      traditional: 'Fragmented teams and endless back-and-forth',
      linorga: 'Single-point accountability from concept to keys',
    },
    {
      traditional: 'Ambiguous pricing and mid-project surprises',
      linorga: 'Transparent token locking & locked milestone pricing',
    },
    {
      traditional: 'Unvetted execution & delayed handovers',
      linorga: 'Top tier curated architects & guaranteed timelines',
    },
    {
      traditional: 'Stressful day-to-day oversight required',
      linorga: 'Turnkey peace of mind with regular digital updates',
    },
  ]

  const coreValues = [
    {
      id: 'val-1',
      icon: Building2,
      badge: 'Ownership',
      title: 'End-to-End Turnkey Delivery',
      description:
        'We take 100% ownership from initial architectural planning and material selection to final handover. You deal with one accountable partner.',
    },
    {
      id: 'val-2',
      icon: Award,
      badge: 'Excellence',
      title: "World’s Finest Architectural Roster",
      description:
        'We collaborate exclusively with top-tier, highly experienced architects to ensure your home is an architectural masterpiece.',
    },
    {
      id: 'val-3',
      icon: FileSpreadsheet,
      badge: 'Clarity',
      title: 'Financial Transparency & Token Lock-In',
      description:
        'No vague percentage traps. Lock in your project with a simple Token Amount and clear milestone-based valuations.',
    },
  ]

  return (
    <div className="bg-[#FFFFFF] text-[#0F172A] selection:bg-[#D1B67F] selection:text-black">
      {/* =========================================================================
          SECTION 1: HERO BANNER
      ========================================================================= */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#FFFFFF] border-b border-slate-100">
        {/* Subtle decorative background accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D1B67F]/10 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-slate-200/40 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Sub-heading / Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D1B67F]/15 border border-[#D1B67F]/30 text-[#9E7D3B] text-xs font-semibold uppercase tracking-[0.22em] mb-6 shadow-sm">
            <Sparkles size={13} className="text-[#D1B67F]" />
            <span>The Linorga Advantage</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-[1.18] mb-6 sm:mb-8">
            Building a Luxury Home Shouldn't Feel Like a{' '}
            <span className="relative inline-block text-[#9E7D3B] italic">
              Full-Time Nightmare.
              <span className="absolute left-0 bottom-1 w-full h-[3px] bg-[#D1B67F]/40 rounded-full" />
            </span>
          </h1>

          {/* Paragraph */}
          <p className="font-soft text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12">
            Designing and building a high-end luxury residence is one of life’s greatest
            milestones—yet traditional construction processes are plagued by hidden costs, endless
            delays, fractured communication, and unverified execution. At Linorga, we eliminate
            the chaos through complete turnkey delivery.
          </p>

          {/* Primary CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenConsult}
              type="button"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D1B67F] hover:bg-[#c2a56c] text-[#0F172A] font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#D1B67F]/25 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Book a Discovery Session</span>
              <ArrowRight size={17} />
            </button>
            <Link
              to="/process"
              className="w-full sm:w-auto px-7 py-4 rounded-full border border-slate-300 hover:border-[#D1B67F] bg-white text-slate-700 hover:text-[#0F172A] font-medium text-sm tracking-wide transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
            >
              <span>Explore Our 5-Step Model</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THE PROBLEM (The Pain Points of Traditional Building)
      ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans tracking-[0.25em] uppercase text-rose-600 font-semibold block mb-3">
              The Reality of Industry Chaos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] mb-4">
              The Pain Points of Traditional Building
            </h2>
            <p className="font-soft text-base text-slate-600 leading-relaxed">
              Why 80% of independent luxury home projects exceed budgets by 30%+ and suffer from
              exhausting vendor disagreements.
            </p>
          </div>

          {/* Visual Callout Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {painPoints.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className="group relative p-7 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-slate-200 hover:border-rose-300/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100 group-hover:scale-105 transition-transform">
                        <Icon size={22} className="stroke-[2.2]" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                        {item.tag}
                      </span>
                    </div>
                    <span className="font-serif text-2xl font-bold text-slate-300 group-hover:text-rose-400 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A] mb-3">
                      {item.title}
                    </h3>
                    <p className="font-soft text-sm sm:text-base text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-rose-600 text-xs font-medium">
                    <XCircle size={15} />
                    <span>Costly traditional bottleneck</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE PROMISE (The Linorga Solution - Side-by-Side Comparison)
      ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#9E7D3B] font-semibold block mb-3">
              Direct Side-by-Side Comparison
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] mb-4">
              Traditional Building vs. The Linorga Standard
            </h2>
            <p className="font-soft text-base text-slate-600 leading-relaxed">
              We replaced fragmented contractors and opaque billing with a unified, accountable
              master model.
            </p>
          </div>

          {/* Side-by-Side Dynamic Comparison Grid */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-lg bg-white">
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-slate-50 border-b border-slate-200">
              <div className="p-5 sm:p-6 text-left flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <XCircle size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-700">
                    Traditional Home Building
                  </h3>
                  <span className="text-xs text-slate-500 font-soft">Multiple Disconnected Parties</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 text-left flex items-center justify-between gap-3 bg-gradient-to-r from-amber-50/50 to-[#D1B67F]/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D1B67F] text-[#0F172A] flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0F172A]">
                      The Linorga Standard
                    </h3>
                    <span className="text-xs text-[#9E7D3B] font-soft font-semibold">Single-Source Turnkey Accountability</span>
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#D1B67F] text-[#0F172A]">
                  Guaranteed
                </span>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-slate-100">
              {comparisonData.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 hover:bg-slate-50/80 transition-colors"
                >
                  {/* Left: Traditional Building */}
                  <div className="p-5 sm:p-6 flex items-start gap-3.5 text-left bg-rose-50/20">
                    <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-soft text-sm sm:text-base text-slate-700 font-medium">
                        {row.traditional}
                      </p>
                      <span className="text-xs text-rose-600/80 font-soft mt-1 block">
                        Common point of conflict & budget creep
                      </span>
                    </div>
                  </div>

                  {/* Right: The Linorga Standard */}
                  <div className="p-5 sm:p-6 flex items-start gap-3.5 text-left bg-amber-50/30">
                    <BadgeCheck size={20} className="text-[#9E7D3B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-soft text-sm sm:text-base text-[#0F172A] font-bold">
                        {row.linorga}
                      </p>
                      <span className="text-xs text-[#9E7D3B] font-soft font-semibold mt-1 block">
                        Contractually committed delivery
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE TURNKEY PROMISE (Core Values Roster - 3 Columns)
      ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-t border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#9E7D3B] font-semibold block mb-3">
              Uncompromising Foundations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] mb-4">
              The Turnkey Promise
            </h2>
            <p className="font-soft text-base text-slate-600 leading-relaxed">
              Three pillars designed to safeguard your capital, preserve your time, and elevate
              your architectural vision.
            </p>
          </div>

          {/* 3 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val) => {
              const Icon = val.icon
              return (
                <div
                  key={val.id}
                  className="rounded-2xl p-8 bg-[#FFFFFF] border border-slate-200 hover:border-[#D1B67F] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Icon & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#D1B67F]/15 border border-[#D1B67F]/30 text-[#9E7D3B] flex items-center justify-center">
                        <Icon size={26} className="stroke-[1.8]" />
                      </div>
                      <span className="text-[11px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                        {val.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 leading-snug">
                      {val.title}
                    </h3>
                    <p className="font-soft text-sm sm:text-base text-slate-600 leading-relaxed">
                      "{val.description}"
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-[#9E7D3B] text-xs font-semibold uppercase tracking-wider">
                    <CheckCircle2 size={16} />
                    <span>Linorga Guarantee</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CALL TO ACTION (CTA BANNER)
      ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0E17] text-white relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D1B67F]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block text-xs font-sans tracking-[0.25em] uppercase text-[#D1B67F] font-semibold mb-4">
            Begin With Absolute Certainty
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Ready to Experience Seamless Luxury Home Building?
          </h2>
          <p className="font-soft text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            Skip the stress and delays. Start with a dedicated Discovery Session with our team
            today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenConsult}
              type="button"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#D1B67F] hover:bg-[#c2a56c] text-[#0F172A] font-serif font-bold text-base sm:text-lg tracking-wide uppercase transition-all duration-300 shadow-xl shadow-black/40 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Schedule Your Discovery Session</span>
              <ArrowRight size={18} />
            </button>
            <Link
              to="/architects"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:border-[#D1B67F] bg-white/5 hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all duration-300"
            >
              <span>View Architect Roster</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
