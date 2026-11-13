/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: '#FFF9F5',    // page background (warm cream)
        surface: '#FFFFFF',  // cards and panels
        soft: '#FDEFE3',     // chips, inputs, hover panels (light peach)
        ink: '#1F1712',      // main text (warm near-black)
        body: '#4A3F37',     // body text
        muted: '#6B5B4F',    // secondary text
        accent: '#F26B1D',   // orange: buttons, prices, highlights
        accent2: '#FFA23D',  // lighter orange
        line: 'rgba(60,30,10,0.10)', // thin borders
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(120,60,20,0.18)',
        glow: '0 12px 28px -10px rgba(242,107,29,0.55)',
      },
    },
  },
  plugins: [],
}