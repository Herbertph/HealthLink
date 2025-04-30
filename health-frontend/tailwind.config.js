/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'soft': '0 2px 12px rgba(0, 0, 0, 0.1)',
        'deep': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
      }
    }
  },
  plugins: [],
}
