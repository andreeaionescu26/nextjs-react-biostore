import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // ===== CUSTOM COLOR PALETTE =====
      colors: {
        // Brand Colors (Your #F58232 accent)
        brand: {
          50: 'rgb(254, 247, 240)',   // #fef7f0
          100: 'rgb(254, 234, 214)',  // #feead6
          200: 'rgb(252, 210, 173)',  // #fcd2ad
          300: 'rgb(250, 180, 120)',  // #fab478
          400: 'rgb(247, 144, 65)',   // #f79041
          500: 'rgb(245, 130, 50)',   // #f58232 - Your main color
          600: 'rgb(230, 107, 26)',   // #e66b1a
          700: 'rgb(191, 80, 23)',    // #bf5017
          800: 'rgb(153, 66, 28)',    // #99421c
          900: 'rgb(125, 55, 25)',    // #7d3719
          950: 'rgb(68, 27, 9)',      // #441b09
        },
        
        // Secondary Colors (Complementary)
        secondary: {
          50: 'rgb(248, 250, 252)',   // #f8fafc
          100: 'rgb(241, 245, 249)',  // #f1f5f9
          200: 'rgb(226, 232, 240)',  // #e2e8f0
          300: 'rgb(203, 213, 225)',  // #cbd5e1
          400: 'rgb(148, 163, 184)',  // #94a3b8
          500: 'rgb(100, 116, 139)',  // #64748b
          600: 'rgb(71, 85, 105)',    // #475569
          700: 'rgb(51, 65, 85)',     // #334155
          800: 'rgb(30, 41, 59)',     // #1e293b
          900: 'rgb(15, 23, 42)',     // #0f172a
        },

        // Neutral Colors (Warm Grays)
        neutral: {
          50: 'rgb(250, 250, 249)',   // #fafaf9
          100: 'rgb(245, 245, 244)',  // #f5f5f4
          200: 'rgb(231, 229, 228)',  // #e7e5e4
          300: 'rgb(214, 211, 209)',  // #d6d3d1
          400: 'rgb(168, 162, 158)',  // #a8a29e
          500: 'rgb(120, 113, 108)',  // #78716c
          600: 'rgb(87, 83, 78)',     // #57534e
          700: 'rgb(68, 64, 60)',     // #44403c
          800: 'rgb(41, 37, 36)',     // #292524
          900: 'rgb(28, 25, 23)',     // #1c1917
        },

        // Semantic Colors
        success: {
          50: 'rgb(240, 253, 244)',   // #f0fdf4
          100: 'rgb(220, 252, 231)',  // #dcfce7
          500: 'rgb(34, 197, 94)',    // #22c55e
          600: 'rgb(22, 163, 74)',    // #16a34a
          700: 'rgb(21, 128, 61)',    // #15803d
        },
        
        warning: {
          50: 'rgb(255, 251, 235)',   // #fffbeb
          100: 'rgb(254, 243, 199)',  // #fef3c7
          500: 'rgb(245, 158, 11)',   // #f59e0b
          600: 'rgb(217, 119, 6)',    // #d97706
          700: 'rgb(180, 83, 9)',     // #b45309
        },
        
        error: {
          50: 'rgb(254, 242, 242)',   // #fef2f2
          100: 'rgb(254, 226, 226)',  // #fee2e2
          500: 'rgb(239, 68, 68)',    // #ef4444
          600: 'rgb(220, 38, 38)',    // #dc2626
          700: 'rgb(185, 28, 28)',    // #b91c1c
        },
        
        info: {
          50: 'rgb(239, 246, 255)',   // #eff6ff
          100: 'rgb(219, 234, 254)',  // #dbeafe
          500: 'rgb(59, 130, 246)',   // #3b82f6
          600: 'rgb(37, 99, 235)',    // #2563eb
          700: 'rgb(29, 78, 216)',    // #1d4ed8
        },

        // Background & Foreground
        background: 'rgb(250, 250, 249)', // neutral-50
        foreground: 'rgb(28, 25, 23)',    // neutral-900
      },

      // ===== TYPOGRAPHY =====
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },

      fontSize: {
        xs: ['clamp(0.75rem, 0.7rem + 0.2vw, 0.8rem)', { lineHeight: '1.4' }],
        sm: ['clamp(0.875rem, 0.8rem + 0.3vw, 0.95rem)', { lineHeight: '1.45' }],
        base: ['clamp(1rem, 0.95rem + 0.3vw, 1.1rem)', { lineHeight: '1.5' }],
        lg: ['clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)', { lineHeight: '1.5' }],
        xl: ['clamp(1.25rem, 1.15rem + 0.5vw, 1.4rem)', { lineHeight: '1.4' }],
        '2xl': ['clamp(1.5rem, 1.3rem + 0.8vw, 1.75rem)', { lineHeight: '1.3' }],
        '3xl': ['clamp(1.875rem, 1.6rem + 1.2vw, 2.25rem)', { lineHeight: '1.25' }],
        '4xl': ['clamp(2.25rem, 1.9rem + 1.5vw, 2.75rem)', { lineHeight: '1.2' }],
        '5xl': ['clamp(3rem, 2.5rem + 2vw, 3.75rem)', { lineHeight: '1.1' }],
      },

      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },

      // ===== SPACING =====
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
      },

      // ===== LAYOUT =====
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },

      // ===== BORDER RADIUS =====
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      // ===== SHADOWS =====
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        
        // E-commerce specific shadows
        'product-card': '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'product-hover': '0 8px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.08)',
        'button': '0 2px 4px -1px rgba(245, 130, 50, 0.2)',
        'button-hover': '0 4px 8px -2px rgba(245, 130, 50, 0.3)',
        
        // Modern shadow styles
        'modern': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.1)',
        'modern-lg': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 8px -2px rgba(0, 0, 0, 0.1), 0 16px 32px -8px rgba(0, 0, 0, 0.15)',
        'modern-xl': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 24px 48px -12px rgba(0, 0, 0, 0.2)',
      },

      // ===== TRANSITIONS =====
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '200': '200ms',
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },

      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },

      // ===== ANIMATIONS =====
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-soft': 'bounce 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-1rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(1rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },

      // ===== Z-INDEX =====
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'dropdown': '1000',
        'sticky': '1100',
        'banner': '1200',
        'overlay': '1300',
        'modal': '1400',
        'popover': '1500',
        'skiplink': '1600',
        'toast': '1700',
        'tooltip': '1800',
      },

      // ===== GRID =====
      gridTemplateColumns: {
        'product-grid': 'repeat(auto-fit, minmax(280px, 1fr))',
        'product-grid-dense': 'repeat(auto-fit, minmax(240px, 1fr))',
        'category-layout': '240px 1fr',
        'product-detail': '1fr 1fr',
        'checkout': '1fr 400px',
        'auto-fit-sm': 'repeat(auto-fit, minmax(200px, 1fr))',
        'auto-fit-md': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fit-lg': 'repeat(auto-fit, minmax(400px, 1fr))',
      },

      // ===== BACKDROP BLUR =====
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },

      // ===== ASPECT RATIO =====
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
        '1/2': '1 / 2',
        '2/1': '2 / 1',
        'product': '4 / 5', // Common e-commerce product image ratio
      },
    },
  },
  plugins: [
    // Custom component classes
    function({ addComponents, theme }: any) {
      addComponents({
        // Container variants
        '.container-fluid': {
          width: '100%',
          maxWidth: theme('maxWidth.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '@screen sm': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
          },
          '@screen lg': {
            paddingLeft: theme('spacing.8'),
            paddingRight: theme('spacing.8'),
          },
        },

        '.section-padding': {
          paddingTop: theme('spacing.12'),
          paddingBottom: theme('spacing.12'),
          '@screen lg': {
            paddingTop: theme('spacing.16'),
            paddingBottom: theme('spacing.16'),
          },
          '@screen xl': {
            paddingTop: theme('spacing.20'),
            paddingBottom: theme('spacing.20'),
          },
        },

        // Focus ring utility
        '.focus-ring': {
          '&:focus-visible': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${theme('colors.brand.500')}, 0 0 0 4px ${theme('colors.brand.200')}`,
          },
        },

        // Glass effect
        '.glass-effect': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },

        // Modern scrollbar
        '.scrollbar-modern': {
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme('colors.neutral.100'),
            borderRadius: theme('borderRadius.full'),
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme('colors.neutral.300'),
            borderRadius: theme('borderRadius.full'),
            '&:hover': {
              background: theme('colors.brand.400'),
            },
          },
        },
      });
    },
  ],
};

export default config;