<template>
  <div class="fly-box" :ref="refName">
    <svg :width="width" :height="height" >
      <defs>
        <path :id="pathId" :d="path" fill="none" />
        <radialGradient :id="radialGradientId" cx="50%" cy="50%" fx="100%" fy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
        <mask :id="maskId">
          <circle :r="starLength" cx="0" cy="0" :fill="`url(#${radialGradientId})`">
            <animateMotion :dur="`${duration}s`" :path="path" rotate="auto" repeatCount="indefinite" />
          </circle>
        </mask>
      </defs>
      <use :href="`#${pathId}`" :stroke="lineColor" stroke-width="1" />
      <use :href="`#${pathId}`" :stroke="ballColor" stroke-width="3" :mask="`url(#${maskId})`" />
    </svg>
    <div class="fly-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export default {
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
  setup () {
    const uuid = uuidv4()
    const width = ref(0)
    const height = ref(0)
    const refName = 'flyBox'
    const path = computed(() => `M5 5 L${width.value - 5} 5 L${width.value - 5} ${height.value - 5} L5 ${height.value - 5} Z`)
    const pathId = `${refName}-path-${uuid}`
    const radialGradientId = `-${refName}-gradient-${uuid}`
    const maskId = `-${refName}-mask-${uuid}`

    const init = () => {
      const instance = getCurrentInstance()
      const dom = instance.ctx.$refs[refName]
      width.value = dom.clientWidth
      height.value = dom.clientHeight
    }

    onMounted(() => {
      init()
    })

    return {
      width,
      height,
      refName,
      path,
      pathId,
      radialGradientId,
      maskId
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-box {
  width: 100%;
  height: 100%;
  position: relative;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .fly-box-content {
    width: 100%;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
}
</style>