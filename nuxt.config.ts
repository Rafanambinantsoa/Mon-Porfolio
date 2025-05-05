const config = require('./developer.json');
const siteTitle = `${config.name} | ${config.role}`;
const siteDescription = config.role_description;
const siteUrl = 'https://karimrafanambinantsoa.vercel.app/'; // Remplacez par l'URL de votre site
const siteImage = `${siteUrl}/demo-share.jpg`; // Remplacez par l'URL de votre image

export default defineNuxtConfig({
  app: {
    head: {
      title: siteTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'title', hid: siteTitle, content: "Unique Portfolio: Karim Rafanambinantsoa's Daring Backend Dev" },
        {
          hid: 'description', name: 'description', content: "Meta TitlesUnique Portfolio: Karim Rafanambinantsoa's Daring Backend DevConfidential Insights: Karim Rafanambinantsoa's Portfolio UncoveredExciting New Portfolio: Karim Rafanambinantsoa, Backend Dev Outstanding Portfolio: Explore Karim Rafanambinantsoa's Dev Journey Powerful Portfolio: Secrets Behind Karim Rafanambinantsoa's Skills Meta Descriptions Discover the unique portfolio of Karim Rafanambinantsoa, a daring backend developer.Uncover his skills and remarkable projects today! Dive into the confidential insights of Karim Rafanambinantsoa's portfolio. Explore his extraordinary journey in backend development now! Explore the exciting new portfolio of Karim Rafanambinantsoa, a talented backend developer.Get inspired by his projects today! Unveil the outstanding portfolio of backend developer Karim Rafanambinantsoa.Learn about his unique skills and contributions to tech! Discover powerful insights into Karim Rafanambinantsoa's developer portfolio. Uncover the secrets to his success in backend development."
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'portfolio développeur backend Madagascar, Rafanambinantsoa Karim développeur web, compétences développement mobile Madagascar, développeur fullstack PHP professionnel, portefolio web développeur nuxtjs, Rafanambinantsoa portfolio Laravel, développeur backend Madagascar, avis sur le développement web Madagascar, services de développement mobile Karim, expert backend développeur PHP, projets fullstack web Madagascar, carrière de développeur mobile en Madagascar, Rafanambinantsoa compétences techniques, développement web freelance Madagascar, articles sur Laravel et développement backend, développeurs nuxtjs à Madagascar, portfolio de développeur mobile, formations développement web en Madagascar, tendances développement backend 2023, devenez développeur Laravel, exigences pour développeur fullstack, Rafanambinantsoa et technophilie, comparer les frameworks PHP, trouver un développeur web à Madagascar, avantages du développement mobile, projets PHP populaires en développement web, communauté des développeurs à Madagascar, développement mobile avec nuxtjs, freelancing pour développeurs backend, Rafanambinantsoa projets innovants'
        }
        ,

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