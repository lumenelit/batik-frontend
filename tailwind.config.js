/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'button-gradient':
          'linear-gradient(90deg, rgba(54,110,216,1) 0%, rgba(39,74,140,1) 100%);',
        'danger-gradient': 'linear-gradient(90deg, #F52323 0%, #B81A1A 100%);',
        'summer-gradient': 'linear-gradient(90deg, #F7B733 0%, #FC4A1A 100%);',
        'angular-white':
          'conic-gradient(from 200deg at 50% 50%, rgba(249, 249, 249, 1) 0%, rgba(255, 255, 255, 1) 100%);',
        'class-full': "url('./assets/images/classfull.svg')"
      },
      colors: {
        primary: {
          50: '#F2F2F2',
          100: '#E6F0FF',
          200: '#BFDBFF',
          300: '#99C2FF',
          400: '#4A8CF2',
          500: '#366DD7',
          600: '#2F5BB7',
          700: '#274A95',
          800: '#1F3973',
          900: '#172851'
        },
        danger: '#FF1616',
        success: '#10D00C',
        warning: '#FFBF00',
        disabled: '#D0D0D0',
        stroke: '#F0F4F8',
        dark: '171717'
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        dark: '0px 10px 45px 0px rgba(45,45,45,0.10);'
      }
    }
  },
  plugins: []
};
