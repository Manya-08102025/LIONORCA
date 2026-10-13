import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false)
  const targetPhone = '919893000000'
  const message = encodeURIComponent(
    'Namaste Lynor Team! I would like to inquire about your turnkey luxury residential services in Indore.'
  )

  const whatsappUrl = `https://wa.me/${targetPhone}?text=${message}`

  // Only reveal floating WhatsApp after scrolling past the minimalist hero screen
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <aside
      aria-label="WhatsApp Concierge"
      className="fixed bottom-6 right-6 z-40 animate-in fade-in duration-300"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Lynor WhatsApp Concierge"
        className="flex items-center gap-3 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        <div className="relative">
          <MessageCircle size={22} className="fill-white" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-100"></span>
          </span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider font-sans hidden sm:inline">
          WhatsApp Concierge
        </span>
      </a>
    </aside>
  )
}
