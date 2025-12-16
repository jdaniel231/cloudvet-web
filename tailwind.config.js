/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: '#0e7490', // Cyan 700 - Deep Medical Teal
        'primary-dark': '#155e75', // Cyan 800
        secondary: '#334155', // Slate 700
        accent: '#22d3ee', // Cyan 400 - Vibrant Accent
        background: '#f8fafc', // Slate 50
        surface: '#ffffff', // Pure White
        text: '#1e293b', // Slate 800
        'text-muted': '#64748b', // Slate 500
        border: '#e2e8f0', // Slate 200
        danger: '#ef4444',
        success: '#10b981',
        warning: '#f59e0b',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
}

