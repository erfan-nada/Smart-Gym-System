/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gymBlack: "#121212",
        gymDark: "#1e1e1e",
        gymGreen: "#00ff88", 
      }
    },
  },
  plugins: [],
}