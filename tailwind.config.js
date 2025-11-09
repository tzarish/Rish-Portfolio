/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chomsky: ["Chomsky", "sans-serif"],
        'bigshot': ['"Bigshot One"', 'serif'],
      },
    },
  },
  plugins: [],
}