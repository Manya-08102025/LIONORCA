import { useState } from 'react'
import { ThemeProvider } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ValueProposition from './components/ValueProposition'
import ArchitectShowcase from './components/ArchitectShowcase'
import ProcessTimeline from './components/ProcessTimeline'
import PortfolioGallery from './components/PortfolioGallery'
import Footer from './components/Footer'
import LeadModal from './components/LeadModal'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
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
      <div className="min-h-screen transition-colors duration-700 bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
        {/* Navigation Bar with Day/Night Theme Switcher */}
        <Navbar onOpenConsult={() => handleOpenConsult()} />

        {/* Hero Section with Interactive Day/Night Background Crossfade */}
        <main className="flex-1">
          <Hero onOpenConsult={() => handleOpenConsult()} />

          {/* Turnkey Advantage & Complexity Management */}
          <ValueProposition />

          {/* Curated 5 Regional Architects Showcase */}
          <ArchitectShowcase onSelectArchitect={(arch) => handleOpenConsult(arch)} />

          {/* 5-Step Execution & Onboarding Workflow */}
          <ProcessTimeline />

          {/* Portfolio & Budget Tiers Catalog */}
          <PortfolioGallery onSelectProject={(project) => handleOpenConsult({ name: `${project.partnerArchitect} (${project.title})` })} />
        </main>

        {/* Luxury Corporate Footer */}
        <Footer onOpenConsult={() => handleOpenConsult()} />

        {/* Lead Capture Modal with Budget Filtering & WhatsApp Flow */}
        <LeadModal
          isOpen={isConsultOpen}
          onClose={handleCloseConsult}
          preselectedArchitect={selectedArchitect}
        />

        {/* Direct WhatsApp Concierge Floating Trigger */}
        <FloatingWhatsApp />
      </div>
    </ThemeProvider>
  )
}
