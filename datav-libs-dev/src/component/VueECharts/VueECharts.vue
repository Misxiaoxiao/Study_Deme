<template>
  <div :class="[className, 'echarts']" />
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import echarts from 'echarts'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'VueECharts',
  props: {
    options: Object,
    theme: [String, Object]
  },
  setup (ctx) {
    let dom, chart, className = `echarts${uuidv4()}`

    const initChart = () => {
      if (!chart) {
        dom = document.getElementsByClassName(className)[0]
        chart = echarts.init(dom, ctx.theme)
      }
      if (ctx.options) {
        chart.setOption(ctx.options)
      }
    }

    onMounted(() => {
      initChart()
    })

    watch(() => ctx.options, () => {
      initChart()
    })

    return {
      className
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
