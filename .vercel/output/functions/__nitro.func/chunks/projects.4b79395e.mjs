import { u as useHead } from './composables.0f4564d0.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_1 } from './arrow.5c2a6d90.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'defu';
import 'aos';
import './vercel.mjs';
import 'node-fetch-native/polyfill';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';

const name = "Rafanambinantsoa Karim";
const logo_name = "rafanambinantsoa-karim";
const role = "Back-end developer";
const role_description = "Je m'appelle Rafanambinantsoa Karim, un d\xE9veloppeur backend passionn\xE9 par la cr\xE9ation de syst\xE8mes robustes et \xE9volutifs. Mon expertise r\xE9side dans la conception d'architectures backend efficaces, garantissant une communication fluide entre le serveur et l'interface utilisateur. Je suis \xE9galement enthousiaste \xE0 l'id\xE9e d'explorer le d\xE9veloppement mobile pour \xE9largir mes comp\xE9tences.";
const about = {
  sections: {
    "professional-info": {
      title: "professional-info",
      icon: "icons/info-professional.svg",
      info: {
        experience: {
          title: "experience",
          description: "<br> <strong> UN-IT Fianarantsoa </strong> , <br> Pendant mon stage \xE0 UN-IT FIanarantsoa en tant que d\xE9veloppeur junior, <br> j'ai cr\xE9\xE9 une appli web pour la vente de billets et une app mobile pour le <br>  scan \xE0 l'entr\xE9e. Ces r\xE9alisations ont \xE9t\xE9 cruciales pour valider mon dipl\xF4me <br>  de licence en info, enrichissant ma formation th\xE9orique par une exp\xE9rience <br> pratique approfondie. <br><br> <strong>  Direction R\xE9gionale des Imp\xF4ts \xE0 Fianarantsoa, </strong> <br> Durant mon stage au Minist\xE8re des Finances en tant que Contr\xF4leur des <br>                       imp\xF4ts, j'ai explor\xE9 les rouages de la fiscalit\xE9 en examinant des dossiers, <br> v\xE9rifiant des d\xE9clarations et calculant les imp\xF4ts des contribuables. Cette  <br> exp\xE9rience, int\xE9gr\xE9e \xE0 ma formation en licence, a enrichi ma                        compr\xE9hension th\xE9orique par une immersion pratique essentielle."
        },
        "hard-skills": {
          title: "hard-skills",
          description: "<br>En tant que d\xE9veloppeur backend, je me sp\xE9cialise dans l'architecture et la mise en place de l'infrastructure centrale des applications, assurant une communication fluide entre le serveur et l'interface utilisateur. <br><br> Bien que ma sp\xE9cialit\xE9 r\xE9side dans la conception robuste des syst\xE8mes serveur, je suis \xE9galement capable de m'adapter et de collaborer pour compl\xE9ter les aspects frontaux. <br><br> Mon expertise r\xE9side dans la conception de bases de donn\xE9es \xE9volutives, l'optimisation des processus de r\xE9cup\xE9ration des donn\xE9es et la mise en place de protocoles s\xE9curis\xE9s pour garantir l'int\xE9grit\xE9 et la fiabilit\xE9 du syst\xE8me. Je suis passionn\xE9 par la cr\xE9ation d'algorithmes efficaces et l'utilisation des derni\xE8res technologies pour optimiser les performances et am\xE9liorer l'exp\xE9rience globale de l'utilisateur."
        },
        "soft-skills": {
          title: "soft-skills",
          description: "<br>Je propose bien plus que des comp\xE9tences techniques ; mon adaptabilit\xE9, ma capacit\xE9 \xE0 r\xE9soudre les probl\xE8mes et ma facilit\xE9 \xE0 collaborer avec des \xE9quipes pluridisciplinaires enrichissent chaque projet avec lequel je m'engage. Mon engagement pour l'apprentissage continu me permet de rester agile dans un paysage technologique en constante \xE9volution, favorisant l'innovation et promouvant des solutions durables."
        }
      }
    },
    "personal-info": {
      title: "personal-info",
      icon: "icons/info-personal.svg",
      info: {
        bio: {
          title: "bio",
          description: "<br> About me <br> j'ai explor\xE9 le d\xE9veloppement web pendant les deux derni\xE8res ann\xE9es, en me concentrant sur la cr\xE9ation d'exp\xE9riences utilisateur intuitives. <br> <br> R\xE9cemment, j'ai \xE9galement commenc\xE9 \xE0 explorer le d\xE9veloppement mobile, cherchant \xE0 \xE9largir mes horizons dans ce domaine dynamique. <br> Ma ma\xEEtrise du d\xE9veloppement backend me permet de comprendre en profondeur les syst\xE8mes, mais je suis tout aussi enthousiaste \xE0 l'id\xE9e de m'adapter aux exigences du d\xE9veloppement frontend si n\xE9cessaire, car je crois fermement \xE0 l'importance de la polyvalence dans ce domaine en constante \xE9volution."
        },
        interests: {
          title: "interests",
          description: "<br>Je suis constamment en apprentissage, explorant de nouvelles technologies et m\xE9thodologies pour am\xE9liorer mes comp\xE9tences et rester \xE0 jour dans ce domaine en perp\xE9tuelle \xE9volution. En dehors du codage, je trouve du r\xE9confort et du plaisir dans les jeux vid\xE9o, un espace o\xF9 je me d\xE9tends et stimule ma cr\xE9ativit\xE9 et ma r\xE9flexion strat\xE9gique. C'est un moyen pour moi de d\xE9compresser et de me ressourcer."
        },
        education: {
          title: "education",
          description: "<br> <u>Mes parcours </u> :   <br><br> 2020 - 2023 =>  <br> EMIT (Ecole de Management et d'Innovation Technologique) Fianarantsoa <br><br>   - <strong>Troisi\xE8me ann\xE9e de licence</strong> <br> <i>Technologies avanc\xE9es et Frameworks </i> : Exploration approfondie des technologies \xE9mergentes et des frameworks utilis\xE9s dans le domaine de l'informatique. <br> <i> Stage de 3 mois et M\xE9moire de fin d'\xE9tudes </i> :  Int\xE9gration des connaissances acquises dans un cadre professionnel, d\xE9veloppement de comp\xE9tences pratiques, et r\xE9daction d'un m\xE9moire de fin d'\xE9tudes portant sur une probl\xE9matique innovante du domaine informatique. <br><br>   - <strong> Deuxi\xE8me ann\xE9e de licence </strong> <br> <i> Programmation et Programmation Orient\xE9e Objet (POO)  </i>:  D\xE9couverte des langages de programmation et leur utilisation dans un contexte orient\xE9 objet. Apprentissage pratique \xE0 travers des projets. <br> <i>Stage de 2 mois</i> : Application des connaissances acquises dans un environnement professionnel, renfor\xE7ant la compr\xE9hension des langages de programmation et du d\xE9veloppement logiciel. <br><br> - <strong> Premi\xE8re ann\xE9e de licence </strong> <br> <i> Bases de l'informatique  </i> : Apprentissage des concepts fondamentaux, notamment les syst\xE8mes d'exploitation, les algorithmes et les structures de donn\xE9es. <br> <i> R\xE9alisations </i> : Excellente ma\xEEtrise des concepts de base de l'informatique. <br><br> 2018 - 2019 => Coll\xE8ge Saint Fran\xE7ois Xavier Fianarantsoa ( CSFX) <br><br> <strong> Baccalaur\xE9at S\xE9rie D - Mention Assez Bien </strong>",
          files: {
            "high-school": "I have been in 'Las vi\xF1as'...",
            university: "The university..."
          }
        }
      }
    },
    "hobbies-info": {
      title: "hobbies-info",
      icon: "icons/info-hobbies.svg",
      info: {
        sports: {
          title: "sports",
          description: "<br>Je suis un passionn\xE9 de sport et j'ai une v\xE9ritable passion pour le basketball, pratiquant r\xE9guli\xE8rement pour am\xE9liorer mes comp\xE9tences sur le terrain. De plus, je m'adonne \xE0 une routine de course \xE0 pied le matin, trouvant \xE0 la fois la s\xE9r\xE9nit\xE9 et l'\xE9nergie dans mes sessions de jogging quotidiennes. Ces activit\xE9s contribuent non seulement \xE0 mon bien-\xEAtre physique, mais elles m'insufflent \xE9galement discipline et concentration au quotidien."
        },
        "favorite-games": {
          title: "favorite-games",
          description: "<br>Je suis un joueur passionn\xE9, trouvant mon \xE9quilibre entre la comp\xE9titivit\xE9 de Free Fire, le d\xE9fi intellectuel des \xE9checs, et l'apaisement dans la musique. Free Fire m'immerge dans des batailles en ligne stimulantes, les \xE9checs me poussent \xE0 exercer ma r\xE9flexion strat\xE9gique, tandis que la musique me permet de me d\xE9tendre et de trouver de l'inspiration. Ces activit\xE9s sont pour moi des \xE9chappatoires relaxantes, m'offrant un \xE9quilibre parfait entre d\xE9fis ludiques et moments de d\xE9tente."
        }
      }
    }
  }
};
const contacts = {
  direct: {
    title: "contacts",
    sources: {
      email: "tsukasashishiosama@gmail",
      phone: "+261 34 41 458 55"
    }
  },
  social: {
    github: {
      title: "Github profile",
      url: "https://github.com/",
      user: "Rafanambinantsoa"
    },
    facebook: {
      title: "Facebook profile",
      url: "https://facebook.com/",
      user: "tsukasa.zeldris"
    },
    twitter: {
      title: "Twitter account",
      url: "https://twitter.com/",
      user: "username"
    },
    instagram: {
      title: "Instagram account",
      url: "https://instagram.com/",
      user: "akutagawa_karim"
    }
  },
  find_me_also_in: {
    title: "find-me-also-in",
    sources: {
      linkedin: {
        title: "Linkedin profile",
        url: "rafanambinantsoa-kim-5a5508279",
        user: ""
      },
      github: {
        title: "Github profile",
        url: "https://github.com/",
        user: "Rafanambinantsoa"
      },
      instagram: {
        title: "Instagram account",
        url: "https://instagram.com/",
        user: "akutagawa_karim"
      },
      facebook: {
        title: "Facebook profile",
        url: "https://facebook.com/",
        user: "tsukasa.zeldris"
      }
    }
  }
};
const gists = {
  "1": "1f74d1fa53b617a7a760580a30c91048",
  "2": "7783e4b86dbb9470a9a20a12962eef4f"
};
const projects$1 = {
  "1": {
    title: "EventPass",
    description: "Une plateforme web g\xE8re la vente de billets pour les \xE9v\xE9nements, tandis qu'une app mobile d\xE9di\xE9e au scan assure l'acc\xE8s \xE0 ces \xE9v\xE9nements via les codes QR.",
    img: "/mia.png",
    tech: [
      "NuxtJs"
    ],
    url: "https://github.com/"
  },
  "2": {
    title: "SymfonyCuisine",
    description: "Mon projet Symfony permet de cr\xE9er et partager des recettes en utilisant divers ingr\xE9dients de mani\xE8re flexible entre plusieurs cr\xE9ateurs.",
    img: "/trinity.png",
    tech: [
      "Symfony"
    ],
    url: "https://github.com/"
  },
  "3": {
    title: "KimLogement",
    description: "Une app web pour ventes immobili\xE8res : l'admin valide les comptes des agents. Ces agents postent des maisons \xE0 vendre et les clients peuvent consulter et acheter.",
    img: "/estate.png",
    tech: [
      "Laravel"
    ],
    url: "https://github.com/"
  },
  "4": {
    title: "E-Commerce",
    description: "Une app mobile d\xE9di\xE9e \xE0 la vente de fournitures tech, offrant une large gamme de produits technologiques pour les passionn\xE9s de tech et les utilisateurs \xE0 la recherche d'articles high-tech.",
    img: "/appVente.png",
    tech: [
      "Flutter"
    ],
    url: "https://github.com/"
  },
  "5": {
    title: "DeclarImpot",
    description: "Une application web pour d\xE9clarer ses imp\xF4ts en ligne de mani\xE8re efficace et simple.",
    img: "/impot.png",
    tech: [
      "Laravel"
    ],
    url: "https://github.com/"
  },
  "6": {
    title: "Coming Soon",
    description: "Coming Soon",
    img: "/images/projects/ethereum.png",
    tech: [
      "NuxtJs"
    ],
    url: "https://github.com/"
  }
};
const developerData = {
  name,
  logo_name,
  role,
  role_description,
  about,
  contacts,
  gists,
  projects: projects$1
};
const _sfc_main = {
  setup() {
    useHead({
      title: "Projets | Rafanambinantsoa Maminirina Karim ",
      meta: [
        {
          name: "description",
          content: "D\xE9couvrez les projets de d\xE9veloppement web r\xE9alis\xE9s par Rafanambinantsoa Maminirina Karim - Portfolio de r\xE9alisations techniques"
        },
        {
          name: "keywords",
          content: "Rafanambinantsoa Maminirina Karim, projets web, portfolio d\xE9veloppeur, NuxtJS, Laravel, Flutter, Symfony, d\xE9veloppement fullstack, applications web, projets techniques, r\xE9alisations d\xE9veloppeur, expertise web"
        },
        {
          property: "og:title",
          content: "Rafanambinantsoa Maminirina Karim - Portfolio de Projets"
        },
        {
          property: "og:description",
          content: "Explorez mes projets de d\xE9veloppement web et applications"
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Rafanambinantsoa Maminirina Karim - Portfolio de Projets"
        },
        {
          name: "twitter:description",
          content: "Explorez mes projets de d\xE9veloppement web et applications"
        }
      ],
      htmlAttrs: {
        lang: "fr"
      }
    });
  },
  data() {
    return {
      techs: ["NuxtJs", "Laravel", "Flutter", "Symfony"],
      filters: ["all"],
      projects: {},
      loading: true
    };
  },
  async created() {
    try {
      this.loading = true;
      this.projects = developerData.projects || {};
      if (!this.projects || Object.keys(this.projects).length === 0) {
        console.error("No projects data available");
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      this.projects = {};
    } finally {
      this.loading = false;
    }
  },
  methods: {
    filterProjects(tech) {
      if (!this.projects)
        return;
      document.getElementById("icon-tech-" + tech).classList.toggle("active");
      document.getElementById("title-tech-" + tech).classList.toggle("active");
      const check = document.getElementById(tech);
      if (check.checked) {
        this.filters = this.filters.filter((item) => item !== "all");
        this.filters.push(tech);
      } else {
        this.filters = this.filters.filter((item) => item !== tech);
        this.filters.length === 0 ? this.filters.push("all") : null;
      }
      this.filters[0] == "all" ? this.projects = developerData.projects : this.projects = this.filterProjectsBy(this.filters);
      if (this.projects.length === 0) {
        document.getElementById("projects-case").classList.remove("grid");
        document.getElementById("not-found").classList.remove("hidden");
      } else {
        document.getElementById("projects-case").classList.add("grid");
        document.getElementById("not-found").classList.add("hidden");
      }
    },
    hiddeSection() {
      document.getElementById("filter-menu").classList.toggle("hidden");
      document.getElementsByClassName("section-arrow")[0].classList.toggle("rotate-90");
    },
    filterProjectsBy(filters) {
      if (!developerData.projects)
        return [];
      const projectArray = Object.values(developerData.projects);
      return projectArray.filter((project) => {
        return filters.some((filter) => project.tech.includes(filter));
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if (!$data.loading) {
    _push(`<main${ssrRenderAttrs(mergeProps({ class: "flex flex-col flex-auto lg:flex-row overflow-hidden" }, _attrs))}><div id="mobile-page-title"><h2>_Mes-projets</h2></div><div id="section-content-title" class="flex lg:hidden"><img class="section-arrow"${ssrRenderAttr("src", _imports_0)}><p class="font-fira_regular text-white text-sm">projects</p></div><div id="filter-menu" class="w-full flex-col border-right font-fira_regular text-menu-text hidden lg:flex"><div id="section-content-title" class="hidden lg:flex items-center min-w-full"><img id="section-arrow-menu"${ssrRenderAttr("src", _imports_0)} alt="" class="section-arrow mx-3 open"><p class="font-fira_regular text-white text-sm">projects</p></div><nav id="filters" class="w-full flex-col"><!--[-->`);
    ssrRenderList($data.techs, (tech) => {
      _push(`<div class="flex items-center py-2"><input type="checkbox"${ssrRenderAttr("id", tech)}><img${ssrRenderAttr("id", "icon-tech-" + tech)}${ssrRenderAttr("src", "/icons/techs/" + tech.toLowerCase() + ".svg")} alt="" class="tech-icon w-5 h-5 mx-4"><span${ssrRenderAttr("id", "title-tech-" + tech)}>${ssrInterpolate(tech)}</span></div>`);
    });
    _push(`<!--]--></nav></div><div class="flex flex-col w-full overflow-hidden"><div class="tab-height w-full hidden lg:flex border-bot items-center"><div class="flex items-center border-right h-full"><!--[-->`);
    ssrRenderList($data.filters, (filter) => {
      _push(`<p class="font-fira_regular text-menu-text text-sm px-3">${ssrInterpolate(filter)}; </p>`);
    });
    _push(`<!--]--><img${ssrRenderAttr("src", _imports_1)} alt="" class="m-3"></div></div><div id="tab" class="flex lg:hidden items-center"><span class="text-white"> // </span><p class="font-fira_regular text-white text-sm px-3">projects</p><span class="text-menu-text"> / </span><!--[-->`);
    ssrRenderList($data.filters, (filter) => {
      _push(`<p class="font-fira_regular text-menu-text text-sm px-3">${ssrInterpolate(filter)}; </p>`);
    });
    _push(`<!--]--></div><div id="projects-case" class="grid grid-cols-1 lg:grid-cols-2 max-w-full h-full overflow-scroll lg:self-center"><div id="not-found" class="hidden flex flex-col font-fira_retina text-menu-text my-5 h-full justify-center items-center"><span class="flex justify-center text-4xl pb-3"> X__X </span><span class="text-white flex justify-center text-xl"> No matching projects </span><span class="flex justify-center"> for these technologies </span></div><!--[-->`);
    ssrRenderList($data.projects, (project, key, index) => {
      _push(`<div id="project" class="lg:mx-5"><span class="flex text-sm my-3">`);
      if (index == null) {
        _push(`<h3 class="text-purplefy font-fira_bold mr-3">${ssrInterpolate(project.title)}</h3>`);
      } else {
        _push(`<h3 class="text-purplefy font-fira_bold mr-3">${ssrInterpolate(project.title)}</h3>`);
      }
      _push(`</span><div id="project-card" class="flex flex-col"><div id="window"><div class="absolute flex right-3 top-3"><!--[-->`);
      ssrRenderList(project.tech, (tech) => {
        _push(`<img${ssrRenderAttr("src", "/icons/techs/filled/" + tech.toLowerCase() + ".svg")} alt="" class="w-6 h-6 mx-1 hover:opacity-75">`);
      });
      _push(`<!--]--></div><img id="showcase"${ssrRenderAttr("src", project.img)} alt="" class=""></div><div class="pb-8 pt-6 px-6 border-top"><p class="text-menu-text font-fira_retina text-sm mb-5">${ssrInterpolate(project.description)}</p><a id="view-button"${ssrRenderAttr("href", project.url)} target="_blank" class="text-white font-fira_retina py-2 px-4 w-fit text-xs rounded-lg"> view-project </a></div></div></div>`);
    });
    _push(`<!--]--></div></div></main>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const projects = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { projects as default };
//# sourceMappingURL=projects.4b79395e.mjs.map
