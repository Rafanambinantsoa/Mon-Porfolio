import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';
import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { u as useRuntimeConfig, _ as _export_sfc } from '../server.mjs';
import { u as useHead } from './composables.347718d7.mjs';
import { _ as _imports_0, a as _imports_1$1 } from './arrow.a5315725.mjs';
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
import '../../nitro/vercel.mjs';
import 'node-fetch-native/polyfill';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';

const _sfc_main$2 = {
  name: "ContactForm",
  data() {
    return {
      isLoading: false,
      fullPage: true
    };
  },
  props: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    sendMessage() {
      const name = document.querySelector('input[name="name"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const message = document.querySelector('textarea[name="message"]').value;
      console.log(name, email, message);
      if (name != "" && email != "" && message != "") {
        if (message.length > 10) {
          if (email.includes("@") && email.includes(".")) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("message", message);
            Swal.fire({
              title: "Chargement en cours...",
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              html: `
                            <div style="display:flex; justify-content:center;">
                                <img src="/pika.gif" alt="Loading..." />
                            </div>`,
              background: "transparent",
              backdrop: "rgba(0, 0, 0, 0.5)",
              customClass: {
                popup: "custom-swal-background no-border"
              }
            });
            fetch("https://porfolio-backend-api.onrender.com/api/sendmail", {
              method: "POST",
              body: formData
            }).then((response) => response.json()).then((data) => {
              document.querySelector('input[name="name"]').value = "";
              document.querySelector('input[name="email"]').value = "";
              document.querySelector('textarea[name="message"]').value = "";
              Swal.close();
              toast(data.message, {
                "theme": "auto",
                "type": "success",
                "transition": "slide",
                "dangerouslyHTMLString": true
              });
              console.log(data);
            });
          } else {
            toast("Veuillez entrer une adresse email valide", {
              "theme": "auto",
              "type": "warning",
              "transition": "flip",
              "dangerouslyHTMLString": true
            });
          }
        } else {
          toast("Votre message doit contenir au moins 10 caract\xE8res", {
            "theme": "auto",
            "type": "warning",
            "transition": "flip",
            "dangerouslyHTMLString": true
          });
        }
      } else {
        toast("Veuillez remplir tous les champs", {
          "theme": "auto",
          "type": "warning",
          "transition": "flip",
          "dangerouslyHTMLString": true
        });
      }
    },
    mounted() {
      document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();
        document.querySelector('input[name="name"]').value;
        document.querySelector('input[name="email"]').value;
        document.querySelector('textarea[name="message"]').value;
      });
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<form${ssrRenderAttrs(mergeProps({
    id: "contact-form",
    class: "text-sm mt-0"
  }, _attrs))}><div class="flex flex-col"><label for="name" class="mb-3">_name:</label><input type="text" id="name-input" name="name"${ssrRenderAttr("placeholder", $props.name)} class="p-2 mb-5 placeholder-slate-600" required></div><div class="flex flex-col"><label for="email" class="mb-3">_email:</label><input type="email" id="email-input" name="email"${ssrRenderAttr("placeholder", $props.email)} class="p-2 mb-5 placeholder-slate-600" required></div><div class="flex flex-col"><label for="message" class="mb-3">_message:</label><textarea id="message-input" name="message"${ssrRenderAttr("placeholder", $props.message)} class="placeholder-slate-600" style="${ssrRenderStyle({ "height": "90%" })}" required></textarea></div><button id="submit-button" type="button" class="py-2 px-4 mt-0 mb-6">submit-message</button></form>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContactForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {
  data() {
    return {
      date: new Date().toDateString(),
      lines: 0
    };
  },
  props: {
    name: String,
    email: String,
    message: String
  },
  mounted() {
    this.updateLines();
    window.addEventListener("resize", this.updateLines);
    window.addEventListener("input", this.updateLines);
    window.addEventListener("click", this.updateLines);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateLines);
    window.removeEventListener("click", this.updateLines);
    window.addEventListener("input", this.updateLines);
  },
  methods: {
    updateLines() {
      const textContainer = this.$el.querySelector(".text-container");
      const style = window.getComputedStyle(textContainer);
      parseInt(style.fontSize);
      const lineHeight = parseInt(style.lineHeight);
      const maxHeight = textContainer.offsetHeight;
      this.lines = Math.ceil(maxHeight / lineHeight);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "code-container flex font-fira_retina text-menu-text" }, _attrs))}><div class="line-numbers lg:flex flex-col w-16 hidden"><!--[-->`);
  ssrRenderList($data.lines, (n) => {
    _push(`<div class="grid grid-cols-2 justify-end"><span class="col-span-1 mr-3">${ssrInterpolate(n)}</span></div>`);
  });
  _push(`<!--]--></div><div class="font-fira_retina text-white text-container"><p><span class="tag"> const </span><span class="tag-name"> button </span> = <span class="tag-name"> document.querySelector <span class="text-menu-text"> ( <span class="text-codeline-link"> &#39;#sendBtn&#39; </span> ); </span></span></p><br><p class="text-menu-text"><span class="tag"> const </span><span class="tag-name"> message </span> = { <br> \xA0\xA0 <span id="name" class="tag-name"> name </span> : <span class="text-codeline-link">&quot;</span><span id="name-value" class="text-codeline-link">${ssrInterpolate($props.name)}</span><span class="text-codeline-link">&quot;</span> , <br> \xA0\xA0 <span id="email" class="tag-name"> email </span> : <span class="text-codeline-link">&quot;</span><span id="email-value" class="text-codeline-link">${ssrInterpolate($props.email)}</span><span class="text-codeline-link">&quot;</span> , <br> \xA0\xA0 <span id="message" class="tag-name"> message </span> : <span class="text-codeline-link">&quot;</span><span id="message-value" class="text-codeline-link">${ssrInterpolate($props.message)}</span><span class="text-codeline-link">&quot;</span> , <br> \xA0\xA0 date: <span class="text-codeline-link"> &quot;${ssrInterpolate($data.date)}&quot; </span><br> } </p><br><p><span class="tag-name"> button.addEventListener <span class="text-menu-text"> ( <span class="text-codeline-link"> &#39;click&#39; </span> ), () <span class="tag"> =&gt; </span> { <br></span> \xA0\xA0form.send <span class="text-menu-text">(</span> message <span class="text-menu-text">); <br> })</span></span></p></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FormContentCode.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _imports_1 = "" + globalThis.__publicAssetsURL("icons/link.svg");
const __default__ = {
  data() {
    return {
      name: "",
      email: "",
      message: ""
    };
  },
  setup() {
    const contact = useRuntimeConfig().dev.contacts;
    useHead({
      title: "Rafanambinantsoa Maminirina Karim - Contact",
      meta: [
        {
          name: "description",
          content: "Contactez Rafanambinantsoa Maminirina Karim - D\xE9veloppeur web fullstack disponible pour vos projets"
        },
        {
          name: "keywords",
          content: "Rafanambinantsoa Maminirina Karim, contact d\xE9veloppeur, freelance, projets web, d\xE9veloppement sur mesure, consultation technique, devis d\xE9veloppement web, collaboration, contact professionnel, expertise technique, d\xE9veloppement agile"
        },
        {
          property: "og:title",
          content: "Rafanambinantsoa Maminirina Karim - Contactez-moi"
        },
        {
          property: "og:description",
          content: "Prenez contact pour discuter de vos projets de d\xE9veloppement web"
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Rafanambinantsoa Maminirina Karim - Contact"
        },
        {
          name: "twitter:description",
          content: "Prenez contact pour discuter de vos projets de d\xE9veloppement web"
        }
      ],
      htmlAttrs: {
        lang: "fr"
      }
    });
    return {
      contact
    };
  },
  methods: {
    open(elementId) {
      const element = document.getElementById(elementId);
      const arrow = element.querySelector(".arrow");
      const links = element.querySelector("#links");
      if (links.style.display === "block") {
        links.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
      } else {
        links.style.display = "block";
        arrow.style.transform = "rotate(90deg)";
      }
    }
  },
  mounted() {
    const nameInput = document.getElementById("name-input");
    const emailInput = document.getElementById("email-input");
    const messageInput = document.getElementById("message-input");
    nameInput.addEventListener("input", (event) => {
      const nameValue = document.getElementById("name-value");
      nameValue.innerHTML = event.target.value;
    });
    emailInput.addEventListener("input", (event) => {
      const emailValue = document.getElementById("email-value");
      emailValue.innerHTML = event.target.value;
    });
    messageInput.addEventListener("input", (event) => {
      const messageValue = document.getElementById("message-value");
      messageValue.innerHTML = event.target.value;
    });
    const links = document.getElementsByClassName("submenu");
    for (let i = 0; i < links.length; i++) {
      if (window.innerWidth > 1024) {
        links[i].querySelector("#links").style.display = "block";
        links[i].querySelector(".arrow").style.transform = "rotate(90deg)";
      } else {
        links[i].querySelector("#links").style.display = "none";
      }
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "contact-me",
  __ssrInlineRender: true,
  setup(__props) {
    const contact = useRuntimeConfig().dev.contacts;
    useHead({
      title: "Contact | RAFANAMBINANTSOA Maminirina Karim",
      meta: [
        { name: "description", content: "Contactez RAFANAMBINANTSOA Maminirina Karim - D\xE9veloppeur Full Stack disponible pour vos projets web et collaborations" },
        {
          name: "keywords",
          content: "RAFANAMBINANTSOA Maminirina Karim, contact d\xE9veloppeur, d\xE9veloppeur freelance, freelance full stack, collaboration projet web, prestataire web, d\xE9veloppement web, d\xE9veloppement mobile, cr\xE9ation de site web, applications web, projets web, d\xE9veloppeur ind\xE9pendant, demande de devis, mission freelance, Vue.js, NuxtJS, Laravel, Flutter, Symfony"
        },
        { name: "author", content: "RAFANAMBINANTSOA Maminirina Karim" },
        { property: "og:title", content: "Contactez RAFANAMBINANTSOA Maminirina Karim" },
        { property: "og:description", content: "Prenez contact pour discuter de vos projets web et collaborations" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://karimrafanambinantsoa.vercel.app/contact-me" },
        { name: "robots", content: "index, follow" },
        { name: "language", content: "French" }
      ],
      link: [
        { rel: "canonical", href: "https://karimrafanambinantsoa.vercel.app/contact-me" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContactForm = __nuxt_component_0;
      const _component_FormContentCode = __nuxt_component_1;
      _push(`<main${ssrRenderAttrs(mergeProps({
        id: "contact-me",
        class: "page"
      }, _attrs))}><div id="mobile-page-title"><h2>_me-contacter</h2></div><div id="page-menu" class="w-full h-full flex flex-col border-right"><div id="contacts" class="submenu"><div class="title"><img class="arrow"${ssrRenderAttr("src", _imports_0)}><h3> contacts </h3></div><div id="links"><!--[-->`);
      ssrRenderList(unref(contact).direct.sources, (source, key) => {
        _push(`<div class="link"><img${ssrRenderAttr("src", "/icons/" + key + ".svg")}><a href="/" class="font-fira_retina text-menu-text hover:text-white">${source}</a></div>`);
      });
      _push(`<!--]--></div></div><div id="find-me-in" class="submenu border-top"><div class="title"><img class="arrow"${ssrRenderAttr("src", _imports_0)}><h3> me-trouver-aussi-sur </h3></div><div id="links"><!--[-->`);
      ssrRenderList(unref(contact).find_me_also_in.sources, (source, key) => {
        _push(`<div class="link"><img${ssrRenderAttr("src", _imports_1)}><a${ssrRenderAttr("href", source.url + source.user)} class="font-fira_retina text-menu-text hover:text-white" target="_blank">${ssrInterpolate(source.title)}</a></div>`);
      });
      _push(`<!--]--></div></div></div><div class="flex flex-col w-full"><div class="tab-height w-full hidden lg:flex border-right border-bot items-center"><div class="flex items-center border-right h-full"><p class="font-fira_regular text-menu-text text-sm px-3">contacts</p><img${ssrRenderAttr("src", _imports_1$1)} alt="" class="m-3"></div></div><div class="flex lg:grid lg:grid-cols-2 h-full w-full"><div id="left" class="h-full w-full flex flex-col border-right items-center">`);
      _push(ssrRenderComponent(_component_ContactForm, {
        name: _ctx.name,
        email: _ctx.email,
        message: _ctx.message
      }, null, _parent));
      _push(`</div><div id="right" class="h-full w-full hidden lg:flex"><div class="form-content">`);
      _push(ssrRenderComponent(_component_FormContentCode, {
        name: _ctx.name,
        email: _ctx.email,
        message: _ctx.message
      }, null, _parent));
      _push(`</div><div id="scroll-bar" class="h-full border-left flex justify-center py-1"><div id="scroll"></div></div></div></div></div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact-me.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-me.89d832b2.mjs.map
