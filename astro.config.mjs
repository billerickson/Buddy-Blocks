import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

const site = process.env.ASTRO_SITE ?? 'https://buddyblocks.yoursite.com';

export default defineConfig({
  integrations: [preact(), tailwind({ applyBaseStyles: false })],
  site,
});
