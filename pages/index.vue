<template>
  <meta name="google-site-verification" content="g57-LoHOA_yqiP5MVvFzuzLm6vC9bmwW_04PNxzLAbw" />
  <main v-if="!loading" id="hello">

    <!-- gradients -->
    <div class="css-blurry-gradient-blue"></div>
    <div class="css-blurry-gradient-green"></div>

    <section class="hero">
      <div class="head">
        <span>
          Salut à tous, je suis
        </span>
        <h1 class="text-2xl text-[#E5E9F0] font-fira_regular lg:text-4xl">{{ config.dev.name }}</h1>
        <h2> {{ config.dev.role }}</h2>
      </div>


      <div id="info">
        <span :class="{ hide: isMobile }">
          // Vous pouvez également me suivre sur ma page Github.
        </span>
        <span :class="{ hide: !isMobile }">
          // find my profile on Github:
        </span>
        <p class="code">
          <span class="identifier">
            const
          </span>
          <span class="variable-name">
            githubLink
          </span>
          <span class="operator">
            =
          </span>
          <a class="string" :href="'https://github.com/' + config.public.dev.contacts.social.github.user">
            "https://github.com/{{ config.public.dev.contacts.social.github.user }}"
          </a>
        </p>
      </div>
    </section>

    <section data-aos="fade-up" class="game" v-if="!isMobile">
      <SnakeGame />
    </section>

  </main>
</template>

<style>
#hello {
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1 1 auto;
  padding-left: 275px;
  overflow: hidden;
  /* padding-top: 5rem; */
  /* 80px */
}

.hero {
  width: 100%;
  justify-content: center;

}

.game {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  /* 	align-items: center; */
  z-index: 20;
}

#hello .hero {
  display: flex;
  flex-direction: column;
  /* display: grid;
	grid-template-columns: repeat(12, minmax(0, 1fr)); */
  margin: 0rem;
}


#hello .head span {
  font-size: 18px;
  line-height: 1;
  color: #E5E9F0;
  font-family: 'Fira Code Retina';
}

/* #hello .head h1 {
  font-size: 58px;
  line-height: 1;
  color: #E5E9F0;
  font-family: 'Fira Code Regular';
  padding-top: 1rem; /* 16px 
  padding-bottom: 1rem; /* 16px 
} */

#hello .head h2 {
  font-size: 32px;
  line-height: 1;
  color: #4D5BCE;
  font-family: 'Fira Code Retina';
}

.head {
  padding-bottom: 3rem;
}

#info {
  display: flex;
  flex-direction: column;
}

#info>span {
  font-size: 14px;
  line-height: 1;
  color: #607B96;
  font-family: 'Fira Code Retina';
  padding-bottom: 1rem;
  /* 16px */
}

.code {
  font-family: 'Fira Code Medium';
  color: #E5E9F0;
}

.code .identifier {
  color: #4D5BCE;
}

.code .variable-name {
  color: #43D9AD;
}

.code .operator {
  color: white;
}

.code .string {
  color: #E99287;
  text-decoration-line: underline;
  text-underline-offset: 4px;
}

#info {
  padding-block: 2.5rem;
}

#info .action {
  display: flex
}

.hide {
  display: none;
}

.css-blurry-gradient-blue {
  position: fixed;
  bottom: 25%;
  right: 5%;
  width: 300px;
  height: 300px;
  border-radius: 0% 0% 50% 50%;
  rotate: 10deg;
  filter: blur(70px);
  background: radial-gradient(circle at 50% 50%, rgba(77, 91, 206, 1), rgba(76, 0, 255, 0));
  opacity: 0.5;
  z-index: 10;
}

.css-blurry-gradient-green {
  position: absolute;
  top: 20%;
  right: 30%;
  width: 300px;
  height: 300px;
  border-radius: 0% 50% 0% 50%;
  filter: blur(70px);
  background: radial-gradient(circle at 50% 50%, rgba(67, 217, 173, 1), rgba(76, 0, 255, 0));
  opacity: 0.5;
  z-index: 10;
}

#info {
  font-size: 14px;
}


/* mobile */
@media (max-width: 768px) {

  #hello {
    padding-left: 0;
  }

  #hello .hero {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1.75rem;
    /* 28px */
  }

  .head {
    padding-top: 4rem;
    /* 40px */
  }

  #hello .head h2 {
    font-size: 20px;
    color: #43D9AD;
  }

  #info .action {
    display: none;
  }

}

/* tablet */
@media (min-width: 768px) and (max-width: 1024px) {
  #hello {
    padding-left: 0;
  }

  #hello .hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1.75rem;
    /* 28px */
  }

  .head {
    padding-top: 4rem;
    /* 40px */
  }

}

@media (min-width: 1024px) and (max-width: 1320px) {
  #hello {
    padding-left: 135px;
  }
}


/* LG */

@media (min-width: 1024px) {

  .css-blurry-gradient-blue {
    position: fixed;
    bottom: 10%;
    right: 10%;
    width: 500px;
    height: 500px;
    opacity: 0.7;
    border-radius: 100% 50% 100% 0%;
  }

  .css-blurry-gradient-green {
    position: fixed;
    top: 10%;
    right: 35%;
    filter: blur(100px);
    rotate: 10deg;
    width: 400px;
    height: 400px;
    opacity: 0.5;
    border-radius: 100% 0% 0% 0%;
    rotate: 20deg;
  }
}

@media (min-width: 1920px) {
  #hello {
    padding-left: 310px;
  }

  #hello .head h1 {
    font-size: 62px;
  }
}
</style>

<script setup>
const config = useRuntimeConfig()

useHead({
  title: 'RAFANAMBINANTSOA Maminirina Karim | Développeur Full Stack',
  meta: [
    { name: 'description', content: 'Portfolio de RAFANAMBINANTSOA Maminirina Karim - Développeur Full Stack passionné par la création d\'applications web modernes et performantes' },
    {
      name: 'keywords',
      content: 'RAFANAMBINANTSOA Maminirina Karim, développeur full stack, développeur web, portfolio développeur, développement web, développement mobile, Vue.js, NuxtJS, JavaScript, TypeScript, Flutter, Laravel, Symfony, Node.js, API REST, frontend, backend, ingénieur logiciel, web app, application mobile, UI/UX, responsive design'
    },

    { name: 'author', content: 'RAFANAMBINANTSOA Maminirina Karim' },
    { property: 'og:title', content: 'RAFANAMBINANTSOA Maminirina Karim - Portfolio' },
    { property: 'og:description', content: 'Développeur Full Stack spécialisé en Vue.js et technologies web modernes' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://karimrafanambinantsoa.vercel.app/' },
    { name: 'robots', content: 'index, follow' },
    { name: 'language', content: 'French' }
  ],
  link: [
    { rel: 'canonical', href: 'https://karimrafanambinantsoa.vercel.app/' }
  ]
})
</script>

<script>
export default {
  name: 'Hello',
  setup() {
    const config = useRuntimeConfig()

    useHead({
      title: 'Rafanambinantsoa Maminirina Karim - Portfolio',
      meta: [
        {
          name: 'description',
          content: 'Portfolio de Rafanambinantsoa Maminirina Karim - Développeur web fullstack passionné par la création d\'applications web modernes et performantes'
        },
        {
          name: 'keywords',
          content: 'Rafanambinantsoa Maminirina Karim, développeur fullstack, javascript, vue.js, nuxt.js, node.js, développement web, frontend, backend, portfolio développeur, web development, responsive design, applications web, programmation, coding, software engineer'
        },
        {
          property: 'og:title',
          content: 'Rafanambinantsoa Maminirina Karim - Portfolio Développeur Fullstack'
        },
        {
          property: 'og:description',
          content: 'Découvrez le portfolio de Rafanambinantsoa Maminirina Karim, développeur web fullstack'
        },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Rafanambinantsoa Maminirina Karim - Portfolio Développeur Fullstack'
        },
        {
          name: 'twitter:description',
          content: 'Découvrez le portfolio de Rafanambinantsoa Maminirina Karim, développeur web fullstack'
        }
      ],
      htmlAttrs: {
        lang: 'fr'
      }
    })

    return {
      config
    }
  },
  data() {
    return {
      isMobile: false,
      loading: true
    }
  },
  mounted() {
    // Detectamos si es mobile
    if (window.innerWidth <= 1024) {
      this.isMobile = true
    }

    // Escuchamos los cambios de tamaño de pantalla
    window.addEventListener('resize', this.handleResize)

    // When the component is mounted, we can remove the loader.
    this.loading = false
  },
  beforeDestroy() {
    // Remove the event listener when the component is destroyed.
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      if (window.innerWidth <= 1024) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    }
  }
}
</script>
