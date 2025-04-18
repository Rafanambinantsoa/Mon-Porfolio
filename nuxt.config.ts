const config = require('./developer.json');
const siteTitle = `${config.name} | ${config.role}`;
const siteDescription = config.role_description;
const siteUrl = 'https://karimrafanambinantsoa.netlify.app/'; // Remplacez par l'URL de votre site
const siteImage = `${siteUrl}/demo-share.jpg`; // Remplacez par l'URL de votre image

export default defineNuxtConfig({
  app: {
    head: {
      title: siteTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: siteDescription },
        { hid: 'keywords', name: 'keywords', content: 'développeur backend, portfolio, Rafanambinantsoa Karim, développement web, développement mobile, karim, rafanambinantsoa, madagascar, developer, fullstack, web developer, mobile developer, backend developer' },
        { hid: 'author', name: 'author', content: config.name },

        // Open Graph
        { hid: 'og:title', property: 'og:title', content: siteTitle },
        { hid: 'og:description', property: 'og:description', content: siteDescription },
        { hid: 'og:image', property: 'og:image', content: siteImage },
        { hid: 'og:url', property: 'og:url', content: siteUrl },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:locale', property: 'og:locale', content: 'fr_FR' },

        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: siteTitle },
        { hid: 'twitter:description', name: 'twitter:description', content: siteDescription },
        { hid: 'twitter:image', name: 'twitter:image', content: siteImage },
        { hid: 'twitter:site', name: 'twitter:site', content: '@votre_compte_twitter' }, // Remplacez par votre compte Twitter

        // Canonical
        { hid: 'canonical', name: 'canonical', content: siteUrl },

        // Robots
        { hid: 'robots', name: 'robots', content: 'index, follow' },

        // Language and Region
        { hid: 'language', name: 'language', content: 'French' },
        { hid: 'region', name: 'region', content: 'Madagascar' },

        { name: 'theme-color', content: '#010C15' },
      ],
      link: [
        { rel: 'manifest', href: 'pwa/manifest.json' },
        { rel: 'apple-touch-icon', href: 'pwa/icons/apple-touch-icon.png' },
        { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
      ],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
  ],

  components: {
    dirs: [
      '~/components',
    ],
  },

  tailwindcss: {
    cssPath: '~/assets/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: true,
    injectPosition: 0,
    viewer: false,
  },

  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: '/api',
      dev: config
    }
  },

  // @ts-ignore
  sitemap: {
    hostname: siteUrl,
    gzip: true,
    routes: [
      '/',
      '/about',
      '/projects',
      '/contact',
      // Ajoutez d'autres routes importantes de votre site
    ],
  },

});