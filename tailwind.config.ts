import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: {
        blog: {
          css: {
            maxWidth: '720px',
            color: 'oklch(0.20 0.01 270)',
            lineHeight: '1.7',
            'h1, h2, h3, h4, h5, h6': {
              fontWeight: '500',
            },
            'h2': {
              fontSize: '20px',
              marginTop: '2rem',
              marginBottom: '0.75rem',
            },
            'h3': {
              fontSize: '17px',
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
            },
            'p': {
              marginBottom: '1.25rem',
            },
            'a': {
              color: '#2563eb',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
            'table': {
              fontSize: '14px',
              marginTop: '1rem',
              marginBottom: '1.5rem',
            },
            'thead': {
              backgroundColor: 'oklch(0.96 0.003 270)',
            },
            'th, td': {
              padding: '10px 12px',
              borderBottom: '0.5px solid oklch(0.92 0.004 270)',
            },
            'tbody tr:nth-child(even)': {
              backgroundColor: 'oklch(0.98 0.002 270)',
            },
            'blockquote': {
              borderLeftWidth: '3px',
              borderLeftColor: '#2563eb',
              paddingLeft: '1rem',
              fontStyle: 'normal',
            },
            'ul, ol': {
              marginBottom: '1.25rem',
            },
            'li': {
              marginBottom: '0.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
