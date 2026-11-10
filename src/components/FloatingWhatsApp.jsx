import { useState, useEffect } from 'react'
import { Phone } from 'lucide-react'

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false)
  const targetPhone = '919755667695'
  const message = encodeURIComponent(
    'Hello Lionorca Team! I would like to inquire about designing and building our home in Indore.'
  )
  const whatsappUrl = `https://wa.me/${targetPhone}?text=${message}`

  // Only reveal floating call button after scrolling past the hero screen
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
      aria-label="Contact Concierge"
      className="fixed bottom-6 right-6 z-[95] animate-in fade-in duration-300"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Lionorca on WhatsApp (+91 97556 67695)"
        title="Chat with Lionorca on WhatsApp (+91 97556 67695)"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] text-neutral-950 shadow-[0_8px_25px_rgba(201,158,74,0.35)] hover:shadow-[0_12px_32px_rgba(201,158,74,0.50)] border border-[#E6C678]/40 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer group"
      >
        <Phone size={22} className="stroke-[2.2] text-neutral-950 group-hover:scale-110 transition-transform duration-200" />
      </a>
    </aside>
  )
}
