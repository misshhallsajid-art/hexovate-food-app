/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#ffffff',
        surface: '#ffffff',
        soft: '#fff5ec',
        ink: '#111111',
        body: '#4b5563',
        muted: '#6b7280',
        line: '#f1f2f4',
        accent: '#ff8a2b',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Poppins"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 24px -4px rgba(17, 17, 17, 0.06)',
        glow: '0 10px 25px -5px rgba(255, 138, 43, 0.40)',
      },
    },
  },
  plugins: [],
};