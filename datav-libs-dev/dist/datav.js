(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('crypto'), require('echarts')) :
  typeof define === 'function' && define.amd ? define(['vue', 'crypto', 'echarts'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.datav = factory(global.vue, global.crypto, global.echarts));
}(this, (function (vue, crypto, echarts) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);
  var echarts__default = /*#__PURE__*/_interopDefaultLegacy(echarts);

  var script$4 = {
    name: 'Loading',
    props: {
      width: {
        type: [Number, String],
        default: 50
      },
      height: {
        type: [Number, String],
        default: 50
      },
      outsideColor: {
        type: String,
        default: '#3be6cd'
      },
      insideColor: {
        type: String,
        default: '#02bcfe'
      },
      duration: {
        type: [Number, String],
        default: 2
      }
    },

    setup(ctx) {
      const outsideColorAnimation = vue.computed(() => `${ctx.outsideColor};${ctx.insideColor};${ctx.outsideColor}`);
      const insideColorAnimation = vue.computed(() => `${ctx.insideColor};${ctx.outsideColor};${ctx.insideColor}`);
      return {
        outsideColorAnimation,
        insideColorAnimation
      };
    }

  };

  const _withId$3 = /*#__PURE__*/vue.withScopeId("data-v-495a850e");

  vue.pushScopeId("data-v-495a850e");

  const _hoisted_1$1 = {
    class: "loading"
  };
  const _hoisted_2$1 = {
    class: "loading-content"
  };

  vue.popScopeId();

  const render$4 = /*#__PURE__*/_withId$3((_ctx, _cache, $props, $setup, $data, $options) => {
    return vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [(vue.openBlock(), vue.createBlock("svg", {
      width: $props.width,
      height: $props.height,
      viewBox: "0 0 50 50",
      preserveAspectRatio: "xMidYMid meet"
    }, [vue.createVNode("circle", {
      cx: "25",
      cy: "25",
      r: "22",
      fill: "none",
      "stroke-width": "3",
      stroke: $props.outsideColor,
      "stroke-dasharray": "34",
      "stroke-linecap": "round"
    }, [vue.createVNode("animateTransform", {
      attributeName: "transform",
      type: "rotate",
      from: "0 25 25",
      to: "360 25 25",
      dur: `${$props.duration}s`,
      repeatCount: "indefinite"
    }, null, 8
    /* PROPS */
    , ["dur"]), vue.createVNode("animate", {
      attributeName: "stroke",
      values: $setup.outsideColorAnimation,
      dur: `${$props.duration * 2}s`,
      repeatCount: "indefinite"
    }, null, 8
    /* PROPS */
    , ["values", "dur"])], 8
    /* PROPS */
    , ["stroke"]), vue.createVNode("circle", {
      cx: "25",
      cy: "25",
      r: "12",
      fill: "none",
      "stroke-width": "3",
      stroke: $props.insideColor,
      "stroke-dasharray": "19",
      "stroke-linecap": "round"
    }, [vue.createVNode("animateTransform", {
      attributeName: "transform",
      type: "rotate",
      from: "360 25 25",
      to: "0 25 25",
      dur: `${$props.duration}s`,
      repeatCount: "indefinite"
    }, null, 8
    /* PROPS */
    , ["dur"]), vue.createVNode("animate", {
      attributeName: "stroke",
      values: $setup.insideColorAnimation,
      dur: `${$props.duration * 2}s`,
      repeatCount: "indefinite"
    }, null, 8
    /* PROPS */
    , ["values", "dur"])], 8
    /* PROPS */
    , ["stroke"])], 8
    /* PROPS */
    , ["width", "height"])), vue.createVNode("div", _hoisted_2$1, [vue.renderSlot(_ctx.$slots, "default")])]);
  });

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z$3 = ".loading[data-v-495a850e] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  height: 100%; }\n\n.loading-content[data-v-495a850e] {\n  font-size: 20px;\n  margin-top: 10px; }\n";
  styleInject(css_248z$3);

  script$4.render = render$4;
  script$4.__scopeId = "data-v-495a850e";
  script$4.__file = "src/component/Loading/Loading.vue";

  function Loading (Vue) {
    Vue.component(script$4.name, script$4);
  }

  const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

  let poolPtr = rnds8Pool.length;
  function rng() {
    if (poolPtr > rnds8Pool.length - 16) {
      crypto__default['default'].randomFillSync(rnds8Pool);
      poolPtr = 0;
    }

    return rnds8Pool.slice(poolPtr, poolPtr += 16);
  }

  var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

  function validate(uuid) {
    return typeof uuid === 'string' && REGEX.test(uuid);
  }

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */

  const byteToHex = [];

  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).substr(1));
  }

  function stringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields

    if (!validate(uuid)) {
      throw TypeError('Stringified UUID is invalid');
    }

    return uuid;
  }

  function v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }

      return buf;
    }

    return stringify(rnds);
  }

  var script$3 = {
    name: 'FlyBox',
    props: {
      lineColor: {
        type: String,
        default: '#235fa7'
      },
      ballColor: {
        type: String,
        default: '#4fd2dd'
      },
      starLength: {
        type: [String, Number],
        default: 50
      },
      duration: {
        type: [Number, String],
        default: 3
      }
    },

    setup() {
      const uuid = v4();
      const width = vue.ref(0);
      const height = vue.ref(0);
      const refName = 'flyBox';
      const path = vue.computed(() => `M5 5 L${width.value - 5} 5 L${width.value - 5} ${height.value - 5} L5 ${height.value - 5} Z`);
      const pathId = `${refName}-path-${uuid}`;
      const radialGradientId = `-${refName}-gradient-${uuid}`;
      const maskId = `-${refName}-mask-${uuid}`;

      const init = () => {
        const instance = vue.getCurrentInstance();
        const dom = instance.ctx.$refs[refName];
        width.value = dom.clientWidth;
        height.value = dom.clientHeight;
      };

      vue.onMounted(() => {
        init();
      });
      return {
        width,
        height,
        refName,
        path,
        pathId,
        radialGradientId,
        maskId
      };
    }

  };

  const _withId$2 = /*#__PURE__*/vue.withScopeId("data-v-b4514fd8");

  vue.pushScopeId("data-v-b4514fd8");

  const _hoisted_1 = /*#__PURE__*/vue.createVNode("stop", {
    offset: "0%",
    "stop-color": "#fff",
    "stop-opacity": "1"
  }, null, -1
  /* HOISTED */
  );

  const _hoisted_2 = /*#__PURE__*/vue.createVNode("stop", {
    offset: "100%",
    "stop-color": "#fff",
    "stop-opacity": "0"
  }, null, -1
  /* HOISTED */
  );

  const _hoisted_3 = {
    class: "fly-box-content"
  };

  vue.popScopeId();

  const render$3 = /*#__PURE__*/_withId$2((_ctx, _cache, $props, $setup, $data, $options) => {
    return vue.openBlock(), vue.createBlock("div", {
      class: "fly-box",
      ref: $setup.refName
    }, [(vue.openBlock(), vue.createBlock("svg", {
      width: $setup.width,
      height: $setup.height
    }, [vue.createVNode("defs", null, [vue.createVNode("path", {
      id: $setup.pathId,
      d: $setup.path,
      fill: "none"
    }, null, 8
    /* PROPS */
    , ["id", "d"]), vue.createVNode("radialGradient", {
      id: $setup.radialGradientId,
      cx: "50%",
      cy: "50%",
      fx: "100%",
      fy: "50%",
      r: "50%"
    }, [_hoisted_1, _hoisted_2], 8
    /* PROPS */
    , ["id"]), vue.createVNode("mask", {
      id: $setup.maskId
    }, [vue.createVNode("circle", {
      r: $props.starLength,
      cx: "0",
      cy: "0",
      fill: `url(#${$setup.radialGradientId})`
    }, [vue.createVNode("animateMotion", {
      dur: `${$props.duration}s`,
      path: $setup.path,
      rotate: "auto",
      repeatCount: "indefinite"
    }, null, 8
    /* PROPS */
    , ["dur", "path"])], 8
    /* PROPS */
    , ["r", "fill"])], 8
    /* PROPS */
    , ["id"])]), vue.createVNode("use", {
      href: `#${$setup.pathId}`,
      stroke: $props.lineColor,
      "stroke-width": "1"
    }, null, 8
    /* PROPS */
    , ["href", "stroke"]), vue.createVNode("use", {
      href: `#${$setup.pathId}`,
      stroke: $props.ballColor,
      "stroke-width": "3",
      mask: `url(#${$setup.maskId})`
    }, null, 8
    /* PROPS */
    , ["href", "stroke", "mask"])], 8
    /* PROPS */
    , ["width", "height"])), vue.createVNode("div", _hoisted_3, [vue.renderSlot(_ctx.$slots, "default")])], 512
    /* NEED_PATCH */
    );
  });

  var css_248z$2 = ".fly-box[data-v-b4514fd8] {\n  width: 100%;\n  height: 100%;\n  position: relative; }\n  .fly-box[data-v-b4514fd8] svg[data-v-b4514fd8] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n  .fly-box[data-v-b4514fd8] .fly-box-content[data-v-b4514fd8] {\n    width: 100%;\n    height: 100%;\n    padding: 5px;\n    box-sizing: border-box; }\n";
  styleInject(css_248z$2);

  script$3.render = render$3;
  script$3.__scopeId = "data-v-b4514fd8";
  script$3.__file = "src/component/FlyBox/FlyBox.vue";

  function FlyBox (Vue) {
    Vue.component(script$3.name, script$3);
  }

  function debounce(delay, callback) {
    let task;
    return function () {
      clearTimeout(task);
      task = setTimeout(() => {
        callback.apply(this.arguments);
      }, delay);
    };
  }

  var script$2 = {
    name: 'Container',
    props: {
      options: Object
    },

    setup(ctx) {
      const refName = 'container';
      const width = vue.ref(0);
      const height = vue.ref(0);
      const originalWidth = vue.ref(0);
      const originalHeight = vue.ref(0);
      const ready = vue.ref(false);
      let context, dom, observer;

      const initSize = () => {
        return new Promise(async resolve => {
          await vue.nextTick(() => {
            dom = context.$refs[refName]; // 获取大屏的真实尺寸

            if (ctx.options && ctx.options.width && ctx.options.height) {
              width.value = ctx.options.width;
              height.value = ctx.options.height;
            } else {
              width.value = dom.clientWidth;
              height.value = dom.clientHeight;
            } // 获取画布尺寸


            if (!originalWidth.value || !originalHeight.value) {
              originalWidth.value = window.screen.width;
              originalHeight.value = window.screen.height;
            }
          });
          resolve();
        });
      };

      const updateSize = () => {
        if (width.value && height.value) {
          dom.style.width = `${width.value}px`;
          dom.style.height = `${height.value}px`;
        } else {
          dom.style.width = `${originalWidth.value}px`;
          dom.style.height = `${originalHeight.height}px`;
        }
      };

      const updateScale = () => {
        // 获取真实的视口尺寸
        const currentWidth = document.body.clientWidth;
        const currentHeight = document.body.clientHeight; // 获取大屏最终的宽高

        const realWidth = width.value || originalWidth.value;
        const realHeight = height.value || originalHeight.value;
        const widthScale = currentWidth / realWidth;
        const heightScale = currentHeight / realHeight;
        dom.style.transform = `scale(${widthScale}, ${heightScale})`;
      };

      const onResize = async () => {
        await initSize();
        updateScale();
      };

      const initMutationObserver = () => {
        const MutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
        observer = new MutationObserver(onResize);
        observer.observe(dom, {
          attributes: true,
          attributeFilter: ['style'],
          attributeOldValue: true
        });
      };

      const removeMutationObserver = () => {
        if (observer) {
          observer.disconnect();
          observer.takeRecords();
          observer = null;
        }
      };

      vue.onMounted(async () => {
        ready.value = false;
        context = vue.getCurrentInstance().ctx;
        await initSize();
        updateSize();
        updateScale();
        window.addEventListener('resize', debounce(1000, onResize));
        initMutationObserver();
        ready.value = true;
      });
      vue.onUnmounted(() => {
        window.removeEventListener('resize', onResize);
        removeMutationObserver();
      });
      console.log('this is container');
      return {
        refName,
        ready
      };
    }

  };

  const _withId$1 = /*#__PURE__*/vue.withScopeId("data-v-023372d0");

  const render$2 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
    return vue.openBlock(), vue.createBlock("div", {
      id: "container",
      ref: $setup.refName
    }, [$setup.ready ? vue.renderSlot(_ctx.$slots, "default", {
      key: 0
    }) : vue.createCommentVNode("v-if", true)], 512
    /* NEED_PATCH */
    );
  });

  var css_248z$1 = "#container[data-v-023372d0] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  z-index: 999;\n  transform-origin: left top; }\n";
  styleInject(css_248z$1);

  script$2.render = render$2;
  script$2.__scopeId = "data-v-023372d0";
  script$2.__file = "src/component/Container/Container.vue";

  function Container (Vue) {
    Vue.component(script$2.name, script$2);
  }

  var script$1 = {
    name: 'VueECharts',
    props: {
      options: Object,
      theme: [String, Object]
    },

    setup(ctx) {
      let dom,
          chart,
          className = `echarts${v4()}`;

      const initChart = () => {
        if (!chart) {
          dom = document.getElementsByClassName(className)[0];
          chart = echarts__default['default'].init(dom, ctx.theme);
        }

        if (ctx.options) {
          chart.setOption(ctx.options);
        }
      };

      vue.onMounted(() => {
        initChart();
      });
      vue.watch(() => ctx.options, () => {
        initChart();
      });
      return {
        className
      };
    }

  };

  const _withId = /*#__PURE__*/vue.withScopeId("data-v-66f253d8");

  const render$1 = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
    return vue.openBlock(), vue.createBlock("div", {
      class: [$setup.className, 'echarts']
    }, null, 2
    /* CLASS */
    );
  });

  var css_248z = ".echarts[data-v-66f253d8] {\n  width: 100%;\n  height: 100%; }\n";
  styleInject(css_248z);

  script$1.render = render$1;
  script$1.__scopeId = "data-v-66f253d8";
  script$1.__file = "src/component/VueECharts/VueECharts.vue";

  function VueECharts (Vue) {
    Vue.component(script$1.name, script$1);
  }

  let lastTime = 0;
  const prefixes = 'webkit moz ms o'.split(' '); // 各浏览器前缀

  let requestAnimationFrame;
  let cancelAnimationFrame;
  const isServer = typeof window === 'undefined';

  if (isServer) {
    requestAnimationFrame = function () {};

    cancelAnimationFrame = function () {};
  } else {
    requestAnimationFrame = window.requestAnimationFrame;
    cancelAnimationFrame = window.cancelAnimationFrame;
    let prefix; // 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式

    for (let i = 0; i < prefixes.length; i++) {
      if (requestAnimationFrame && cancelAnimationFrame) {
        break;
      }

      prefix = prefixes[i];
      requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
      cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
    } // 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout


    if (!requestAnimationFrame || !cancelAnimationFrame) {
      requestAnimationFrame = function (callback) {
        const currTime = new Date().getTime(); // 为了使setTimteout的尽可能的接近每秒60帧的效果

        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(() => {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

      cancelAnimationFrame = function (id) {
        window.clearTimeout(id);
      };
    }
  }

  var script = {
    name: 'count-to',
    props: {
      startVal: {
        type: Number,
        required: false,
        default: 0
      },
      endVal: {
        type: Number,
        required: false,
        default: 2017
      },
      duration: {
        type: Number,
        required: false,
        default: 3000
      },
      autoplay: {
        type: Boolean,
        required: false,
        default: true
      },
      decimals: {
        type: Number,
        required: false,
        default: 0,

        validator(value) {
          return value >= 0;
        }

      },
      decimal: {
        type: String,
        required: false,
        default: '.'
      },
      separator: {
        type: String,
        required: false,
        default: ','
      },
      prefix: {
        type: String,
        required: false,
        default: ''
      },
      suffix: {
        type: String,
        required: false,
        default: ''
      },
      useEasing: {
        type: Boolean,
        required: false,
        default: true
      },
      easingFn: {
        type: Function,

        default(t, b, c, d) {
          return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
        }

      }
    },

    data() {
      return {
        localStartVal: this.startVal,
        displayValue: this.formatNumber(this.startVal),
        printVal: null,
        paused: false,
        localDuration: this.duration,
        startTime: null,
        timestamp: null,
        remaining: null,
        rAF: null
      };
    },

    computed: {
      countDown() {
        return this.startVal > this.endVal;
      }

    },
    watch: {
      startVal() {
        if (this.autoplay) {
          this.start();
        }
      },

      endVal() {
        if (this.autoplay) {
          this.start();
        }
      }

    },

    mounted() {
      if (this.autoplay) {
        this.start();
      }

      this.$emit('mountedCallback');
    },

    methods: {
      start() {
        this.localStartVal = this.startVal;
        this.startTime = null;
        this.localDuration = this.duration;
        this.paused = false;
        this.rAF = requestAnimationFrame(this.count);
      },

      pauseResume() {
        if (this.paused) {
          this.resume();
          this.paused = false;
        } else {
          this.pause();
          this.paused = true;
        }
      },

      pause() {
        cancelAnimationFrame(this.rAF);
      },

      resume() {
        this.startTime = null;
        this.localDuration = +this.remaining;
        this.localStartVal = +this.printVal;
        requestAnimationFrame(this.count);
      },

      reset() {
        this.startTime = null;
        cancelAnimationFrame(this.rAF);
        this.displayValue = this.formatNumber(this.startVal);
      },

      count(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        this.timestamp = timestamp;
        const progress = timestamp - this.startTime;
        this.remaining = this.localDuration - progress;

        if (this.useEasing) {
          if (this.countDown) {
            this.printVal = this.localStartVal - this.easingFn(progress, 0, this.localStartVal - this.endVal, this.localDuration);
          } else {
            this.printVal = this.easingFn(progress, this.localStartVal, this.endVal - this.localStartVal, this.localDuration);
          }
        } else {
          if (this.countDown) {
            this.printVal = this.localStartVal - (this.localStartVal - this.endVal) * (progress / this.localDuration);
          } else {
            this.printVal = this.localStartVal + (this.endVal - this.localStartVal) * (progress / this.localDuration);
          }
        }

        if (this.countDown) {
          this.printVal = this.printVal < this.endVal ? this.endVal : this.printVal;
        } else {
          this.printVal = this.printVal > this.endVal ? this.endVal : this.printVal;
        }

        this.displayValue = this.formatNumber(this.printVal);

        if (progress < this.localDuration) {
          this.rAF = requestAnimationFrame(this.count);
        } else {
          this.$emit('callback');
        }
      },

      isNumber(val) {
        return !isNaN(parseFloat(val));
      },

      formatNumber(num) {
        num = num.toFixed(this.decimals);
        num += '';
        const x = num.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? this.decimal + x[1] : '';
        const rgx = /(\d+)(\d{3})/;

        if (this.separator && !this.isNumber(this.separator)) {
          while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + this.separator + '$2');
          }
        }

        return this.prefix + x1 + x2 + this.suffix;
      }

    },

    /* eslint-disable */
    unmounted() {
      cancelAnimationFrame(this.rAF);
    }

  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createBlock("span", null, vue.toDisplayString($data.displayValue), 1
    /* TEXT */
    );
  }

  script.render = render;
  script.__file = "src/component/CountTo/vue-countTo.vue";

  function CountTo (Vue) {
    Vue.component(script.name, script);
  }

  function index (vue) {
    vue.use(Loading);
    vue.use(FlyBox);
    vue.use(Container);
    vue.use(VueECharts);
    vue.use(CountTo);
  }

  return index;

})));
