import { MapPin, Phone, Mail, Sparkles } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function Footer({ onOpenConsult }) {
  return (
    <footer className="border-t border-stone-200/90 bg-[#FAF9F5] text-stone-900 pt-20 pb-14 transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          {/* Brand Column */}
          <ScrollReveal delay={0} duration={0.8} y={30} className="md:col-span-2 space-y-5">
            <a href="#" className="inline-block select-none">
              <img
                src="/images/lionorca-logo-transparent.png"
                alt="LIONORCA ARCHITERIORS"
                className="h-12 sm:h-14 w-auto object-contain"
                onError={(e) => {
                  e.target.src = '/images/lionorca-full-logo.jpg'
                }}
              />
            </a>
            <p className="text-sm font-sans text-stone-600 max-w-md font-normal leading-relaxed">
              Indore's trusted residential architecture and turnkey construction firm. From initial blueprints to handing over your custom-crafted keys with singular accountability.
            </p>
            <button
              onClick={onOpenConsult}
              type="button"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] text-neutral-950 transition-all cursor-pointer active:scale-98 shadow-[0_4px_16px_rgba(201,158,74,0.25)] hover:shadow-[0_6px_22px_rgba(201,158,74,0.38)]"
            >
              <Sparkles size={14} className="text-neutral-950" />
              <span>Book Discovery Session</span>
            </button>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={100} duration={0.8} y={30} className="space-y-3 font-sans text-xs uppercase tracking-wider">
            <h4 className="text-stone-900 font-serif text-lg font-bold tracking-normal mb-5">
              Navigation
            </h4>
            <p><a href="/#turnkey" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">The Lionorca Advantage</a></p>
            <p><a href="/#process" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">How We Work (5 Steps)</a></p>
            <p><a href="/#houses" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">House &amp; Interior Designs</a></p>
            <p><a href="/#architects" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">Top Architects</a></p>
            <p><a href="/work-with-us" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">Work With Us</a></p>
          </ScrollReveal>

          {/* Contact Details */}
          <ScrollReveal delay={200} duration={0.8} y={30} className="space-y-3 font-sans text-xs">
            <h4 className="text-stone-900 font-serif text-lg font-bold tracking-normal mb-5">
              Indore Office
            </h4>
            <div className="flex items-start gap-3 text-stone-600">
              <MapPin size={16} className="text-[#8E651E] shrink-0 mt-0.5" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Central+Business+Park,+Scheme+No+94,+Indore"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8E651E] transition-colors leading-relaxed"
              >
                204, FA1, Central Business Park, HDFC Bank Building,<br />
                Bengali to Pipliyahana Service Rd, Sch. No. 94,<br />
                Indore, Madhya Pradesh 452016
              </a>
            </div>
            <div className="flex items-center gap-3 text-stone-600">
              <Phone size={16} className="text-[#8E651E] shrink-0" />
              <a
                href="tel:+919755667695"
                className="hover:text-[#8E651E] transition-colors font-medium"
              >
                +91 97556 67695
              </a>
            </div>
            <div className="flex items-center gap-3 text-stone-600">
              <Mail size={16} className="text-[#8E651E] shrink-0" />
              <a
                href="mailto:lionorca.architeriors@gmail.com"
                className="hover:text-[#8E651E] transition-colors font-medium"
              >
                lionorca.architeriors@gmail.com
              </a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={250} duration={0.8} y={20} className="pt-8 border-t border-stone-200/90 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans">
          <p>© {new Date().getFullYear()} Lionorca Ventures Pvt. Ltd. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Central Business Park, Sch. No. 94, Indore • Turnkey Luxury Residences</p>
        </ScrollReveal>
      </div>
    </footer>
  )
}
