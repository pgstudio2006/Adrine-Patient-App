/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        surface: {
          primary: '#ffffff',
          secondary: '#f8fafc',
        },
        muted: '#64748b',
        danger: '#dc2626',
        success: '#16a34a',
        warning: '#d97706',
        'success-light': '#dcfce7',
        'warning-light': '#fef3c7',
        'danger-light': '#fee2e2',
        'info-light': '#dbeafe',
        border: '#e2e8f0',
      },
      fontFamily: {
        sans: ['System'],
        mono: ['monospace'],
      },
    },
  },
  plugins: [],
};
