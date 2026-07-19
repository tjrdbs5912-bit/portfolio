import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
        bg: '#fafaf9',
        fg: '#141414',
        mute: '#6b6b6b',
        line: '#e6e6e4',
        accent: '#2f6b2f',
      },
    },
  },
  plugins: [],
}

export default config
