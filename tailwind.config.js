/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6439FF',
        secondary: '#4F75FF',
        sub: '#00CCDD',
        red: '#f44336',
        orange: '#FF6600',
        yellow: '#E8B86D',
        green: '#4caf50',
        blue: '#2196f3',
        white: '#fff',
        black: '#212121',
        grey: 'rgba(159, 159, 159, 1)',
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
