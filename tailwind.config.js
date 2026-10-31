/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { ink:'#211d19', orange:'#f15d2e', cream:'#fff9f2', sand:'#f5eee5' },
    fontFamily: { display:['Georgia','serif'], sans:['Arial','sans-serif'] },
    boxShadow: { soft:'0 18px 50px rgba(63,42,25,.09)' }
  }},
  plugins: []
}