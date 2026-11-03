const tailwindConfig = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './context/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#05060a',
        surface: {
          DEFAULT: '#0a0d14',
          panel: 'rgba(10, 13, 20, 0.85)',
          hover: 'rgba(255, 255, 255, 0.05)',
        },
        brand: {
          cyan: '#00e5ff',
          violet: '#7c4dff',
          pink: '#ec4899',
          emerald: '#00e676',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      borderRadius: {
        glass: '16px',
      },
      boxShadow: {
        glow: '0 0 24px rgba(0, 229, 255, 0.25)',
        'glow-purple': '0 0 24px rgba(124, 77, 255, 0.25)',
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
