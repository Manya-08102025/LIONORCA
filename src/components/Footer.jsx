import { useTheme } from '../hooks/useTheme'
import { MapPin, Phone, Mail, Sparkles } from 'lucide-react'

export default function Footer({ onOpenConsult }) {
  const { isDark } = useTheme()

  return (
    <footer
      className={`border-t transition-colors duration-500 pt-16 pb-12 ${
        isDark
          ? 'bg-neutral-950 border-white/10 text-neutral-400'
          : 'bg-stone-900 border-neutral-800 text-neutral-400'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="mb-3">
              <img
                src="/images/lionorca-logo-transparent.png"
                alt="LIONORCA ARCHITERIORS - the complete delivery of luxury"
                className="h-12 sm:h-14 w-auto object-contain"
                onError={(e) => {
                  e.target.src = '/images/lionorca-logo.png'
                }}
              />
            </div>
            <p className="text-sm font-soft text-neutral-300 max-w-md font-normal leading-relaxed">
              Indore’s trusted home design and turnkey construction partner. From initial architectural drawings to handing over your ready keys.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenConsult}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D1B67F] text-neutral-950 hover:bg-[#c2a56c] transition-colors cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Book Free Consultation</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 font-sans text-xs uppercase tracking-wider">
            <h4 className="text-white font-semibold text-sm font-serif tracking-normal mb-4">
              Navigation
            </h4>
            <p><a href="#turnkey" className="hover:text-[#D1B67F] transition-colors">The Turnkey Advantage</a></p>
            <p><a href="#process" className="hover:text-[#D1B67F] transition-colors">How It Works (5 Steps)</a></p>
            <p><a href="#houses" className="hover:text-[#D1B67F] transition-colors">House & Interior Designs</a></p>
            <p><a href="#architects" className="hover:text-[#D1B67F] transition-colors">Top Architects</a></p>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 font-sans text-xs">
            <h4 className="text-white font-semibold text-sm font-serif tracking-normal mb-4">
              Indore Office
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-[#D1B67F] shrink-0 mt-0.5" />
              <span>Vijay Nagar & Bypass Corridors, Indore, Madhya Pradesh 452010</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-[#D1B67F] shrink-0" />
              <span>+91 98930 00000</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-[#D1B67F] shrink-0" />
              <span>contact@lionorca.com</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-sans">
          <p>© {new Date().getFullYear()} Lionorca Architeriors. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Indore, Madhya Pradesh</p>
        </div>
      </div>
    </footer>
  )
}
