// tailwind.config.js
import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'snackbox-primary': '#213F5B',
        'snackbox-secondary': '#F7931E',
        'snackbox-accent': '#FFD700',
        'snackbox-light-gray': '#F5F5F5',
        'snackbox-dark-gray': '#333333',
        'snackbox-white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // --- SECCIÓN DE ANIMACIONES EXISTENTE ---
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "glow": "glow 1.5s ease-in-out infinite alternate",
        // --- AÑADIDO --- Animación Aurora
        aurora: 'aurora 15s ease infinite',
      },
      // --- SECCIÓN DE KEYFRAMES EXISTENTE ---
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "glow": {
          "0%": { boxShadow: "0 0 5px rgba(247, 147, 30, 0.4)" },
          "100%": { boxShadow: "0 0 20px rgba(247, 147, 30, 0.8)" },
        },
        // --- AÑADIDO --- Keyframes para Aurora
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
  ],
}