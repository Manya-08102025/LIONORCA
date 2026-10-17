export default function ValueProposition() {
  const points = [
    {
      id: 1,
      title: 'One Team for Everything',
      description:
        'You don’t have to chase separate architects, contractors, or painters. We take care of everything from the first design sketch to the final brick.',
    },
    {
      id: 2,
      title: 'What You See Is What We Build',
      description:
        'We select high-quality materials and skilled craftsmen so your real home looks exactly like the 3D design you approved.',
    },
    {
      id: 3,
      title: 'Ready to Move In',
      description:
        'We handle all the heavy construction, interior styling, and deep cleaning. All you have to do is turn the key and start living in your new home.',
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
        <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-[#D1B67F] tracking-tight leading-tight">
          The Turnkey Advantage.
        </h2>

        {/* Short Gold Horizontal Divider Line (~2px height) */}
        <div
          className="w-14 h-[2px] bg-[#D1B67F] mt-4 mb-12 sm:mb-14 rounded-full"
          aria-hidden="true"
        />

        {/* 3 Core Points (Vertically Stacked) */}
        <div className="space-y-10 sm:space-y-12 w-full">
          {points.map((point) => (
            <div key={point.id} className="flex flex-col items-start text-left space-y-2.5">
              <h3 className="font-soft font-bold text-white text-base sm:text-lg tracking-wide">
                {point.title}
              </h3>
              <p className="font-soft text-neutral-300 text-sm sm:text-[15px] font-normal leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
