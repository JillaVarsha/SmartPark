/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',
        accent: '#3B82F6',
        success: '#10B981',
        danger: '#EF4444',
        disabled: '#6B7280',
        'danger-dark': '#B91C1C',
      },
    },
  },
  plugins: [],
} 