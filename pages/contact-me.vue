<template>
    <main id="contact-me" class="page">

        <div id="mobile-page-title">
            <h2>_me-contacter</h2>
        </div>

        <div id="page-menu" class="w-full h-full flex flex-col border-right">

            <!-- contacts -->
            <div id="contacts" class="submenu">
                <div class="title" @click="open('contacts')">
                    <img class="arrow" src="/icons/arrow.svg">
                    <h3>
                        contacts
                    </h3>
                </div>
                <div id="links">
                    <div v-for="(source, key) in contact.direct.sources" :key="key" class="link">
                        <img :src="'/icons/' + key + '.svg'">
                        <a v-html="source" href="/" class="font-fira_retina text-menu-text hover:text-white"></a>
                    </div>
                </div>
            </div>

            <!-- find me also in -->
            <div id="find-me-in" class="submenu border-top">
                <div class="title" @click="open('find-me-in')">
                    <img class="arrow" src="/icons/arrow.svg">
                    <h3>
                        me-trouver-aussi-sur </h3>
                </div>
                <div id="links">
                    <div v-for="(source, key) in contact.find_me_also_in.sources" :key="key" class="link">
                        <img src="/icons/link.svg">
                        <a :href="source.url + source.user" class="font-fira_retina text-menu-text hover:text-white"
                            target="_blank">{{ source.title }}</a>
                    </div>
                </div>
            </div>

        </div>

        <div class="flex flex-col w-full">

            <!-- windows tab -->
            <div class="tab-height w-full hidden lg:flex border-right border-bot items-center">

                <div class="flex items-center border-right h-full">
                    <p class="font-fira_regular text-menu-text text-sm px-3">contacts</p>
                    <img src="/icons/close.svg" alt="" class="m-3">
                </div>

            </div>

            <!-- main -->
            <div class="flex lg:grid lg:grid-cols-2 h-full w-full">

                <div id="left" class="h-full w-full flex flex-col border-right items-center">

                    <ContactForm :name="name" :email="email" :message="message" />

                </div>

                <div id="right" class="h-full w-full hidden lg:flex">

                    <div class="form-content">
                        <FormContentCode :name="name" :email="email" :message="message" />
                    </div>
                    <!-- scroll bar -->
                    <div id="scroll-bar" class="h-full border-left flex justify-center py-1">
                        <div id="scroll"></div>
                    </div>

                </div>
            </div>

        </div>
    </main>
</template>

<script setup>
const contact = useRuntimeConfig().dev.contacts

useHead({
    title: 'Contact | RAFANAMBINANTSOA Maminirina Karim',
    meta: [
        { name: 'description', content: 'Contactez RAFANAMBINANTSOA Maminirina Karim - Développeur Full Stack disponible pour vos projets web et collaborations' },
        {
            name: 'keywords',
            content: 'RAFANAMBINANTSOA Maminirina Karim, contact développeur, développeur freelance, freelance full stack, collaboration projet web, prestataire web, développement web, développement mobile, création de site web, applications web, projets web, développeur indépendant, demande de devis, mission freelance, Vue.js, NuxtJS, Laravel, Flutter, Symfony'
        },

        { name: 'author', content: 'RAFANAMBINANTSOA Maminirina Karim' },
        { property: 'og:title', content: 'Contactez RAFANAMBINANTSOA Maminirina Karim' },
        { property: 'og:description', content: 'Prenez contact pour discuter de vos projets web et collaborations' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://karimrafanambinantsoa.vercel.app/contact-me' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'French' }
    ],
    link: [
        { rel: 'canonical', href: 'https://karimrafanambinantsoa.vercel.app/contact-me' }
    ]
})
</script>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            message: '',
        }
    },
    setup() {
        const contact = useRuntimeConfig().dev.contacts

        useHead({
            title: 'Rafanambinantsoa Maminirina Karim - Contact',
            meta: [
                {
                    name: 'description',
                    content: 'Contactez Rafanambinantsoa Maminirina Karim - Développeur web fullstack disponible pour vos projets'
                },
                {
                    name: 'keywords',
                    content: 'Rafanambinantsoa Maminirina Karim, contact développeur, freelance, projets web, développement sur mesure, consultation technique, devis développement web, collaboration, contact professionnel, expertise technique, développement agile'
                },
                {
                    property: 'og:title',
                    content: 'Rafanambinantsoa Maminirina Karim - Contactez-moi'
                },
                {
                    property: 'og:description',
                    content: 'Prenez contact pour discuter de vos projets de développement web'
                },
                { property: 'og:type', content: 'website' },
                { name: 'twitter:card', content: 'summary_large_image' },
                {
                    name: 'twitter:title',
                    content: 'Rafanambinantsoa Maminirina Karim - Contact'
                },
                {
                    name: 'twitter:description',
                    content: 'Prenez contact pour discuter de vos projets de développement web'
                }
            ],
            htmlAttrs: {
                lang: 'fr'
            }
        })

        return {
            contact
        }
    },
    methods: {
        open(elementId) {
            const element = document.getElementById(elementId);
            const arrow = element.querySelector('.arrow');
            const links = element.querySelector('#links');

            if (links.style.display === 'block') {
                links.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            } else {
                links.style.display = 'block';
                arrow.style.transform = 'rotate(90deg)';
            }
        }
    },
    mounted() {

        const nameInput = document.getElementById('name-input');
        const emailInput = document.getElementById('email-input');
        const messageInput = document.getElementById('message-input');

        nameInput.addEventListener('input', (event) => {
            const nameValue = document.getElementById('name-value')
            nameValue.innerHTML = event.target.value;
        })

        emailInput.addEventListener('input', (event) => {
            const emailValue = document.getElementById('email-value')
            emailValue.innerHTML = event.target.value;
        })

        messageInput.addEventListener('input', (event) => {
            const messageValue = document.getElementById('message-value')
            messageValue.innerHTML = event.target.value;
        })

        /**
         * * Close all submenus
         * ! This is a temporary solution.
         * ! This is needed because when the page is loaded, height style on #links are not applied.
         */
        const links = document.getElementsByClassName('submenu');
        for (let i = 0; i < links.length; i++) {
            if (window.innerWidth > 1024) {
                links[i].querySelector("#links").style.display = "block";
                links[i].querySelector(".arrow").style.transform = "rotate(90deg)";
            } else {
                links[i].querySelector("#links").style.display = "none";
            }
        }
    },
}
</script>

<style>
.arrow {
    transition: 0.1s;
    margin-right: 10px;
    width: 9px;
    height: 9px;
}

.submenu {
    display: flex;
    flex-direction: column;
}

.submenu .title h3 {
    @apply font-fira_regular;
    color: white;
    font-size: 16px;
}

.link {
    display: flex;
    align-items: center;
    padding: 4px 25px;
}

.link img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
}

#links {
    padding: 10px 0px;
}

.form-content {
    padding: 75px 50px 0px 75px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    font-size: 15px;
}

@media (min-width: 1024px) {

    .submenu .title {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #1E2D3D;
        padding: 0px 25px;
        height: 35px;
        padding: 0px 25px;
    }

    .submenu .title:hover {
        cursor: pointer;
    }

    .submenu .title h3 {
        font-size: 14px;
    }
}
</style>