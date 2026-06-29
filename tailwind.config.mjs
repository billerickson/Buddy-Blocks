export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: '#242134',
        muted: '#645d79',
        berry: '#e63e80',
        berryDark: '#a91f55',
        teal: '#18bca4',
        reward: '#ffd84d',
        build: '#5b79ff',
        action: '#ff7f45',
        wash: '#fff1f7',
        mint: '#f0fff9',
      },
      fontFamily: {
        display: ['Fredoka', '"Arial Rounded MT Bold"', 'system-ui', 'sans-serif'],
        body: ['Nunito', '"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        block: '6px 6px 0 var(--block-shadow)',
        blockLg: '10px 10px 0 var(--block-shadow)',
      },
    },
  },
  plugins: [],
};

