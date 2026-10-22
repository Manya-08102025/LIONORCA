import ArchitectShowcase from '../components/ArchitectShowcase'
import PortfolioGallery from '../components/PortfolioGallery'
import { Sparkles, ArrowRight, ShieldCheck, Users } from 'lucide-react'

export default function Architects({ onOpenConsult }) {
  return (
    <div className="pt-24 min-h-screen bg-[#FFFFFF] text-[#0F172A]">
      {/* Page Header */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] to-[#FFFFFF] border-b border-slate-100 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D1B67F]/15 border border-[#D1B67F]/30 text-[#9E7D3B] text-xs font-semibold uppercase tracking-[0.22em] mb-4">
            <Users size={13} className="text-[#D1B67F]" />
            <span>Curated Architectural Talent</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-5">
            Architect Roster & Portfolio
          </h1>
          <p className="font-soft text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Collaborating exclusively with Indore’s leading architects. Browse their designated style specialties, preview portfolio spaces, and book a direct design consultation.
          </p>
          <button
            onClick={() => onOpenConsult()}
            type="button"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D1B67F] hover:bg-[#c2a56c] text-[#0F172A] font-semibold text-xs tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Match With an Architect</span>
          </button>
        </div>
      </section>

      {/* Architect Cards Grid */}
      <ArchitectShowcase onSelectArchitect={(arch) => onOpenConsult(arch)} />

      {/* House & Interior Design Options */}
      <PortfolioGallery onSelectProject={(item) => onOpenConsult({ name: item.title })} />
    </div>
  )
}
