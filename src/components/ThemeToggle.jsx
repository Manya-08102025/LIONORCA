import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Switch to Daytime mode' : 'Switch to Nighttime mode'}
      title={isDark ? 'Switch to Day Light' : 'Switch to Twilight Glow'}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none group
        ${
          isDark
            ? 'bg-neutral-900/90 hover:bg-neutral-800 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
            : 'bg-white/90 hover:bg-neutral-100 border-amber-600/30 text-amber-700 shadow-sm'
        } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Animated Sun */}
        <Sun
          size={18}
          className={`absolute transition-all duration-500 transform ${
            isDark
              ? 'rotate-90 scale-0 opacity-0 text-amber-400'
              : 'rotate-0 scale-100 opacity-100 text-amber-600'
          }`}
        />
        {/* Animated Moon */}
        <Moon
          size={18}
          className={`absolute transition-all duration-500 transform ${
            isDark
              ? 'rotate-0 scale-100 opacity-100 text-amber-400'
              : '-rotate-90 scale-0 opacity-0 text-neutral-400'
          }`}
        />
      </div>

      <span className="text-xs uppercase tracking-widest font-medium font-sans hidden sm:inline-block">
        {isDark ? 'Night' : 'Day'}
      </span>
    </button>
  )
}
