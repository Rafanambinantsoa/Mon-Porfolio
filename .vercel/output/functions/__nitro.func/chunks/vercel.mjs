import 'node-fetch-native/polyfill';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
import { parseURL, withQuery, joinURL, parseQuery } from 'ufo';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import destr from 'destr';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{"apiBase":"/api","dev":{"name":"Rafanambinantsoa Karim","logo_name":"rafanambinantsoa-karim","role":"Back-end developer","role_description":"Je m'appelle Rafanambinantsoa Karim, un développeur backend passionné par la création de systèmes robustes et évolutifs. Mon expertise réside dans la conception d'architectures backend efficaces, garantissant une communication fluide entre le serveur et l'interface utilisateur. Je suis également enthousiaste à l'idée d'explorer le développement mobile pour élargir mes compétences.","about":{"sections":{"professional-info":{"title":"professional-info","icon":"icons/info-professional.svg","info":{"experience":{"title":"experience","description":"<br> <strong> UN-IT Fianarantsoa </strong> , <br> Pendant mon stage à UN-IT FIanarantsoa en tant que développeur junior, <br> j'ai créé une appli web pour la vente de billets et une app mobile pour le <br>  scan à l'entrée. Ces réalisations ont été cruciales pour valider mon diplôme <br>  de licence en info, enrichissant ma formation théorique par une expérience <br> pratique approfondie. <br><br> <strong>  Direction Régionale des Impôts à Fianarantsoa, </strong> <br> Durant mon stage au Ministère des Finances en tant que Contrôleur des <br>                       impôts, j'ai exploré les rouages de la fiscalité en examinant des dossiers, <br> vérifiant des déclarations et calculant les impôts des contribuables. Cette  <br> expérience, intégrée à ma formation en licence, a enrichi ma                        compréhension théorique par une immersion pratique essentielle."},"hard-skills":{"title":"hard-skills","description":"<br>En tant que développeur backend, je me spécialise dans l'architecture et la mise en place de l'infrastructure centrale des applications, assurant une communication fluide entre le serveur et l'interface utilisateur. <br><br> Bien que ma spécialité réside dans la conception robuste des systèmes serveur, je suis également capable de m'adapter et de collaborer pour compléter les aspects frontaux. <br><br> Mon expertise réside dans la conception de bases de données évolutives, l'optimisation des processus de récupération des données et la mise en place de protocoles sécurisés pour garantir l'intégrité et la fiabilité du système. Je suis passionné par la création d'algorithmes efficaces et l'utilisation des dernières technologies pour optimiser les performances et améliorer l'expérience globale de l'utilisateur."},"soft-skills":{"title":"soft-skills","description":"<br>Je propose bien plus que des compétences techniques ; mon adaptabilité, ma capacité à résoudre les problèmes et ma facilité à collaborer avec des équipes pluridisciplinaires enrichissent chaque projet avec lequel je m'engage. Mon engagement pour l'apprentissage continu me permet de rester agile dans un paysage technologique en constante évolution, favorisant l'innovation et promouvant des solutions durables."}}},"personal-info":{"title":"personal-info","icon":"icons/info-personal.svg","info":{"bio":{"title":"bio","description":"<br> About me <br> j'ai exploré le développement web pendant les deux dernières années, en me concentrant sur la création d'expériences utilisateur intuitives. <br> <br> Récemment, j'ai également commencé à explorer le développement mobile, cherchant à élargir mes horizons dans ce domaine dynamique. <br> Ma maîtrise du développement backend me permet de comprendre en profondeur les systèmes, mais je suis tout aussi enthousiaste à l'idée de m'adapter aux exigences du développement frontend si nécessaire, car je crois fermement à l'importance de la polyvalence dans ce domaine en constante évolution."},"interests":{"title":"interests","description":"<br>Je suis constamment en apprentissage, explorant de nouvelles technologies et méthodologies pour améliorer mes compétences et rester à jour dans ce domaine en perpétuelle évolution. En dehors du codage, je trouve du réconfort et du plaisir dans les jeux vidéo, un espace où je me détends et stimule ma créativité et ma réflexion stratégique. C'est un moyen pour moi de décompresser et de me ressourcer."},"education":{"title":"education","description":"<br> <u>Mes parcours </u> :   <br><br> 2020 - 2023 =>  <br> EMIT (Ecole de Management et d'Innovation Technologique) Fianarantsoa <br><br>   - <strong>Troisième année de licence</strong> <br> <i>Technologies avancées et Frameworks </i> : Exploration approfondie des technologies émergentes et des frameworks utilisés dans le domaine de l'informatique. <br> <i> Stage de 3 mois et Mémoire de fin d'études </i> :  Intégration des connaissances acquises dans un cadre professionnel, développement de compétences pratiques, et rédaction d'un mémoire de fin d'études portant sur une problématique innovante du domaine informatique. <br><br>   - <strong> Deuxième année de licence </strong> <br> <i> Programmation et Programmation Orientée Objet (POO)  </i>:  Découverte des langages de programmation et leur utilisation dans un contexte orienté objet. Apprentissage pratique à travers des projets. <br> <i>Stage de 2 mois</i> : Application des connaissances acquises dans un environnement professionnel, renforçant la compréhension des langages de programmation et du développement logiciel. <br><br> - <strong> Première année de licence </strong> <br> <i> Bases de l'informatique  </i> : Apprentissage des concepts fondamentaux, notamment les systèmes d'exploitation, les algorithmes et les structures de données. <br> <i> Réalisations </i> : Excellente maîtrise des concepts de base de l'informatique. <br><br> 2018 - 2019 => Collège Saint François Xavier Fianarantsoa ( CSFX) <br><br> <strong> Baccalauréat Série D - Mention Assez Bien </strong>","files":{"high-school":"I have been in 'Las viñas'...","university":"The university..."}}}},"hobbies-info":{"title":"hobbies-info","icon":"icons/info-hobbies.svg","info":{"sports":{"title":"sports","description":"<br>Je suis un passionné de sport et j'ai une véritable passion pour le basketball, pratiquant régulièrement pour améliorer mes compétences sur le terrain. De plus, je m'adonne à une routine de course à pied le matin, trouvant à la fois la sérénité et l'énergie dans mes sessions de jogging quotidiennes. Ces activités contribuent non seulement à mon bien-être physique, mais elles m'insufflent également discipline et concentration au quotidien."},"favorite-games":{"title":"favorite-games","description":"<br>Je suis un joueur passionné, trouvant mon équilibre entre la compétitivité de Free Fire, le défi intellectuel des échecs, et l'apaisement dans la musique. Free Fire m'immerge dans des batailles en ligne stimulantes, les échecs me poussent à exercer ma réflexion stratégique, tandis que la musique me permet de me détendre et de trouver de l'inspiration. Ces activités sont pour moi des échappatoires relaxantes, m'offrant un équilibre parfait entre défis ludiques et moments de détente."}}}}},"contacts":{"direct":{"title":"contacts","sources":{"email":"tsukasashishiosama@gmail","phone":"+261 34 41 458 55"}},"social":{"github":{"title":"Github profile","url":"https://github.com/","user":"Rafanambinantsoa"},"facebook":{"title":"Facebook profile","url":"https://facebook.com/","user":"tsukasa.zeldris"},"twitter":{"title":"Twitter account","url":"https://twitter.com/","user":"username"},"instagram":{"title":"Instagram account","url":"https://instagram.com/","user":"akutagawa_karim"}},"find_me_also_in":{"title":"find-me-also-in","sources":{"linkedin":{"title":"Linkedin profile","url":"rafanambinantsoa-kim-5a5508279","user":""},"github":{"title":"Github profile","url":"https://github.com/","user":"Rafanambinantsoa"},"instagram":{"title":"Instagram account","url":"https://instagram.com/","user":"akutagawa_karim"},"facebook":{"title":"Facebook profile","url":"https://facebook.com/","user":"tsukasa.zeldris"}}}},"gists":{"1":"1f74d1fa53b617a7a760580a30c91048","2":"7783e4b86dbb9470a9a20a12962eef4f"},"projects":{"1":{"title":"EventPass","description":"Une plateforme web gère la vente de billets pour les événements, tandis qu'une app mobile dédiée au scan assure l'accès à ces événements via les codes QR.","img":"/mia.png","tech":["NuxtJs"],"url":"https://github.com/"},"2":{"title":"SymfonyCuisine","description":"Mon projet Symfony permet de créer et partager des recettes en utilisant divers ingrédients de manière flexible entre plusieurs créateurs.","img":"/trinity.png","tech":["Symfony"],"url":"https://github.com/"},"3":{"title":"KimLogement","description":"Une app web pour ventes immobilières : l'admin valide les comptes des agents. Ces agents postent des maisons à vendre et les clients peuvent consulter et acheter.","img":"/estate.png","tech":["Laravel"],"url":"https://github.com/"},"4":{"title":"E-Commerce","description":"Une app mobile dédiée à la vente de fournitures tech, offrant une large gamme de produits technologiques pour les passionnés de tech et les utilisateurs à la recherche d'articles high-tech.","img":"/appVente.png","tech":["Flutter"],"url":"https://github.com/"},"5":{"title":"DeclarImpot","description":"Une application web pour déclarer ses impôts en ligne de manière efficace et simple.","img":"/impot.png","tech":["Laravel"],"url":"https://github.com/"},"6":{"title":"Coming Soon","description":"Coming Soon","img":"/images/projects/ethereum.png","tech":["NuxtJs"],"url":"https://github.com/"}}}},"apiSecret":"123"};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets);

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter({ routes: config.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    let _resSendBody;
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const _lazy_zq6hQc = () => import('./renderer.mjs');

const handlers = [
  { route: '/__nuxt_error', handler: _lazy_zq6hQc, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_zq6hQc, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const handler = toNodeListener(nitroApp.h3App);
const vercel = (function(req, res) {
  const query = req.headers["x-now-route-matches"];
  if (query) {
    const { url } = parseQuery(query);
    if (url) {
      req.url = url;
    }
  }
  return handler(req, res);
});

export { useRuntimeConfig as a, getRouteRules as g, useNitroApp as u, vercel as v };
//# sourceMappingURL=vercel.mjs.map
