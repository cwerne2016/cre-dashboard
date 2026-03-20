/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas:  '#F4F3F0',
        surface: '#FFFFFF',
        border:  '#E2E0DA',
        muted:   '#9A9890',
        ink: {
          DEFAULT:   '#1C1B19',
          secondary: '#4A4845',
          tertiary:  '#767370',
        },
        brand: {
          DEFAULT: '#1D3557',
          light:   '#2A4A7F',
          subtle:  '#EBF0F7',
        },
        positive: { DEFAULT: '#1A7A4A', bg: '#EAF5EE' },
        negative: { DEFAULT: '#C0392B', bg: '#FDECEA' },
        neutral:  { DEFAULT: '#5C6B7A', bg: '#EEF1F4' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
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
      borderRadius: { sm: '4px', DEFAULT: '6px', md: '8px', lg: '12px', xl: '16px' },
      boxShadow: {
        card:  '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        lift:  '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
        focus: '0 0 0 3px rgba(29,53,87,0.15)',
      },
    },
  },
  plugins: [],
}
