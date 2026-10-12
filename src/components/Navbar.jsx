import { useState } from 'react'
import { Menu, X, PhoneCall, Sparkles } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../hooks/useTheme'

export default function Navbar({ onOpenConsult }) {
  const { isDark } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 backdrop-blur-md border-b ${
        isDark
          ? 'bg-neutral-950/80 border-white/10 text-neutral-100'
          : 'bg-white/85 border-neutral-200/80 text-neutral-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex flex-col group">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-serif tracking-[0.25em] font-bold text-amber-500 uppercase">
              Lynor
            </span>
            <span
              className={`text-xs tracking-[0.3em] uppercase font-light hidden xs:inline ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              Arkitechtures
            </span>
          </div>
          <span className="text-[9px] tracking-[0.35em] text-neutral-400 uppercase -mt-1 font-sans">
            Luxury Turnkey Homes
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-medium">
          <a
            href="#turnkey"
            className={`transition-colors hover:text-amber-500 ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}
          >
            Turnkey Advantage
          </a>
          <a
            href="#architects"
            className={`transition-colors hover:text-amber-500 ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}
          >
            Architects
          </a>
          <a
            href="#process"
            className={`transition-colors hover:text-amber-500 ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}
          >
            5-Step Process
          </a>
          <a
            href="#portfolio"
            className={`transition-colors hover:text-amber-500 ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}
          >
            Portfolio
          </a>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Day / Night Theme Switcher */}
          <ThemeToggle />

          {/* Quick Consult CTA Button */}
          <button
            onClick={onOpenConsult}
            type="button"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-md hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Consult</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle Navigation Menu"
            className={`p-2 rounded-lg md:hidden transition-colors ${
              isDark ? 'text-neutral-200 hover:bg-neutral-800' : 'text-neutral-800 hover:bg-neutral-100'
            }`}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-6 py-6 space-y-4 transition-all duration-300 ${
            isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-900 shadow-xl'
          }`}
        >
          <a
            href="#turnkey"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm tracking-wider uppercase font-medium hover:text-amber-500"
          >
            Turnkey Advantage
          </a>
          <a
            href="#architects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm tracking-wider uppercase font-medium hover:text-amber-500"
          >
            Curated Architects
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm tracking-wider uppercase font-medium hover:text-amber-500"
          >
            5-Step Onboarding
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm tracking-wider uppercase font-medium hover:text-amber-500"
          >
            Portfolio
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenConsult()
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500 text-neutral-950"
            >
              <Sparkles size={15} />
              Book Confidential Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
