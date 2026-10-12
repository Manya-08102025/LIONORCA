import { useTheme } from '../hooks/useTheme'
import { CheckCircle2, XCircle, Layers, Users, Clock, ShieldAlert } from 'lucide-react'

export default function ValueProposition() {
  const { isDark } = useTheme()

  return (
    <section
      id="turnkey"
      className={`py-24 transition-colors duration-500 border-t ${
        isDark ? 'bg-neutral-950 border-white/5 text-neutral-100' : 'bg-stone-50 border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-amber-500 font-semibold block mb-3">
            The Turnkey Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">
            Eliminating the Multi-Vendor Nightmare
          </h2>
          <p className={`text-base sm:text-lg font-light font-sans leading-relaxed ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Traditional construction splits responsibility: architects create visions, contractors execute, and homeowners bear the cost of miscommunication. Lynor unites both under single-point accountability.
          </p>
        </div>

        {/* Comparison Grid: Traditional vs Lynor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {/* Traditional Nightmare */}
          <div
            className={`p-8 sm:p-10 rounded-2xl border transition-all ${
              isDark
                ? 'bg-neutral-900/60 border-red-500/20 shadow-lg'
                : 'bg-white border-red-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-500/10 text-red-500">
                <ShieldAlert size={26} />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-red-500">Traditional Multi-Vendor Model</h3>
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-sans">Fragmented & Stressful</span>
              </div>
            </div>

            <ul className="space-y-4 font-sans text-sm">
              <li className="flex items-start gap-3">
                <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                  <strong>15 to 25 separate vendors</strong> for standard homes; up to <strong>50–70 vendors</strong> for luxury residences.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                  Designers blame contractors for deviations; contractors blame designs for delays.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                  Frequent material delays, opaque contractor markups, and unpredictable cost escalations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                  Homeowners forced to act as full-time site coordinators during critical working hours.
                </span>
              </li>
            </ul>
          </div>

          {/* Lynor Single-Window Solution */}
          <div
            className={`p-8 sm:p-10 rounded-2xl border transition-all relative overflow-hidden ${
              isDark
                ? 'bg-neutral-900/90 border-amber-500/40 shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                : 'bg-white border-amber-600/30 shadow-md'
            }`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-amber-500/15 text-amber-500">
                <CheckCircle2 size={26} />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-amber-500">Lynor Single-Window Orchestration</h3>
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-sans">Full Accountability</span>
              </div>
            </div>

            <ul className="space-y-4 font-sans text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <span className={isDark ? 'text-neutral-200' : 'text-neutral-800'}>
                  <strong>Single Point of Contact:</strong> Lynor takes 100% ownership from first sketch to final key handover.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <span className={isDark ? 'text-neutral-200' : 'text-neutral-800'}>
                  Collaborative synergy: architects design with constructability in mind, backed by our engineering specialists.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <span className={isDark ? 'text-neutral-200' : 'text-neutral-800'}>
                  Direct bulk material procurement, transparent budget management, and milestone-guaranteed timelines.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <span className={isDark ? 'text-neutral-200' : 'text-neutral-800'}>
                  Tailored for discerning clients (aged 40–50) seeking peace of mind without operational headaches.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Complexity Education Banner */}
        <div
          className={`p-8 sm:p-10 rounded-2xl border text-center max-w-4xl mx-auto ${
            isDark ? 'bg-neutral-900/40 border-white/10' : 'bg-amber-50/60 border-amber-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-500">15 – 20</div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-sans mt-1">Vendors for standard homes</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">50 – 70</div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-sans mt-1">Vendors for ₹1Cr+ luxury builds</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-white">1</div>
              <div className="text-xs uppercase tracking-wider text-amber-500 font-sans mt-1 font-semibold">Accountable partner: Lynor</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
