import { getCurrentInstance, version, defineComponent, h, Suspense, nextTick, Transition, computed, provide, reactive, ref, resolveComponent, shallowRef, useSSRContext, createApp, toRef, isRef, defineAsyncComponent, onErrorCaptured, unref, inject, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode } from 'vue';
import { $fetch } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { hasProtocol, isEqual, parseURL, joinURL } from 'ufo';
import { createError as createError$1, sendRedirect } from 'h3';
import { useHead, createHead as createHead$1 } from '@unhead/vue';
import { renderDOMHead, debouncedRenderDOMHead } from '@unhead/dom';
import { RouterView, createMemoryHistory, createRouter } from 'vue-router';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { defu } from 'defu';
import AOS from 'aos';
import { a as useRuntimeConfig$1 } from './vercel.mjs';
import 'node-fetch-native/polyfill';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';

var _a, _b, _c, _d, _e, _f, _g, _h;
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a2;
      if (prop === "public") {
        return target.public;
      }
      return (_a2 = target[prop]) != null ? _a2 : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a2;
  return (_a2 = useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      const prefetched = ref(false);
      const el = void 0;
      return () => {
        var _a2, _b2, _c2;
        if (!isExternal.value) {
          return h(
            resolveComponent("RouterLink"),
            {
              ref: void 0,
              to: to.value,
              ...prefetched.value && !props.custom ? { class: props.prefetchedClass || options.prefetchedClass } : {},
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b2 = (_a2 = router.resolve(to.value)) == null ? void 0 : _a2.href) != null ? _b2 : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_c2 = slots.default) == null ? void 0 : _c2.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = defineNuxtLink({ componentName: "NuxtLink" });
function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
const cfg0 = defineAppConfig({
  title: "Hello Nuxt",
  blog: {
    enabled: true
  },
  theme: {
    dark: true,
    colors: {
      primary: "#ff0000"
    }
  }
});
const inlineConfig = {};
defuFn(cfg0, inlineConfig);
const components = {};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
function createHead(initHeadObject) {
  const unhead = createHead$1();
  const legacyHead = {
    unhead,
    install(app) {
      if (version.startsWith("3")) {
        app.config.globalProperties.$head = unhead;
        app.provide("usehead", unhead);
      }
    },
    use(plugin) {
      unhead.use(plugin);
    },
    resolveTags() {
      return unhead.resolveTags();
    },
    headEntries() {
      return unhead.headEntries();
    },
    headTags() {
      return unhead.resolveTags();
    },
    push(input, options) {
      return unhead.push(input, options);
    },
    addEntry(input, options) {
      return unhead.push(input, options);
    },
    addHeadObjs(input, options) {
      return unhead.push(input, options);
    },
    addReactiveEntry(input, options) {
      const api = useHead(input, options);
      if (typeof api !== "undefined")
        return api.dispose;
      return () => {
      };
    },
    removeHeadObjs() {
    },
    updateDOM(document2, force) {
      if (force)
        renderDOMHead(unhead, { document: document2 });
      else
        debouncedRenderDOMHead(unhead, { delayFn: (fn) => setTimeout(() => fn(), 50), document: document2 });
    },
    internalHooks: unhead.hooks,
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    }
  };
  unhead.addHeadObjs = legacyHead.addHeadObjs;
  unhead.updateDOM = legacyHead.updateDOM;
  unhead.hooks.hook("dom:beforeRender", (ctx) => {
    for (const hook of legacyHead.hooks["before:dom"]) {
      if (hook() === false)
        ctx.shouldRender = false;
    }
  });
  if (initHeadObject)
    legacyHead.addHeadObjs(initHeadObject);
  return legacyHead;
}
version.startsWith("2.");
const appHead = { "meta": [{ "charset": "utf-8" }, { "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "name": "title", "hid": "Rafanambinantsoa Karim | Back-end developer", "content": "Unique Portfolio: Karim Rafanambinantsoa's Daring Backend Dev" }, { "hid": "description", "name": "description", "content": "Meta TitlesUnique ki Portfolio: Karim Rafanambinantsoa's Daring Backend DevConfidential Insights: Karim Rafanambinantsoa's Portfolio UncoveredExciting New Portfolio: Karim Rafanambinantsoa, Backend Dev Outstanding Portfolio: Explore Karim Rafanambinantsoa's Dev Journey Powerful Portfolio: Secrets Behind Karim Rafanambinantsoa's Skills Meta Descriptions Discover the unique portfolio of Karim Rafanambinantsoa, a daring backend developer.Uncover his skills and remarkable projects today! Dive into the confidential insights of Karim Rafanambinantsoa's portfolio. Explore his extraordinary journey in backend development now! Explore the exciting new portfolio of Karim Rafanambinantsoa, a talented backend developer.Get inspired by his projects today! Unveil the outstanding portfolio of backend developer Karim Rafanambinantsoa.Learn about his unique skills and contributions to tech! Discover powerful insights into Karim Rafanambinantsoa's developer portfolio. Uncover the secrets to his success in backend development." }, { "hid": "keywords", "name": "keywords", "content": "portfolio d\xE9veloppeur backend Madagascar, Rafanambinantsoa Karim d\xE9veloppeur web, comp\xE9tences d\xE9veloppement mobile Madagascar, d\xE9veloppeur fullstack PHP professionnel, portefolio web d\xE9veloppeur nuxtjs, Rafanambinantsoa portfolio Laravel, d\xE9veloppeur backend Madagascar, avis sur le d\xE9veloppement web Madagascar, services de d\xE9veloppement mobile Karim, expert backend d\xE9veloppeur PHP, projets fullstack web Madagascar, carri\xE8re de d\xE9veloppeur mobile en Madagascar, Rafanambinantsoa comp\xE9tences techniques, d\xE9veloppement web freelance Madagascar, articles sur Laravel et d\xE9veloppement backend, d\xE9veloppeurs nuxtjs \xE0 Madagascar, portfolio de d\xE9veloppeur mobile, formations d\xE9veloppement web en Madagascar, tendances d\xE9veloppement backend 2023, devenez d\xE9veloppeur Laravel, exigences pour d\xE9veloppeur fullstack, Rafanambinantsoa et technophilie, comparer les frameworks PHP, trouver un d\xE9veloppeur web \xE0 Madagascar, avantages du d\xE9veloppement mobile, projets PHP populaires en d\xE9veloppement web, communaut\xE9 des d\xE9veloppeurs \xE0 Madagascar, d\xE9veloppement mobile avec nuxtjs, freelancing pour d\xE9veloppeurs backend, Rafanambinantsoa projets innovants" }, { "hid": "author", "name": "author", "content": "Rafanambinantsoa Karim" }, { "hid": "og:title", "property": "og:title", "content": "Rafanambinantsoa Karim | Back-end developer" }, { "hid": "og:description", "property": "og:description", "content": "Je m'appelle Rafanambinantsoa Karim, un d\xE9veloppeur backend passionn\xE9 par la cr\xE9ation de syst\xE8mes robustes et \xE9volutifs. Mon expertise r\xE9side dans la conception d'architectures backend efficaces, garantissant une communication fluide entre le serveur et l'interface utilisateur. Je suis \xE9galement enthousiaste \xE0 l'id\xE9e d'explorer le d\xE9veloppement mobile pour \xE9largir mes comp\xE9tences." }, { "hid": "og:image", "property": "og:image", "content": "https://karimrafanambinantsoa.vercel.app//demo-share.jpg" }, { "hid": "og:url", "property": "og:url", "content": "https://karimrafanambinantsoa.vercel.app/" }, { "hid": "og:type", "property": "og:type", "content": "website" }, { "hid": "og:locale", "property": "og:locale", "content": "fr_FR" }, { "hid": "twitter:card", "name": "twitter:card", "content": "summary_large_image" }, { "hid": "twitter:title", "name": "twitter:title", "content": "Rafanambinantsoa Karim | Back-end developer" }, { "hid": "twitter:description", "name": "twitter:description", "content": "Je m'appelle Rafanambinantsoa Karim, un d\xE9veloppeur backend passionn\xE9 par la cr\xE9ation de syst\xE8mes robustes et \xE9volutifs. Mon expertise r\xE9side dans la conception d'architectures backend efficaces, garantissant une communication fluide entre le serveur et l'interface utilisateur. Je suis \xE9galement enthousiaste \xE0 l'id\xE9e d'explorer le d\xE9veloppement mobile pour \xE9largir mes comp\xE9tences." }, { "hid": "twitter:image", "name": "twitter:image", "content": "https://karimrafanambinantsoa.vercel.app//demo-share.jpg" }, { "hid": "twitter:site", "name": "twitter:site", "content": "@votre_compte_twitter" }, { "hid": "canonical", "name": "canonical", "content": "https://karimrafanambinantsoa.vercel.app/" }, { "hid": "robots", "name": "robots", "content": "index, follow" }, { "hid": "language", "name": "language", "content": "French" }, { "hid": "region", "name": "region", "content": "Madagascar" }, { "name": "theme-color", "content": "#010C15" }], "link": [{ "rel": "manifest", "href": "pwa/manifest.json" }, { "rel": "apple-touch-icon", "href": "pwa/icons/apple-touch-icon.png" }, { "rel": "icon", "href": "/favicon.ico", "type": "image/x-icon" }], "style": [], "script": [], "noscript": [], "title": "Rafanambinantsoa Karim | Back-end developer" };
const appPageTransition = false;
const appKeepalive = false;
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.push(appHead);
  nuxtApp.vueApp.use(head);
  nuxtApp._useHead = useHead;
  {
    nuxtApp.ssrContext.renderMeta = async () => {
      const { renderSSRHead } = await import('@unhead/ssr');
      const meta = await renderSSRHead(head.unhead);
      return {
        ...meta,
        bodyScriptsPrepend: meta.bodyTagsOpen,
        bodyScripts: meta.bodyTags
      };
    };
  }
});
const __nuxt_page_meta$3 = {};
const __nuxt_page_meta$2 = {};
const __nuxt_page_meta$1 = {};
const __nuxt_page_meta = {};
const _routes = [
  {
    name: (_a = __nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.name) != null ? _a : "about-me",
    path: (_b = __nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.path) != null ? _b : "/about-me",
    file: "C:/Users/SERVER/Mon-Porfolio/pages/about-me.vue",
    children: [],
    meta: __nuxt_page_meta$3,
    alias: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.alias) || [],
    redirect: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.redirect) || void 0,
    component: () => import('./about-me.f0c244e9.mjs').then((m) => m.default || m)
  },
  {
    name: (_c = __nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.name) != null ? _c : "contact-me",
    path: (_d = __nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.path) != null ? _d : "/contact-me",
    file: "C:/Users/SERVER/Mon-Porfolio/pages/contact-me.vue",
    children: [],
    meta: __nuxt_page_meta$2,
    alias: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.alias) || [],
    redirect: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.redirect) || void 0,
    component: () => import('./contact-me.cd8447c6.mjs').then((m) => m.default || m)
  },
  {
    name: (_e = __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) != null ? _e : "index",
    path: (_f = __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) != null ? _f : "/",
    file: "C:/Users/SERVER/Mon-Porfolio/pages/index.vue",
    children: [],
    meta: __nuxt_page_meta$1,
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect) || void 0,
    component: () => import('./index.fe6998a0.mjs').then((m) => m.default || m)
  },
  {
    name: (_g = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) != null ? _g : "projects",
    path: (_h = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) != null ? _h : "/projects",
    file: "C:/Users/SERVER/Mon-Porfolio/pages/projects.vue",
    children: [],
    meta: __nuxt_page_meta,
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import('./projects.4b79395e.mjs').then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => {
      var _a2;
      return !!((_a2 = route.meta.pageTransition) != null ? _a2 : appPageTransition);
    };
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (typeof result === "boolean") {
    return result;
  }
  return createError(result);
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a2, _b2, _c2, _d2;
  let __temp, __restore;
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = (_b2 = (_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) != null ? _b2 : createMemoryHistory(routerBase);
  const routes = (_d2 = (_c2 = routerOptions.routes) == null ? void 0 : _c2.call(routerOptions, _routes)) != null ? _d2 : _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a3, _b3, _c3, _d3;
    if (((_b3 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b3.default) === ((_d3 = (_c3 = from.matched[0]) == null ? void 0 : _c3.components) == null ? void 0 : _d3.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a3, _b3;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a3 = initialLayout.value) != null ? _a3 : to.meta.layout;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b3 = namedMiddleware[entry2]) == null ? void 0 : _b3.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusCode: 404,
            statusMessage: `Page Not Found: ${initialURL}`
          });
          await callWithNuxt(nuxtApp, showError, [error2]);
          return false;
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB
];
const _imports_0$1 = "" + globalThis.__publicAssetsURL("icons/burger.svg");
const _imports_1$1 = "" + globalThis.__publicAssetsURL("icons/burger-close.svg");
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$4 = {
  data() {
    return {
      menuOpen: false
    };
  },
  setup() {
    const config = useRuntimeConfig();
    return {
      config
    };
  },
  methods: {
    toggleMobileMenu() {
      this.menuOpen ? this.menuOpen = false : this.menuOpen = true;
      const menu = document.getElementById("menu");
      menu.classList.toggle("hidden");
      const page = document.getElementsByTagName("main")[0];
      if (page.style.display === "none") {
        page.style.display = "flex";
      } else {
        page.style.display = "none";
      }
    },
    goHome() {
      const menu = document.getElementById("menu");
      if (!menu.classList.contains("hidden")) {
        menu.classList.toggle("hidden");
        document.getElementsByTagName("main")[0].style.display = "flex";
        this.menuOpen ? this.menuOpen = false : this.menuOpen = true;
      }
    }
  },
  computed: {
    isActive() {
      return (route) => this.$route.path === route;
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({
    id: "mobile-menu",
    class: "w-full z-10 lg:hidden"
  }, _attrs))}><div id="mobile-header" class="w-full h-16 flex justify-between items-center">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "text-menu-text font-fira_retina flex h-full items-center mx-5",
    to: "/",
    onClick: ($event) => $options.goHome()
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate($setup.config.dev.logo_name)}`);
      } else {
        return [
          createTextVNode(toDisplayString($setup.config.dev.logo_name), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  if (!$data.menuOpen) {
    _push(`<img${ssrRenderAttr("src", _imports_0$1)} class="w-5 h-5 mx-5 my-auto">`);
  } else {
    _push(`<img${ssrRenderAttr("src", _imports_1$1)} name="icon-park-outline:close" class="w-5 h-5 mx-5 my-auto">`);
  }
  _push(`</div><div id="menu" class="bg-mobile-menu-blue z-10 hidden">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    id: "nav-link-mobile",
    to: "/",
    class: { active: $options.isActive("/") },
    onClick: ($event) => $options.toggleMobileMenu()
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` _hello `);
      } else {
        return [
          createTextVNode(" _hello ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    id: "nav-link-mobile",
    to: "/about-me",
    class: { active: $options.isActive("/about-me") },
    onClick: ($event) => $options.toggleMobileMenu()
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` _a-propos-de-moi `);
      } else {
        return [
          createTextVNode(" _a-propos-de-moi ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    id: "nav-link-mobile",
    to: "/projects",
    class: { active: $options.isActive("/projects") },
    onClick: ($event) => $options.toggleMobileMenu()
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` _mes-projets `);
      } else {
        return [
          createTextVNode(" _mes-projets ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    id: "nav-link-mobile",
    to: "/contact-me",
    class: { active: $options.isActive("/contact-me") },
    onClick: ($event) => $options.toggleMobileMenu()
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` _me-contacter `);
      } else {
        return [
          createTextVNode(" _me-contacter ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MobileMenu.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$3 = {
  computed: {
    isActive() {
      return (route) => this.$route.path === route;
    }
  },
  setup() {
    const config = useRuntimeConfig();
    return {
      config
    };
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<header${ssrRenderAttrs(mergeProps({
    id: "navbar",
    class: "w-full hidden lg:flex flex-col"
  }, _attrs))}><nav class="w-full flex justify-between border-bot"><div class="flex">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    id: "nav-logo",
    to: "/"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate($setup.config.dev.logo_name)}`);
      } else {
        return [
          createTextVNode(toDisplayString($setup.config.dev.logo_name), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    id: "nav-link",
    to: "/",
    class: { active: $options.isActive("/") }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` _hello `);
      } else {
        return [
          createTextVNode(" _hello ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    id: "nav-link",
    to: "/about-me",
    class: { active: $options.isActive("/about-me") }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` _a_propos_de_moi `);
      } else {
        return [
          createTextVNode(" _a_propos_de_moi ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    id: "nav-link",
    to: "/projects",
    class: { active: $options.isActive("/projects") }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` _projets `);
      } else {
        return [
          createTextVNode(" _projets ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    id: "nav-link-contact",
    to: "/contact-me",
    class: { active: $options.isActive("/contact-me") }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` _me_contacter `);
      } else {
        return [
          createTextVNode(" _me_contacter ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</nav></header>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a2;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a3;
    return ((_a3 = m.components) == null ? void 0 : _a3.default) === routeProps.Component.type;
  });
  const source = (_a2 = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a2 : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const __nuxt_component_2 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a2, _b2, _c2, _d2;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!((_b2 = (_a2 = props.transition) != null ? _a2 : routeProps.route.meta.pageTransition) != null ? _b2 : appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              (_d2 = (_c2 = props.keepalive) != null ? _c2 : routeProps.route.meta.keepalive) != null ? _d2 : appKeepalive,
              h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(Component, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const Component = defineComponent({
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const _imports_0 = "" + globalThis.__publicAssetsURL("icons/social/instagram.svg");
const _imports_1 = "" + globalThis.__publicAssetsURL("icons/social/facebook.svg");
const _imports_2 = "" + globalThis.__publicAssetsURL("icons/social/github.svg");
const _sfc_main$2 = {
  name: "AppFooter",
  data() {
    return {
      route: this.$route.path
    };
  },
  setup() {
    return {
      social: useRuntimeConfig().dev.contacts.social
    };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "flex md:justify-between border-top text-menu-text font-fira_retina" }, _attrs))}><div class="w-full flex justify-between md:justify-start"><span id="social-title" class="h-full flex justify-center items-center border-right px-5"> me trouver sur: </span><div id="social-icons" class="flex">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: $setup.social.instagram.url + $setup.social.instagram.user,
    target: "_blank",
    class: "flex justify-center items-center"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${ssrRenderAttr("src", _imports_0)}${_scopeId}>`);
      } else {
        return [
          createVNode("img", { src: _imports_0 })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: $setup.social.facebook.url + $setup.social.facebook.user,
    target: "_blank",
    class: "flex justify-center items-center"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${ssrRenderAttr("src", _imports_1)}${_scopeId}>`);
      } else {
        return [
          createVNode("img", { src: _imports_1 })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: $setup.social.github.url + $setup.social.github.user,
    target: "_blank",
    class: "flex md:hidden justify-center items-center"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${ssrRenderAttr("src", _imports_2)}${_scopeId}>`);
      } else {
        return [
          createVNode("img", { src: _imports_2 })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: $setup.social.github.url + $setup.social.github.user,
    target: "_blank",
    class: "hidden md:flex items-center px-5 border-left"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` @${ssrInterpolate($setup.social.github.user)} <img${ssrRenderAttr("src", _imports_2)}${_scopeId}>`);
      } else {
        return [
          createTextVNode(" @" + toDisplayString($setup.social.github.user) + " ", 1),
          createVNode("img", { src: _imports_2 })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</footer>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {
  watch: {
    $route(to, from) {
      console.log("De", from.fullPath, "a", to.fullPath);
    }
  },
  mounted() {
    AOS.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 0,
      duration: 400,
      easing: "ease",
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom"
    });
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_MobileMenu = __nuxt_component_0;
  const _component_AppHeader = __nuxt_component_1;
  const _component_NuxtPage = __nuxt_component_2;
  const _component_AppFooter = __nuxt_component_3;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_MobileMenu, null, null, _parent));
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(ssrRenderComponent(_component_NuxtPage, { "data-aos": "fade-in" }, null, _parent));
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import('./error-component.f87b0596.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, useNuxtApp as a, __nuxt_component_0$1 as b, entry$1 as default, useRuntimeConfig as u };
//# sourceMappingURL=server.mjs.map
