export default function ValueProposition() {
  const points = [
    {
      id: 1,
      title: 'Single Point of Contact',
      description:
        'We manage the entire lifecycle—from spatial planning and 3D visualization to final construction.',
    },
    {
      id: 2,
      title: 'Bespoke Craftsmanship',
      description:
        'We source premium materials and manage elite artisans to ensure the physical execution perfectly matches the 3D render.',
    },
    {
      id: 3,
      title: 'Move-In Ready Delivery',
      description:
        'We handle the heavy lifting, the interior styling, and the final cleaning. You simply turn the key and walk into a finished masterpiece.',
    },
  ]

  return (
    <section
      id="turnkey"
      className="w-full bg-[#0d0e12] py-24 sm:py-32 md:py-36 px-6 sm:px-8 border-t border-white/5 transition-colors duration-500"
    >
      {/* Mobile-First Left-Aligned Stack Container */}
      <div className="max-w-md sm:max-w-lg md:max-w-xl mx-auto flex flex-col items-start text-left">
        {/* Section Header */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-[#C5A864] tracking-tight leading-tight">
          The Turnkey Advantage.
        </h2>

        {/* Short Gold Horizontal Divider Line (~2px height) */}
        <div
          className="w-14 h-[2px] bg-[#C5A864] mt-4 mb-12 sm:mb-14 rounded-full"
          aria-hidden="true"
        />

        {/* 3 Core Points (Vertically Stacked) */}
        <div className="space-y-10 sm:space-y-12 w-full">
          {points.map((point) => (
            <div key={point.id} className="flex flex-col items-start text-left space-y-2.5">
              <h3 className="font-sans font-bold text-white text-base sm:text-lg tracking-wide">
                {point.title}
              </h3>
              <p className="font-sans text-neutral-300 text-sm sm:text-[15px] font-light leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
