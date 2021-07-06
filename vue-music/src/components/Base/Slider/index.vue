<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group">
      <div
        class="slider-page"
        v-for="item in sliders"
        :key="item.id"
      >
        <a :href="item.linkUrl">
          <img :src="item.picUrl" />
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item, index) in sliders"
        :key="item.id"
        :class="{ 'active': currentPageIndex === index }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useSlider } from './use-slider'

export default defineComponent<{
  sliders: {[k: string]: string}[]
}>({
  setup (props) {
    const rootRef = ref<HTMLElement | null>(null)
    const sliders = ref<{[k: string]: string}[]>([])
    const { currentPageIndex } = useSlider(rootRef as Ref<HTMLElement>)

    watch(() => props.sliders, val => {
      console.log(val)
      sliders.value = val
    })

    return {
      rootRef,
      currentPageIndex,
      sliders
    }
  }
})
</script>

<style lang="scss" scoped>
  .slider {
    min-height: 1px;
    font-size: 0;
    touch-action: pan-y;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        a {
          display: block;
          width: 100%;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .dots-wrapper {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      text-align: center;
      font-size: 0;
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $color-text-l;
        &.active {
          width: 20px;
          border-radius: 5px;
          background: $color-text-ll;
        }
      }
    }
  }
</style>
