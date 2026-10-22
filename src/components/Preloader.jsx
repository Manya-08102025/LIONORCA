import { useState, useEffect } from 'react'

export default function Preloader({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false)
  const letters = ['L', 'I', 'O', 'N', 'O', 'R', 'C', 'A']

  useEffect(() => {
    // 1. Prevent scrolling during preloader playback
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // 2. Trigger exit animation at 3.3 seconds (total experience ~3.5 to 4s)
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 3300)

    // 3. Complete and unmount at 3.9 seconds
    const completeTimer = setTimeout(() => {
      document.body.style.overflow = originalOverflow || 'unset'
      if (onComplete) onComplete()
    }, 3900)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
      document.body.style.overflow = originalOverflow || 'unset'
    }
  }, [onComplete])

  const handleSkip = () => {
    setIsExiting(true)
    setTimeout(() => {
      if (onComplete) onComplete()
    }, 500)
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] bg-[#FFFFFF] flex flex-col items-center justify-center select-none transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isExiting ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
    >
      <style>{`
        @keyframes preloaderFadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.85);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }

        @keyframes preloaderLetterReveal {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes preloaderFadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes preloaderExpandLine {
          0% {
            width: 0;
            opacity: 0;
          }
          100% {
            width: 200px;
            opacity: 1;
          }
        }

        .animate-preloader-emblem {
          animation: preloaderFadeInScale 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }

        .animate-preloader-letter {
          animation: preloaderLetterReveal 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-preloader-subtitle {
          animation: preloaderFadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.6s forwards;
        }

        .animate-preloader-line {
          animation: preloaderExpandLine 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.9s forwards;
        }

        .animate-preloader-tagline {
          animation: preloaderFadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 2.1s forwards;
        }
      `}</style>

      {/* Main Luxury Brand Lockup */}
      <div className="flex flex-col items-center justify-center px-6 text-center max-w-xl mx-auto">
        {/* 1. Graphic Logo Reveal (Emblem Mark - Large, Majestic, Prominent) */}
        <div className="opacity-0 animate-preloader-emblem mb-6 relative flex items-center justify-center">
          <img
            src="/images/lionorca-emblem-transparent.png"
            alt="Lionorca Emblem"
            className="w-28 sm:w-36 md:w-44 h-auto object-contain drop-shadow-[0_8px_30px_rgba(142,101,30,0.18)]"
            onError={(e) => {
              e.target.src = '/images/lionorca-logo.png'
            }}
          />
        </div>

        {/* 2. Staggered Character-by-Character Brand Name Reveal (Slow, Dignified, Bold) */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-3.5 mb-2 pl-3">
          {letters.map((char, index) => (
            <span
              key={index}
              className="opacity-0 animate-preloader-letter font-sans font-black text-3xl sm:text-4xl md:text-5xl text-[#7D5212] tracking-widest inline-block select-none"
              style={{
                animationDelay: `${0.85 + index * 0.08}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* 3. Subtitle: ARCHITERIORS */}
        <div className="opacity-0 animate-preloader-subtitle mt-1">
          <span className="font-sans font-extrabold text-xs sm:text-sm md:text-base text-stone-800 tracking-[0.42em] uppercase block">
            Architeriors
          </span>
        </div>

        {/* 4. Refined Champagne Divider Line */}
        <div className="opacity-0 animate-preloader-line h-[2px] bg-gradient-to-r from-transparent via-[#8E651E]/70 to-transparent my-4" />

        {/* 5. Tagline: the complete delivery of luxury */}
        <div className="opacity-0 animate-preloader-tagline">
          <p className="font-serif italic font-normal text-sm sm:text-base text-stone-600 tracking-wider">
            the complete delivery of luxury
          </p>
        </div>
      </div>

      {/* Discrete Skip button for quick navigation */}
      <button
        onClick={handleSkip}
        type="button"
        className="absolute bottom-8 right-8 text-xs font-sans uppercase tracking-[0.2em] text-stone-400 hover:text-stone-800 transition-colors cursor-pointer py-2 px-4 rounded-full border border-stone-200 hover:bg-stone-50"
      >
        Skip ➔
      </button>
    </div>
  )
}
