import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ValueProposition from '../components/ValueProposition'
import ProcessTimeline from '../components/ProcessTimeline'
import PortfolioGallery from '../components/PortfolioGallery'
import ArchitectShowcase from '../components/ArchitectShowcase'
import { ArrowRight, ShieldCheck, Sparkles, Building, Layers, CheckCircle2 } from 'lucide-react'

export default function Home({ onOpenConsult }) {
  return (
    <div className="flex flex-col">
      {/* Page 1: Hero Carousel Banner */}
      <Hero onOpenConsult={onOpenConsult} />

      {/* Quick Banner: Jump to The Linorga Advantage */}
      <section className="bg-gradient-to-r from-slate-900 via-[#131926] to-slate-900 text-white py-12 px-4 sm:px-6 border-y border-[#D1B67F]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D1B67F] font-semibold flex items-center justify-center md:justify-start gap-2">
              <Sparkles size={14} />
              <span>The Linorga Difference</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Building a Luxury Home Shouldn't Feel Like a Full-Time Nightmare.
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl font-soft">
              Explore how our single-point turnkey delivery eliminates contractor delays, hidden costs, and fragmented communication.
            </p>
          </div>
          <Link
            to="/advantage"
            className="shrink-0 px-7 py-3.5 rounded-full bg-[#D1B67F] hover:bg-[#c2a56c] text-[#0F172A] font-semibold text-xs tracking-widest uppercase transition-all shadow-lg active:scale-95 flex items-center gap-2"
          >
            <span>Explore The Linorga Advantage</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Page 2: Turnkey Advantage Preview */}
      <ValueProposition />

      {/* Page 3: 5-Step Simple Workflow */}
      <ProcessTimeline />

      {/* Page 4: House & Interior Design Options */}
      <PortfolioGallery onSelectProject={(item) => onOpenConsult({ name: item.title })} />

      {/* Page 5: Top Architects & Portfolio */}
      <ArchitectShowcase onSelectArchitect={(arch) => onOpenConsult(arch)} />
    </div>
  )
}
