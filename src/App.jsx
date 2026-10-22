import { useState } from 'react'
import { ThemeProvider } from './hooks/useTheme'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import ValueProposition from './components/ValueProposition'
import ArchitectShowcase from './components/ArchitectShowcase'
import ProcessTimeline from './components/ProcessTimeline'
import PortfolioGallery from './components/PortfolioGallery'
import MediaSection from './components/MediaSection'
import DiscoverySessionSection from './components/DiscoverySessionSection'
import Footer from './components/Footer'
import LeadModal from './components/LeadModal'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isConsultOpen, setIsConsultOpen] = useState(false)
  const [selectedArchitect, setSelectedArchitect] = useState(null)

  const handleOpenConsult = (architect = null) => {
    setSelectedArchitect(architect)
    setIsConsultOpen(true)
  }

  const handleCloseConsult = () => {
    setIsConsultOpen(false)
    setSelectedArchitect(null)
  }

  return (
    <ThemeProvider>
      {/* 1. Custom Splash Screen Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen transition-colors duration-700 bg-[#FFFFFF] text-stone-900 flex flex-col font-sans selection:bg-[#8E651E] selection:text-white">
        {/* Sticky Header with Day/Night Theme Switcher (Reveals on scroll past hero) */}
        <Navbar onOpenConsult={() => handleOpenConsult()} />

        {/* Main Content Sections (Flowing according to Akshay's Architecture) */}
        <main className="flex-1">
          {/* 1. Hero: full-bleed architectural carousel, logo, tagline, single CTA: Book a Discovery Session */}
          <Hero onOpenConsult={() => handleOpenConsult()} />

          {/* 2. Trust Strip: Handpicked architects · One accountable turnkey delivery · Indore, Bhopal, Ujjain and nearby */}
          <TrustStrip />

          {/* 3. The Problem and Promise: Designer designs, contractor executes, nobody owns outcome + Outstation architect assurance */}
          <ValueProposition onOpenConsult={() => handleOpenConsult()} />

          {/* 4. Featured Architects: 4-6 cards with signature project, city, style, and click-through profile */}
          <ArchitectShowcase onSelectArchitect={(arch) => handleOpenConsult(arch)} />

          {/* 5. How It Works: 5 steps: discovery, architect selection, design lock (5-10% token), working drawings & final quote, turnkey execution */}
          <ProcessTimeline />

          {/* 6. Signature Projects: gallery filtered by typology (villa, penthouse, bungalow) and architect */}
          <PortfolioGallery onSelectProject={(item) => handleOpenConsult({ name: item.title })} />

          {/* 7. Media: latest podcast, reel, and site-education videos */}
          <MediaSection onOpenConsult={() => handleOpenConsult()} />

          {/* 8. Final CTA: discovery session form, with WhatsApp as the secondary option */}
          <DiscoverySessionSection />
        </main>

        {/* Luxury Corporate Footer */}
        <Footer onOpenConsult={() => handleOpenConsult()} />

        {/* Lead Capture Modal with Budget Filtering & WhatsApp Flow */}
        <LeadModal
          isOpen={isConsultOpen}
          onClose={handleCloseConsult}
          preselectedArchitect={selectedArchitect}
        />

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </div>
    </ThemeProvider>
  )
}
