<template>
  <div class="echarts" />
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import echarts from 'echarts'

export default {
  props: {
    options: Object,
    theme: [String, Object]
  },
  setup (ctx) {
    let dom, chart

    const initChart = () => {
      if (!chart) {
        dom = document.getElementsByClassName('echarts')[0]
        chart = echarts.init(dom, ctx.theme)
      }
      chart.setOption(ctx.options)
    }

    onMounted(() => {
      initChart()
    })

    watch(() => ctx.options, () => {
      initChart()
    })
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
