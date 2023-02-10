/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        socialBg:'#F5F7FB',
        socialBlue: '#218DFA',
        fortactive: '#0840a7',
        fortbg: '#0e1734',
        fortcard: '#1f1f23'
      },
    },
  },
  plugins: [],
}
