/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Quiet Luxury Palette
        alabaster: '#FCFCFA',       // Base Background: Soft Alabaster/Off-white
        greige: '#F4F3EE',          // Stacking Section Background: Warm Greige/Stone
        charcoal: {
          DEFAULT: '#2E2D2B',       // Primary Text: Soft Charcoal
          muted: '#5C5A56',         // Secondary/body readable text
          light: '#7A7772',         // Subtle captions
          deep: '#1E1D1C',          // Darkest luxury tone
        },
        champagne: {
          DEFAULT: '#C5A059',       // Subtle Accent: Muted Champagne Gold
          light: '#D4B678',         // Hover gold
          deep: '#A6823B',          // Active gold
        },
        ash: {
          DEFAULT: '#E6E4DD',       // Delicate borders/dividers: Soft Ash
          light: '#F0EFEA',
          dark: '#D8D5CD',
        },

        // Drop-in aliases for backwards compatibility
        cream: '#FCFCFA',
        sand: '#F4F3EE',
        oxblood: {
          DEFAULT: '#2E2D2B',
          deep: '#1E1D1C',
          light: '#3D3B39',
        },
        terracotta: {
          DEFAULT: '#C5A059',
          light: '#D4B678',
          deep: '#A6823B',
        },
        onyx: '#2E2D2B',
        brass: {
          DEFAULT: '#C5A059',
          light: '#D4B678',
          deep: '#A6823B',
        },
        sol: {
          bg: '#FCFCFA',
          card: '#FFFFFF',
          stone: '#F4F3EE',
          border: '#E6E4DD',
          taupe: '#E6E4DD',
          sand: '#C5A059',
          espresso: '#2E2D2B',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
