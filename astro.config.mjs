// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://brittleboye.github.io',
  base: isProd ? '/awesome-lattice' : '/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    server: {
      watch: {
        // Windows-native chokidar watchers occasionally detach (Vite issue
        // #4704, Astro #2015). Polling costs a little CPU but keeps HMR
        // reliable through sleep/resume and junction-pathed workspaces.
        usePolling: true,
        interval: 300,
      },
    },
  },
});
