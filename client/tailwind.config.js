/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      blue: {
        100: "#00a3ff33",
        200: "#00A3FF",
      },
      grey: "#979797",
      black: "#000000",
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        'pulse-short': 'pulse 1s ease-in-out 1'
      }
    },
  },
  plugins: [],
}
