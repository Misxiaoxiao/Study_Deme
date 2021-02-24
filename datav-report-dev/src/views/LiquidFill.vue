<template>
  <div id="container"></div>
</template>

<script>
export default {
  mounted () {
    const data = [0.68, { value: 0.5, direction: 'left' }, { value: 0.4 }]
    const chart = this.$echarts.init(document.getElementById('container'))
    chart.setOption({
      series: [{
        type: 'liquidFill',
        data,
        color: ['red', 'blue', 'yellow'],
        // waveAnimation: false,
        // animationDuration: 0,
        // animationDurationUpdate: 0,
        amplitude: 10,
        backgroundStyle: {
          color: 'purple',
          borderWidth: 4,
          borderColor: '#333'
        },
        outline: {
          show: true,
          borderDistance: 2,
          itemStyle: {
            borderWidth: 2,
            borderColor: 'red',
            shadowBlur: 'none'
          }
        },
        shape: 'diamon',
        itemStyle: {
          opacity: 0.3
        },
        emphasis: {
          itemStyle: {
            opacity: 0.9
          }
        }
      }]
    })
  }
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
