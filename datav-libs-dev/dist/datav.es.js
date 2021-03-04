import { ref, computed, openBlock, createBlock, createTextVNode, toDisplayString, createVNode } from 'vue';

var script = {
  name: 'TestCom',

  setup() {
    const message = 'test component';
    const count = ref(1);
    const doubleCount = computed(() => count.value * 2);
    return {
      message,
      count,
      doubleCount
    };
  }

};

const _hoisted_1 = {
  class: "test"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1, [createTextVNode(toDisplayString($setup.message) + " ", 1
  /* TEXT */
  ), createVNode("div", null, "count: " + toDisplayString($setup.count), 1
  /* TEXT */
  ), createVNode("div", null, "doubleCount: " + toDisplayString($setup.doubleCount), 1
  /* TEXT */
  )]);
}

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

var css_248z = ".test {\n  color: red;\n}";
styleInject(css_248z);

script.render = render;
script.__file = "src/Test.vue";

function index (Vue) {
  Vue.component(script.name, script);
}

export default index;
