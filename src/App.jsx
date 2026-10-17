import { useState } from 'react'
import { ThemeProvider } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ValueProposition from './components/ValueProposition'
import ProcessTimeline from './components/ProcessTimeline'
import PortfolioGallery from './components/PortfolioGallery'
import ArchitectShowcase from './components/ArchitectShowcase'
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
      <div className="min-h-screen transition-colors duration-700 bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans selection:bg-[#D1B67F] selection:text-black">
        {/* Navigation Bar with Day/Night Theme Switcher */}
        <Navbar onOpenConsult={() => handleOpenConsult()} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Page 1: Hero Section */}
          <Hero onOpenConsult={() => handleOpenConsult()} />

          {/* Page 2: Turnkey Advantage */}
          <ValueProposition />

          {/* Page 3: 5-Step Simple Workflow */}
          <ProcessTimeline />

          {/* Page 4: House & Interior Design Options */}
          <PortfolioGallery onSelectProject={(item) => handleOpenConsult({ name: item.title })} />

          {/* Page 5 (Last Page): Top Architects & Their Portfolio */}
          <ArchitectShowcase onSelectArchitect={(arch) => handleOpenConsult(arch)} />
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
