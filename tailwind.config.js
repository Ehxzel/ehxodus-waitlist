/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Merriweather', 'Georgia', 'serif'],
        display: ['Merriweather', 'Georgia', 'serif'],
        body: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Merriweather', 'Georgia', 'serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
