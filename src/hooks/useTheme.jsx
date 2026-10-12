import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Default to dark mode for luxury architectural framing
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lynor-theme')
      if (saved !== null) {
        return saved === 'dark'
      }
      return true // Default dark for luxury theme
    }
    return true
  })

  // Preload background assets via JS Image objects to guarantee zero flicker
  useEffect(() => {
    const dayImg = new Image()
    dayImg.src = '/images/hero-day.jpg'

    const nightImg = new Image()
    nightImg.src = '/images/hero-night.jpg'
  }, [])

  // Sync document root class and local storage
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      root.classList.remove('light')
      localStorage.setItem('lynor-theme', 'dark')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
      localStorage.setItem('lynor-theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
