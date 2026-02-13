/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chomsky: ['chomsky', 'serif'],  // Changed from "Chomsky" to 'chomsky'
        bigshot: ['"Bigshot One"', 'cursive'],
      },
    },
  },
  plugins: [],
}