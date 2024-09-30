/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#392AAB',
        secondary: '#E87A30',
        sub: '#1f2937',
        red: '#f44336',
        orange: '#FF6600',
        yellow: '#E8B86D',
        green: '#5DAD6E',
        blue: '#41A3FE',
        pink: '#FFD0CA',
        white: '#F5F5F5',
        black: '#121212',
        grey50: '#ABABAB',
        grey100: '#6E6E6E',
      },
      zIndex: {
        dimmed: '10',
        alert: '11',
      },
    },
    fontSize: {
      xs: [
        '12px',
        {
          lineHeight: '18px',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      sm: [
        '14px',
        {
          lineHeight: '21px',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      base: [
        '16px',
        {
          lineHeight: '24px',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      xl: ['20px', '30px'],
      '2xl': [
        '24px',
        {
          lineHeight: '36px',
          letterSpacing: '0',
          fontWeight: '700',
        },
      ],
    },
  },
  plugins: [],
};
