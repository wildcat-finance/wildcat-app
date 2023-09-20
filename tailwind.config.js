/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'border-black': '#000000',
        'black': '#232323',
        'blue': '#78BFC9',
        'green': '#7DA58A',
        'brown': '#854C31',
        'gold': '#857844',
        'red': '#932D2D',
        'sand': '#FFFEF2',
        'tint-11': '#F0F7FA',
      },
      borderRadius: {
        "sm": "10px",
        "md": "16px"
      }
    }
  },
  plugins: [],
}

