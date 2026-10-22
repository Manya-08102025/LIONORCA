import ProcessTimeline from '../components/ProcessTimeline'
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Clock, Award } from 'lucide-react'

export default function Process({ onOpenConsult }) {
  const guarantees = [
    {
      title: 'Fixed Pricing Guarantee',
      desc: 'Milestone budgets are locked before digging begins. Zero sudden surprises or hidden vendor markups.',
    },
    {
      title: 'Digital Milestone Tracking',
      desc: 'Receive photographic and quality inspection updates from our on-site engineers straight to your WhatsApp.',
    },
    {
      title: '10-Year Structural Warranty',
      desc: 'Complete turnkey delivery backed by comprehensive structural and waterproof warranties for lifetime peace of mind.',
    },
  ]

  return (
    <div className="pt-24 min-h-screen bg-[#FFFFFF] text-[#0F172A]">
      {/* Page Header */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] to-[#FFFFFF] border-b border-slate-100 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D1B67F]/15 border border-[#D1B67F]/30 text-[#9E7D3B] text-xs font-semibold uppercase tracking-[0.22em] mb-4">
            <Clock size={13} className="text-[#D1B67F]" />
            <span>Structured Turnkey Execution</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-5">
            How It Works &bull; 5-Step Turnkey Process
          </h1>
          <p className="font-soft text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            From our initial exploratory discovery session to handing over your custom-crafted keys, here is the seamless step-by-step roadmap we follow.
          </p>
          <button
            onClick={() => onOpenConsult()}
            type="button"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D1B67F] hover:bg-[#c2a56c] text-[#0F172A] font-semibold text-xs tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Schedule Step 01 Discovery Session</span>
          </button>
        </div>
      </section>

      {/* Main 5-Step Timeline */}
      <ProcessTimeline />

      {/* Turnkey Guarantees */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A] mb-3">
              The Linorga Turnkey Commitments
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-soft">
              Designed to make building your luxury home predictable, transparent, and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((g, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#D1B67F]/15 text-[#9E7D3B] flex items-center justify-center mb-4">
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0F172A] mb-2">{g.title}</h3>
                  <p className="font-soft text-sm text-slate-600 leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
