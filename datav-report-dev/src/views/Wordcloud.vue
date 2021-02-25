<template>
  <div id="container" style="height: 100%;">12312321</div>
</template>

<script>
import 'echarts-wordcloud'

export default {
  data () {
    return {}
  },
  mounted () {
    const data = [{
      name: '北京',
      value: 180
    }, {
      name: '上海',
      value: 190
    }, {
      name: '西安',
      value: 150
    }]

    const chart = this.$echarts.init(document.getElementById('container'))
    chart.setOption({
      series: [{
        type: 'wordCloud',
        shape: 'circle',
        data,
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color: function () {
            return 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')'
          }
        }
      }]
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
