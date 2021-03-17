<template>
  <div id="container" :ref="refName">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance, onUnmounted, nextTick } from 'vue'
import { debounce } from '../../utils/index'

export default {
  name: 'Container',
  props: {
    options: Object
  },
  setup (ctx) {
    const refName = 'container'
    const width = ref(0)
    const height = ref(0)
    const originalWidth = ref(0)
    const originalHeight = ref(0)
    const ready = ref(false)
    let context, dom, observer

    const initSize = () => {
      return new Promise(async (resolve) => {
        await nextTick(() => {
          dom = context.$refs[refName]
          // 获取大屏的真实尺寸
          if (ctx.options && ctx.options.width && ctx.options.height) {
            width.value = ctx.options.width
            height.value = ctx.options.height
          } else {
            width.value = dom.clientWidth
            height.value = dom.clientHeight
          }
          // 获取画布尺寸
          if (!originalWidth.value || !originalHeight.value) {
            originalWidth.value = window.screen.width
            originalHeight.value = window.screen.height
          }
        })
        resolve()
      })
    }

    const updateSize = () => {
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`
        dom.style.height = `${height.value}px`
      } else {
        dom.style.width = `${originalWidth.value}px`
        dom.style.height = `${originalHeight.height}px`
      }
    }

    const updateScale = () => {
      // 获取真实的视口尺寸
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      // 获取大屏最终的宽高
      const realWidth = width.value || originalWidth.value
      const realHeight = height.value || originalHeight.value
      const widthScale = currentWidth / realWidth
      const heightScale = currentHeight / realHeight
      dom.style.transform = `scale(${widthScale}, ${heightScale})`
    }

    const onResize = async () => {
      await initSize()
      updateScale()
    }

    const initMutationObserver = () => {
      const MutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver
      observer = new MutationObserver(onResize)
      observer.observe(dom, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true
      })
    }

    const removeMutationObserver = () => {
      if (observer) {
        observer.disconnect()
        observer.takeRecords()
        observer = null
      }
    }

    onMounted(async () => {
      ready.value = false
      context = getCurrentInstance().ctx
      await initSize()
      updateSize()
      updateScale()

      window.addEventListener('resize', debounce(1000, onResize))
      initMutationObserver()
      ready.value = true
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize)
      removeMutationObserver()
    })
    console.log('this is container')

    return {
      refName,
      ready
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
  transform-origin: left top;
}
</style>
