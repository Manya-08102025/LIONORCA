import React from 'react'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import FoundersPhilosophy from '../components/FoundersPhilosophy'
import ValueProposition from '../components/ValueProposition'
import ArchitectShowcase from '../components/ArchitectShowcase'
import ProcessTimeline from '../components/ProcessTimeline'
import PortfolioGallery from '../components/PortfolioGallery'
import MediaSection from '../components/MediaSection'
import DiscoverySessionSection from '../components/DiscoverySessionSection'

/**
 * Page/Home: Standard Vertical Scrolling Structure
 *
 * Reverted to natural document flow:
 * - Removed sticky, top-0, h-screen, and z-index layer constraints
 * - 100% natural, smooth vertical touch scrolling
 * - Complete preservation of all CMS data, Sanity props, and consultation handlers
 * - Zero heavy JS animation libraries or scroll listener jank
 */
export default function Home({
  onOpenConsult,
  onViewAllArchitects,
  onViewAllProjects,
  architects,
  projects,
  sanityData,
  sanityArchitects,
  sanityProjects,
}) {
  const resolvedArchitects = architects || sanityArchitects || sanityData?.architects
  const resolvedProjects = projects || sanityProjects || sanityData?.projects

  return (
    <div className="flex flex-col w-full min-h-screen text-charcoal font-sans selection:bg-champagne/20 selection:text-charcoal bg-[#FCFCFA]">
      {/* 01: Hero Carousel Banner */}
      <Hero onOpenConsult={onOpenConsult} />

      {/* 02: Trust Strip (Frosted Glass) */}
      <div className="w-full">
        <TrustStrip />
      </div>

      {/* 02.5: Founder's Philosophy (Editorial Quote & Portrait) */}
      <div className="w-full">
        <FoundersPhilosophy />
      </div>

      {/* 03: The Problem & Promise (Exact ValueProposition per Sample) */}
      <div className="w-full">
        <ValueProposition onOpenConsult={onOpenConsult} />
      </div>

      {/* 04: Featured Architects */}
      <div className="w-full">
        <ArchitectShowcase
          onSelectArchitect={(arch) => onOpenConsult?.(arch)}
          architects={resolvedArchitects}
          data={sanityData}
          onViewAll={onViewAllArchitects}
        />
      </div>

      {/* 05: How We Work / Process Timeline */}
      <div className="w-full">
        <ProcessTimeline />
      </div>

      {/* 06: Signature Projects / Typologies */}
      <div className="w-full">
        <PortfolioGallery
          onSelectProject={(item) => onOpenConsult?.({ name: item.title })}
          projects={resolvedProjects}
          data={sanityData}
          onViewAll={onViewAllProjects}
        />
      </div>

      {/* 07: Media & Insights */}
      <div className="w-full">
        <MediaSection onOpenConsult={onOpenConsult} />
      </div>

      {/* 08: Discovery Session */}
      <div className="w-full">
        <DiscoverySessionSection />
      </div>
    </div>
  )
}
