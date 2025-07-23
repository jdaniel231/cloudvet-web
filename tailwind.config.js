/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: '#1F4E79', // Deep Steel Blue for primary actions/branding
        secondary: '#7F8C8D', // Muted Gray for secondary elements
        accent: '#A7D9F0', // Very Light Blue for subtle highlights
        background: '#F2F4F6', // Very light gray background
        card: '#FFFFFF', // Pure white for cards
        text: '#34495E', // Dark Slate Blue for main text
        lightText: '#7F8C8D', // Medium Gray for secondary text
        border: '#D5DBDB', // Clean light gray for borders
      },
    },
  },
  plugins: [],
}

