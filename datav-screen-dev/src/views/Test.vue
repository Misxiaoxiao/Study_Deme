<template>
  <div style="width: 500px; height: 400px;">
    <base-scroll-list
      :config="config"
    ></base-scroll-list>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup (props) {
    const config = ref({})

    const header = ['姓名', '年龄', '月薪']
    const headerStyle = [{ color: 'red', width: '100px' }]
    const rowStyle = [{ color: 'blue' }]
    const rowBg = ['rgb(200, 200, 200)', 'rgb(255, 255, 255)']
    const aligns = ['center', 'right']
    const headerFontSize = 24
    const rowFontSize = 20
    const headerFontColor = '#fff'
    const rowFontColor = '#000'
    const data = []

    for (let i = 0; i < 10; i++) {
      data.push([
        '同学' + (i + 1),
        Math.floor(Math.random() * 10 + 20),
        Math.floor(Math.random() * 10000 + 10000)
      ])
    }

    config.value = {
      header,
      headerStyle,
      headerHeight: 40,
      headerIndex: true,
      rowStyle,
      rowBg,
      aligns,
      headerFontSize,
      headerFontColor,
      rowFontSize,
      rowFontColor,
      data
    }

    return {
      config
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
