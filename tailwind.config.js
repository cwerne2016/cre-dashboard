/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas:  '#F3F2F1',
        surface: '#FFFFFF',
        border:  '#E0DDD9',
        muted:   '#8A8886',
        ink: {
          DEFAULT:   '#252423',
          secondary: '#605E5C',
          tertiary:  '#8A8886',
        },
        brand: {
          DEFAULT: '#118DFF',
          subtle:  '#EBF4FF',
        },
        positive: { DEFAULT: '#107C10', bg: '#DFF6DD' },
        negative: { DEFAULT: '#A80000', bg: '#FDE7E9' },
        neutral:  { DEFAULT: '#7A7574', bg: '#F3F2F1' },
        header:   '#252423',
      },
      fontFamily: {
        sans: ["'Segoe UI'", 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', '14px'],
        xs:    ['11px', '16px'],
        sm:    ['12px', '18px'],
        base:  ['13px', '20px'],
        md:    ['14px', '20px'],
        lg:    ['16px', '24px'],
        xl:    ['18px', '26px'],
        '2xl': ['22px', '30px'],
        '3xl': ['28px', '36px'],
      },
      borderRadius: { sm: '2px', DEFAULT: '4px', md: '4px', lg: '4px', xl: '4px' },
      boxShadow: {
        card: '0 1.6px 3.6px rgba(0,0,0,0.13), 0 0.3px 0.9px rgba(0,0,0,0.1)',
        lift: '0 3.2px 7.2px rgba(0,0,0,0.18), 0 0.6px 1.8px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
