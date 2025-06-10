/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // IMPORTANT: Use forward slashes, even on Windows
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Also include root level (just in case)
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef7f0',
          100: '#feead6',
          200: '#fcd2ad',
          300: '#fab478',
          400: '#f79041',
          500: '#f58232',
          600: '#e66b1a',
          700: '#bf5017',
          800: '#99421c',
          900: '#7d3719',
          950: '#441b09',
        },
      },
    },
  },
  plugins: [],
};