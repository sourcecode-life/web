import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sourcecode.life',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-hans', 'zh-hant'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
