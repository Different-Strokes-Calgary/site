import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://different-strokes-calgary.github.io',
  /* Trailing slash is intentional: BASE_URL is concatenated into URL builders
     (`${BASE_URL}assets/og-image.jpg`) in src/pages/index.astro and was missing
     a separator at the site boundary, producing `…/siteassets/og-image.jpg`
     instead of `…/site/assets/og-image.jpg` (broken OG meta URL on every
     link-preview surface). Hard-coded asset paths (`/site/assets/…`) elsewhere
     are unaffected. */
  base: '/site/',
  output: 'static',
});
