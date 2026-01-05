/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/screens/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        trust: '#1e3a8a',
        slate: {
          50: '#f8fafc',
          600: '#475569',
          900: '#0f172a',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1f2937',
          },
        },
      },
    },
  },
  plugins: [],
};
