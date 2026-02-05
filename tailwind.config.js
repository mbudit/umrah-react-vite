/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary brand color (green - spiritual theme)
        primary: {
          DEFAULT: "#0df280",
          hover: "#0bd970",
          light: "#0df280/10",
        },
        // Background colors
        background: {
          light: "#f5f8f7",
          dark: "#101922",
        },
        // Surface/card colors
        surface: {
          light: "#ffffff",
          dark: "#1c2127",
        },
        // Accent colors
        accent: {
          dark: "#283039",
        },
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "bounce-slow": "bounceSlow 2s infinite",
        "spin-slow": "spin 3s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(13, 242, 128, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(13, 242, 128, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
