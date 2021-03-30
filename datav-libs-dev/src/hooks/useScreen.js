import { ref, onMounted, nextTick } from 'vue'

export default function useScreen (id) {
  const width = ref(0)
  const height = ref(0)
  let dom

  const initSize = () => {
    return new Promise(async (resolve) => {
      await nextTick(() => {
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

  onMounted(() => {
    dom = document.getElementById(id)
    width.value = dom.clientWidth
    height.value = dom.clientHeight
    
  })

  return {
    width,
    height
  }
}
