// @ts-check
import { defineConfig } from 'astro/config';

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://brittleboye.github.io',
  base: isProd ? '/awesome-lattice' : '/',
  trailingSlash: 'ignore',
});
