import { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Website is strictly locked to Bright Luxury Light Theme
  const isDark = false

  // Sync document root class to light
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('light')
    root.classList.remove('dark')
    localStorage.setItem('lionorca-theme', 'light')
  }, [])

  const toggleTheme = () => {
    // Light theme locked as requested
  }

  return (
    <ThemeContext.Provider value={{ isDark: false, toggleTheme, setIsDark: () => {} }}>
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
