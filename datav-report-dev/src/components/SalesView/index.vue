<template>
  <div>
    <v-chart
      :options="data"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        xAxis: {
          type: 'category'
        },
        yAxis: {},
        series: [{
          type: 'line',
          data: [100, 200, 300]
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
