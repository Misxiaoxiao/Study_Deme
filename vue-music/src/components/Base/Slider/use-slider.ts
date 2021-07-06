import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'

BScroll.use(Slide)

export const useSlider = (wrapperRef: Ref<HTMLElement>) => {
  const slider = ref<BScrollConstructor | null>(null)
  const currentPageIndex = ref(0)

  onMounted(() => {
    slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true
    })

    slider.value.on('slideWillChange', (page: { pageX: number }) => {
      currentPageIndex.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value?.destroy()
  })

  return {
    slider,
    currentPageIndex
  }
}
