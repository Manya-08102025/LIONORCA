import { MapPin, Phone, Mail, Sparkles } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

function InstagramIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

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
                alt="LIONORCA ARCHITERIORS - The Complete Delivery of Luxury"
                className="h-14 sm:h-16 w-auto object-contain max-h-[72px]"
                onError={(e) => {
                  e.target.src = '/images/lionorca-full-logo.jpg'
                }}
              />
            </a>
            <p className="text-sm font-sans text-stone-600 max-w-md font-normal leading-relaxed">
              Indore's trusted residential architecture and turnkey construction firm. From initial blueprints to handing over your custom-crafted keys with singular accountability.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={onOpenConsult}
                type="button"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] text-neutral-950 transition-all cursor-pointer active:scale-98 shadow-[0_4px_16px_rgba(201,158,74,0.25)] hover:shadow-[0_6px_22px_rgba(201,158,74,0.38)]"
              >
                <Sparkles size={14} className="text-neutral-950" />
                <span>Book Discovery Session</span>
              </button>

              {/* Social Icon Pills */}
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.instagram.com/lionorca_architeriors/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram: lionorca_architeriors"
                  className="w-10 h-10 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer group"
                >
                  <InstagramIcon size={17} />
                </a>
                <a
                  href="https://www.facebook.com/LionorcaArchiteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook: Lionorca Architeriors"
                  className="w-10 h-10 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-white hover:bg-[#1877F2] hover:border-transparent flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer group"
                >
                  <FacebookIcon size={17} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={100} duration={0.8} y={30} className="space-y-2.5 font-sans text-xs uppercase tracking-wider">
            <h4 className="text-stone-900 font-serif text-lg font-bold tracking-normal mb-5">
              Navigation
            </h4>
            <p><a href="/#philosophy" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">Ideology</a></p>
            <p><a href="/#turnkey" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">Why Lionorca</a></p>
            <p><a href="/#architects" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">Architects</a></p>
            <p><a href="/#process" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">How It Works</a></p>
            <p><a href="/#houses" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">Portfolio</a></p>
            <p><a href="/#media" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">Media &amp; Insights</a></p>
            <p><a href="/#contact" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">Discovery Session</a></p>
            <p><a href="/work-with-us" className="hover:text-[#8E651E] transition-colors text-stone-600 font-medium">Work With Us</a></p>
          </ScrollReveal>

          {/* Contact Details */}
          <ScrollReveal delay={200} duration={0.8} y={30} className="space-y-3.5 font-sans text-xs">
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
                <strong className="text-stone-900 font-semibold block mb-0.5">
                  Lionorca Ventures Pvt. Ltd.
                </strong>
                204, FA1, Central Business Park, HDFC Bank Building,<br />
                Bengali to Pipliyahana Service Rd, Sch. No. 94,<br />
                Indore. MP. 452016
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

            {/* Social Media Links */}
            <div className="pt-2 border-t border-stone-200 space-y-2">
              <a
                href="https://www.instagram.com/lionorca_architeriors/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-stone-600 hover:text-[#8E651E] transition-colors group"
              >
                <InstagramIcon size={14} className="text-[#8E651E] shrink-0" />
                <span className="font-medium">lionorca_architeriors</span>
              </a>
              <a
                href="https://www.facebook.com/LionorcaArchiteriors"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-stone-600 hover:text-[#8E651E] transition-colors group"
              >
                <FacebookIcon size={14} className="text-[#8E651E] shrink-0" />
                <span className="font-medium">Lionorca Architeriors</span>
              </a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={250} duration={0.8} y={20} className="pt-8 border-t border-stone-200/90 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans">
          <p>© {new Date().getFullYear()} Lionorca Ventures Pvt. Ltd. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Central Business Park, Sch. No. 94, Indore. MP. 452016 • Turnkey Luxury Residences</p>
        </ScrollReveal>
      </div>
    </footer>
  )
}
