// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-raleway)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-noto-sans-mono)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
