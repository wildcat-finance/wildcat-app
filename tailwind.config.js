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
        'sand': "#FFFEF2",
        'tint': {
          1: '#393938',
          2: '#4F4F4C',
          3: '#656561',
          4: '#7B7B76',
          5: '#91918B',
          6: '#A7A69F',
          7: '#BDBCB4',
          8: '#D3D2C9',
          9: '#E9E8DD',
          10: '#F4F3E8',
        },
        silver: {
          100: '#F0F7FA',
          200: '#F1F7F9'
        }
      },
      borderRadius: {
        "sm": "10px",
        "md": "16px"
      }
    }
  },
  plugins: [],
}

