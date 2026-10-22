import { MapPin, Phone, Mail, Sparkles } from 'lucide-react'

export default function Footer({ onOpenConsult }) {
  return (
    <footer className="border-t border-stone-200 bg-[#FAF8F3] text-stone-600 pt-16 pb-12 transition-colors relative overflow-hidden">
      {/* Blurred Interior Footer Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bg-villa.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(7px)',
            transform: 'scale(1.10)',
            opacity: 0.42,
          }}
        />
        <div className="absolute inset-0 bg-[#FAF8F3]/70 backdrop-blur-md" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="mb-3">
              <a href="#" className="inline-block select-none">
                <img
                  src="/images/lionorca-logo-transparent.png"
                  alt="LIONORCA ARCHITERIORS - The Complete Delivery of Luxury"
                  className="h-11 sm:h-13 w-auto object-contain"
                  onError={(e) => {
                    e.target.src = '/images/lionorca-full-logo.jpg'
                  }}
                />
              </a>
            </div>
            <p className="text-sm font-soft text-stone-600 max-w-md font-normal leading-relaxed">
              Indore’s trusted home design and turnkey construction partner. From initial architectural drawings to handing over your custom-crafted keys with complete peace of mind.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenConsult}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] text-neutral-950 transition-all cursor-pointer border border-[#B3872E]/30 shadow-md active:scale-98"
              >
                <Sparkles size={14} />
                <span>Book Free Consultation</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 font-sans text-xs uppercase tracking-wider">
            <h4 className="text-stone-900 font-bold text-sm font-serif tracking-normal mb-4">
              Navigation
            </h4>
            <p><a href="#turnkey" className="hover:text-[#8E651E] transition-colors">The Lionorca Advantage</a></p>
            <p><a href="#process" className="hover:text-[#8E651E] transition-colors">How We Work (5 Steps)</a></p>
            <p><a href="#houses" className="hover:text-[#8E651E] transition-colors">House & Interior Designs</a></p>
            <p><a href="#architects" className="hover:text-[#8E651E] transition-colors">Top Architects</a></p>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 font-sans text-xs">
            <h4 className="text-stone-900 font-bold text-sm font-serif tracking-normal mb-4">
              Indore Office
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-[#8E651E] shrink-0 mt-0.5" />
              <span>Vijay Nagar & Bypass Corridors, Indore, Madhya Pradesh 452010</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-[#8E651E] shrink-0" />
              <span>+91 98930 00000</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-[#8E651E] shrink-0" />
              <span>contact@lionorca.com</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans">
          <p>© {new Date().getFullYear()} Lionorca Architeriors. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Indore, Madhya Pradesh &bull; Turnkey Luxury Residences</p>
        </div>
      </div>
    </footer>
  )
}
