<template>
  <div class="scale-list">
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
    const rowStyle = [{ color: 'blue' }]
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
      header: ['城市订单量', '店铺数', '接单骑手人数', '新店铺数量', '人均订单量'], // 表头
      headerStyle: [{ color: '#fff', width: '250px' }],
      headerFontSize: 24, // 表头文字大小
      headerFontColor,
      headerHeight: 55, // 表头高度
      headerIndex: true,
      headerIndexContent: '',
      rowStyle,
      rowBg: ['rgb(40, 40, 40)', 'rgb(55, 55, 55)'],
      aligns: ['center'],
      rowFontSize,
      rowFontColor,
      rowNum: 10,
      data
    }

    return {
      config
    }
  }
}
</script>

<style lang="scss" scoped>
.scale-list {
  width: 100%;
  height: 100%;
}
</style>
