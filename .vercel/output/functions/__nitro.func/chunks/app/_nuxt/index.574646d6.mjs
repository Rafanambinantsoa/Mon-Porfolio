import { u as useRuntimeConfig, _ as _export_sfc, b as __nuxt_component_0$1 } from '../server.mjs';
import { unref, useSSRContext, mergeProps, withCtx, createTextVNode } from 'vue';
import { ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { u as useHead } from './composables.347718d7.mjs';
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

const _imports_0 = "" + globalThis.__publicAssetsURL("icons/console/bolt-up-left.svg");
const _imports_1 = "" + globalThis.__publicAssetsURL("icons/console/bolt-up-right.svg");
const _imports_2 = "" + globalThis.__publicAssetsURL("icons/console/bolt-down-left.svg");
const _imports_3 = "" + globalThis.__publicAssetsURL("icons/console/bolt-down-right.svg");
const _imports_4 = "" + globalThis.__publicAssetsURL("icons/console/arrow-button.svg");
const _sfc_main$1 = {
  data() {
    return {
      score: 0,
      gameInterval: null,
      gameStarted: false,
      gameOver: false,
      food: { x: 10, y: 5 },
      snake: [
        { x: 10, y: 12 },
        { x: 10, y: 13 },
        { x: 10, y: 14 },
        { x: 10, y: 15 },
        { x: 10, y: 16 },
        { x: 10, y: 17 },
        { x: 10, y: 18 },
        { x: 11, y: 18 },
        { x: 12, y: 18 },
        { x: 13, y: 18 },
        { x: 14, y: 18 },
        { x: 15, y: 18 },
        { x: 15, y: 19 },
        { x: 15, y: 20 },
        { x: 15, y: 21 },
        { x: 15, y: 22 },
        { x: 15, y: 23 },
        { x: 15, y: 24 }
      ],
      direction: "up"
    };
  },
  methods: {
    startGame() {
      document.getElementById("start-button").style.display = "none";
      this.gameStarted = true;
      this.gameInterval = setInterval(this.moveSnake, 50);
    },
    startAgain() {
      document.getElementById("start-button").style.display = "block";
      document.getElementById("game-over").style.display = "none";
      document.getElementById("congrats").style.display = "none";
      this.gameStarted = false;
      this.gameOver = false;
      this.restartScore();
      this.food = {
        x: 10,
        y: 5
      };
      this.snake = [
        { x: 10, y: 12 },
        { x: 10, y: 13 },
        { x: 10, y: 14 },
        { x: 10, y: 15 },
        { x: 10, y: 16 },
        { x: 10, y: 17 },
        { x: 10, y: 18 },
        { x: 11, y: 18 },
        { x: 12, y: 18 },
        { x: 13, y: 18 },
        { x: 14, y: 18 },
        { x: 15, y: 18 },
        { x: 15, y: 19 },
        { x: 15, y: 20 },
        { x: 15, y: 21 },
        { x: 15, y: 22 },
        { x: 15, y: 23 },
        { x: 15, y: 24 }
      ], this.direction = "up";
      clearInterval(this.gameInterval);
      this.render();
    },
    moveSnake() {
      let newX = this.snake[0].x;
      let newY = this.snake[0].y;
      switch (this.direction) {
        case "up":
          newY--;
          break;
        case "down":
          newY++;
          break;
        case "left":
          newX--;
          break;
        case "right":
          newX++;
          break;
      }
      if (newX >= 0 && newX < 24 && newY >= 0 && newY < 40 && !this.snake.find(
        (snakeCell) => snakeCell.x === newX && snakeCell.y === newY
      )) {
        this.snake.unshift({ x: newX, y: newY });
        if (newX === this.food.x && newY === this.food.y) {
          this.score++;
          const scoreFoods = document.getElementsByClassName("food");
          scoreFoods[this.score - 1].style.opacity = 1;
          if (this.score === 10) {
            this.snake.unshift({ x: newX, y: newY });
            this.food = { x: null, y: null };
            clearInterval(this.gameInterval);
            document.getElementById("congrats").style.display = "block";
            this.gameOver = true;
            this.gameStarted = false;
          } else {
            this.food = {
              x: Math.floor(Math.random() * 24),
              y: Math.floor(Math.random() * 40)
            };
          }
        } else {
          this.snake.pop();
        }
      } else {
        clearInterval(this.gameInterval);
        document.getElementById("game-over").style.display = "block";
        this.gameStarted = false;
        this.gameOver = true;
      }
      this.render();
    },
    render() {
      let gameScreen = this.$refs.gameScreen;
      gameScreen.innerHTML = "";
      const cellSize = window.innerWidth > 1536 ? "10px" : "8px";
      for (let i = 0; i < 40; i++) {
        for (let j = 0; j < 24; j++) {
          let cell = document.createElement("div");
          cell.classList.add("cell");
          cell.style.width = cellSize;
          cell.style.height = cellSize;
          cell.style.display = "flex";
          cell.style.flexShrink = 0;
          cell.classList.add("black");
          if (j === this.food.x && i === this.food.y) {
            cell.style.backgroundColor = "#43D9AD";
            cell.style.borderRadius = "50%";
            cell.style.boxShadow = "0 0 10px #43D9AD";
          }
          let snakeCell = this.snake.find(
            (snakeCell2) => snakeCell2.x === j && snakeCell2.y === i
          );
          if (snakeCell) {
            cell.style.backgroundColor = "#43D9AD";
            cell.style.opacity = 1 - this.snake.indexOf(snakeCell) / this.snake.length;
            cell.classList.add("green");
          }
          if (snakeCell && this.snake.indexOf(snakeCell) === 0) {
            let headRadius = "5px";
            if (this.direction === "up") {
              cell.style.borderTopLeftRadius = headRadius;
              cell.style.borderTopRightRadius = headRadius;
            }
            if (this.direction === "down") {
              cell.style.borderBottomLeftRadius = headRadius;
              cell.style.borderBottomRightRadius = headRadius;
            }
            if (this.direction === "left") {
              cell.style.borderTopLeftRadius = headRadius;
              cell.style.borderBottomLeftRadius = headRadius;
            }
            if (this.direction === "right") {
              cell.style.borderTopRightRadius = headRadius;
              cell.style.borderBottomRightRadius = headRadius;
            }
          }
          gameScreen.appendChild(cell);
        }
      }
    },
    restartScore() {
      this.score = 0;
      const scoreFoods = document.getElementsByClassName("food");
      for (let i = 0; i < scoreFoods.length; i++) {
        scoreFoods[i].style.opacity = 0.3;
      }
    },
    move(direction) {
      switch (direction) {
        case "up":
          if (this.direction !== "down") {
            this.direction = "up";
          }
          break;
        case "down":
          if (this.direction !== "up") {
            this.direction = "down";
          }
          break;
        case "left":
          if (this.direction !== "right") {
            this.direction = "left";
          }
          break;
        case "right":
          if (this.direction !== "left") {
            this.direction = "right";
          }
          break;
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", (event) => {
      if (this.gameStarted) {
        switch (event.keyCode) {
          case 37:
            if (this.direction !== "right") {
              this.direction = "left";
            }
            break;
          case 38:
            if (this.direction !== "down") {
              this.direction = "up";
            }
            break;
          case 39:
            if (this.direction !== "left") {
              this.direction = "right";
            }
            break;
          case 40:
            if (this.direction !== "up") {
              this.direction = "down";
            }
            break;
        }
      } else {
        switch (event.keyCode) {
          case 32:
            if (this.gameOver) {
              this.startAgain();
            } else {
              this.startGame();
            }
            break;
        }
      }
    });
    window.onresize = () => {
      this.render();
    };
    this.render();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ id: "console" }, _attrs))}><img id="corner"${ssrRenderAttr("src", _imports_0)} alt="" class="absolute top-2 left-2 opacity-70"><img id="corner"${ssrRenderAttr("src", _imports_1)} alt="" class="absolute top-2 right-2 opacity-70"><img id="corner"${ssrRenderAttr("src", _imports_2)} alt="" class="absolute bottom-2 left-2 opacity-70"><img id="corner"${ssrRenderAttr("src", _imports_3)} alt="" class="absolute bottom-2 right-2 opacity-70"><div id="game-screen"></div><button id="start-button" class="font-fira_retina">start-game</button><div id="game-over" class="hidden"><span class="font-fira_retina text-greenfy bg-bluefy-dark h-12 flex items-center justify-center">GAME OVER!</span><button class="font-fira_retina text-menu-text text-sm flex items-center justify-center w-full py-6 hover:text-white">start-again</button></div><div id="congrats" class="hidden"><span class="font-fira_retina text-greenfy bg-bluefy-dark h-12 flex items-center justify-center">WELL DONE!</span><button class="font-fira_retina text-menu-text text-sm flex items-center justify-center w-full py-6 hover:text-white">play-again</button></div><div id="console-menu" class="h-full flex flex-col items-end justify-between"><div><div id="instructions" class="font-fira_retina text-sm text-white"><p>// \xE0 ton clavier </p><p>// fl\xE8ches pour jouer</p><div id="buttons" class="w-full flex flex-col items-center gap-1 pt-5"><button id="console-button" class="button-up"><img${ssrRenderAttr("src", _imports_4)} alt=""></button><div class="grid grid-cols-3 gap-1"><button id="console-button" class="button-left"><img${ssrRenderAttr("src", _imports_4)} alt="" class="-rotate-90"></button><button id="console-button" class="button-down"><img${ssrRenderAttr("src", _imports_4)} alt="" class="rotate-180"></button><button id="console-button" class="button-right"><img${ssrRenderAttr("src", _imports_4)} alt="" class="rotate-90"></button></div></div></div><div id="score-board" class="w-full flex flex-col pl-5"><p class="font-fira_retina text-white pt-5">// progressions</p><div id="score" class="grid grid-cols-5 gap-5 justify-items-center pt-5 w-fit"><div class="food"></div><div class="food"></div><div class="food"></div><div class="food"></div><div class="food"></div><div class="food"></div><div class="food"></div><div class="food"></div><div class="food"></div><div class="food"></div></div></div></div>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    id: "skip-btn",
    to: "/about-me",
    class: "font-fira_retina flex hover:bg-white/20"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` skip `);
      } else {
        return [
          createTextVNode(" skip ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SnakeGame.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const __default__ = {
  name: "Hello",
  setup() {
    const config = useRuntimeConfig();
    useHead({
      title: "Rafanambinantsoa Maminirina Karim - Portfolio",
      meta: [
        {
          name: "description",
          content: "Portfolio de Rafanambinantsoa Maminirina Karim - D\xE9veloppeur web fullstack passionn\xE9 par la cr\xE9ation d'applications web modernes et performantes"
        },
        {
          name: "keywords",
          content: "Rafanambinantsoa Maminirina Karim, d\xE9veloppeur fullstack, javascript, vue.js, nuxt.js, node.js, d\xE9veloppement web, frontend, backend, portfolio d\xE9veloppeur, web development, responsive design, applications web, programmation, coding, software engineer"
        },
        {
          property: "og:title",
          content: "Rafanambinantsoa Maminirina Karim - Portfolio D\xE9veloppeur Fullstack"
        },
        {
          property: "og:description",
          content: "D\xE9couvrez le portfolio de Rafanambinantsoa Maminirina Karim, d\xE9veloppeur web fullstack"
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Rafanambinantsoa Maminirina Karim - Portfolio D\xE9veloppeur Fullstack"
        },
        {
          name: "twitter:description",
          content: "D\xE9couvrez le portfolio de Rafanambinantsoa Maminirina Karim, d\xE9veloppeur web fullstack"
        }
      ],
      htmlAttrs: {
        lang: "fr"
      }
    });
    return {
      config
    };
  },
  data() {
    return {
      isMobile: false,
      loading: true
    };
  },
  mounted() {
    if (window.innerWidth <= 1024) {
      this.isMobile = true;
    }
    window.addEventListener("resize", this.handleResize);
    this.loading = false;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      if (window.innerWidth <= 1024) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    useHead({
      title: "RAFANAMBINANTSOA Maminirina Karim | D\xE9veloppeur Full Stack",
      meta: [
        { name: "description", content: "Portfolio de RAFANAMBINANTSOA Maminirina Karim - D\xE9veloppeur Full Stack passionn\xE9 par la cr\xE9ation d'applications web modernes et performantes" },
        {
          name: "keywords",
          content: "RAFANAMBINANTSOA Maminirina Karim, d\xE9veloppeur full stack, d\xE9veloppeur web, portfolio d\xE9veloppeur, d\xE9veloppement web, d\xE9veloppement mobile, Vue.js, NuxtJS, JavaScript, TypeScript, Flutter, Laravel, Symfony, Node.js, API REST, frontend, backend, ing\xE9nieur logiciel, web app, application mobile, UI/UX, responsive design"
        },
        { name: "author", content: "RAFANAMBINANTSOA Maminirina Karim" },
        { property: "og:title", content: "RAFANAMBINANTSOA Maminirina Karim - Portfolio" },
        { property: "og:description", content: "D\xE9veloppeur Full Stack sp\xE9cialis\xE9 en Vue.js et technologies web modernes" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://karimrafanambinantsoa.vercel.app/" },
        { name: "robots", content: "index, follow" },
        { name: "language", content: "French" }
      ],
      link: [
        { rel: "canonical", href: "https://karimrafanambinantsoa.vercel.app/" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SnakeGame = __nuxt_component_0;
      _push(`<!--[--><meta name="google-site-verification" content="g57-LoHOA_yqiP5MVvFzuzLm6vC9bmwW_04PNxzLAbw">`);
      if (!_ctx.loading) {
        _push(`<main id="hello"><div class="css-blurry-gradient-blue"></div><div class="css-blurry-gradient-green"></div><section class="hero"><div class="head"><span> Salut \xE0 tous, je suis </span><h1 class="text-2xl text-[#E5E9F0] font-fira_regular lg:text-4xl">${ssrInterpolate(unref(config).dev.name)}</h1><h2>${ssrInterpolate(unref(config).dev.role)}</h2></div><div id="info"><span class="${ssrRenderClass({ hide: _ctx.isMobile })}"> // Vous pouvez \xE9galement me suivre sur ma page Github. </span><span class="${ssrRenderClass({ hide: !_ctx.isMobile })}"> // find my profile on Github: </span><p class="code"><span class="identifier"> const </span><span class="variable-name"> githubLink </span><span class="operator"> = </span><a class="string"${ssrRenderAttr("href", "https://github.com/" + unref(config).public.dev.contacts.social.github.user)}> &quot;https://github.com/${ssrInterpolate(unref(config).public.dev.contacts.social.github.user)}&quot; </a></p></div></section>`);
        if (!_ctx.isMobile) {
          _push(`<section data-aos="fade-up" class="game">`);
          _push(ssrRenderComponent(_component_SnakeGame, null, null, _parent));
          _push(`</section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</main>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.574646d6.mjs.map
