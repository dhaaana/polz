// eslint-disable-next-line
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Rubik', ...fontFamily.sans],
        inter: ['Inter', ...fontFamily.sans],
        spacemono: ['Space Mono', ...fontFamily.mono],
      },
      colors: {
        cgreen: {
          50: '#32dc45',
          100: '#28d23b',
          200: '#1ec831',
          300: '#14be27',
          400: '#0ab41d',
          500: '#00aa13',
          600: '#00a009',
          700: '#009600',
          800: '#008c00',
          900: '#008200',
        },
        cpink: {
          50: '#ff4bc7',
          100: '#ff41bd',
          200: '#fd37b3',
          300: '#f32da9',
          400: '#e9239f',
          500: '#df1995',
          600: '#d50f8b',
          700: '#cb0581',
          800: '#c10077',
          900: '#b7006d',
        },
        corange: {
          50: '#ff5969',
          100: '#ff4f5f',
          200: '#ff4555',
          300: '#ff3b4b',
          400: '#f83141',
          500: '#ee2737',
          600: '#e41d2d',
          700: '#da1323',
          800: '#d00919',
          900: '#c6000f',
        },
        cblue: {
          50: '#32e0ff',
          100: '#28d6fe',
          200: '#1eccf4',
          300: '#14c2ea',
          400: '#0ab8e0',
          500: '#00aed6',
          600: '#00a4cc',
          700: '#009ac2',
          800: '#0090b8',
          900: '#0086ae',
        },
        cpurple: {
          50: '#c564c0',
          100: '#bb5ab6',
          200: '#b150ac',
          300: '#a746a2',
          400: '#9d3c98',
          500: '#93328e',
          600: '#892884',
          700: '#7f1e7a',
          800: '#751470',
          900: '#6b0a66',
        },
      },
    },
  },
  plugins: [],
};
