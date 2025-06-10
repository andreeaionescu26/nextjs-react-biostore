/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Add your custom colors here
      colors: {
        brand: {
          50: '#fef7f0',
          100: '#feead6',
          200: '#fcd2ad',
          300: '#fab478',
          400: '#f79041',
          500: '#f58232',  // Your main color
          600: '#e66b1a',
          700: '#bf5017',
          800: '#99421c',
          900: '#7d3719',
          950: '#441b09',
        },
        // Add other custom colors if needed
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}