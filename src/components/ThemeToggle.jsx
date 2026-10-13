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
      className={`relative w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer select-none active:scale-95 ${
        isDark
          ? 'bg-black/40 hover:bg-black/60 border-amber-400/30 text-amber-300 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
          : 'bg-white/40 hover:bg-white/60 border-neutral-300 text-neutral-900 shadow-sm'
      } backdrop-blur-md ${className}`}
    >
      {/* Animated Sun */}
      <Sun
        size={18}
        className={`absolute transition-all duration-500 transform ${
          isDark
            ? 'rotate-90 scale-0 opacity-0 text-amber-400'
            : 'rotate-0 scale-100 opacity-100 text-neutral-900'
        }`}
      />
      {/* Animated Moon */}
      <Moon
        size={18}
        className={`absolute transition-all duration-500 transform ${
          isDark
            ? 'rotate-0 scale-100 opacity-100 text-amber-300'
            : '-rotate-90 scale-0 opacity-0 text-neutral-600'
        }`}
      />
    </button>
  )
}
