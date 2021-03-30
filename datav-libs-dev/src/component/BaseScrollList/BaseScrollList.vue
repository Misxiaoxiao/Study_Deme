<template>
  <div class="base-scroll-list" :id="id">
    <div
      class="base-scroll-list-header"
      :style="{
        backgroundColor: actualConfig.headerBg,
        height: actualConfig.headerHeight + 'px'
      }"
    >
      <div
        class="header-item base-scroll-list-text"
        v-for="(item, index) in headerData"
        :key="item + index"
        :style="{
          ...headerStyle[index],
          width: `${columnsWidth[index]}px`,
        }"
        v-html="item"
      />
    </div>
    <div
      class="base-scroll-list-rows"
      v-for="(row, rowIndex) in rowsData"
      :key="rowIndex"
      :style="{
        height: `${rowHeights[rowIndex]}px`
      }"
    >
      <div
        class="base-scroll-list-columns"
        v-for="(col, colIndex) in row"
        :key="colIndex"
        :style="{
          width: `${columnsWidth[colIndex]}px`,
          ...rowStyle[colIndex]
        }"
        v-html="col"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import useScreen from '../../hooks/useScreen'
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'

const defaultConfig = {
  // 标题数据
  header: [],
  // 标题样式
  headerStyle: [],
  headerBg: 'rgb(90, 90, 90)',
  headerHeight: 35,
  // 标题是否展示序号
  headerIndex: false,
  headerIndexContent: '#',
  headerIndexStyle: {
    width: 50
  },
  rowStyle: [],
  rowIndexStyle: {},
  rowNum: 5,
  // 数据项
  data: []
}

export default {
  name: 'BaseScrollList',
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const id = `base-scroll-list-${uuidv4()}`

    const headerData = ref([])
    const headerStyle = ref([])
    const actualConfig = ref([])
    const { width, height } = useScreen(id)
    const columnsWidth = ref([])
    const rowsData = ref([])
    const rowNum = ref(defaultConfig.rowNum)
    const rowHeights = ref([])
    const rowStyle = ref([])

    const handleHeader = (config) => {
      const _headerData = cloneDeep(config.header)
      const _headerStyle = cloneDeep(config.headerStyle)
      const _rowsData = cloneDeep(config.data)
      const _rowStyle = cloneDeep            (config.rowStyle)

      if (config.header.length === 0) return
      if (config.headerIndex) {
        _headerData.unshift(config.headerIndexContent)
        _headerStyle.unshift(config.headerIndexStyle)
        _rowStyle.unshift(config.rowIndexStyle)
        _rowsData.forEach((_, index) => {
          _rowsData[index].unshift(index + 1)
        })
      }

      // 动态计算 header 中每一列宽度
      let usedWidth = 0
      let useColumnNum = 0
      _headerStyle.forEach(item => {
        if (item.width) {
          usedWidth += +String(item.width).replace('px', '')
          useColumnNum++
        }
      })
      const avgWidth = (width.value - usedWidth) / (_headerData.length - useColumnNum)
      const _columnWidth = new Array(_headerData.length).fill(avgWidth)
      _headerStyle.forEach((item, index) => {
        if (item.width) {
          const headerWidth = +String(item.width).replace('px', '')
          _columnWidth[index] = headerWidth
        }
      })
      columnsWidth.value = _columnWidth
      headerData.value = _headerData
      headerStyle.value = _headerStyle
      rowsData.value = _rowsData
      rowStyle.value = _rowStyle
    }

    const handleRows = (config) => {
      // 动态计算每行数据的高度
      const { headerHeight } = config
      rowNum.value = config.rowNum
      const unuseHeight = height.value - headerHeight
      console.log(rowsData.value.length)
      // 如果 rowNum 大于实际数据长度，则以实际长度为准
      if (rowNum.value < rowsData.value.length) {
        rowNum.value = rowsData.value.length
      }
      const avgHeight = unuseHeight / rowNum.value
      rowHeights.value = new Array(rowsData.value.length).fill(avgHeight)
    }

    onMounted(() => {
      const _actualConfig = assign(defaultConfig, props.config)
      rowsData.value = _actualConfig.data || []
      handleHeader(_actualConfig)
      handleRows(_actualConfig)
      actualConfig.value = _actualConfig
    })

    return {
      id,
      headerData,
      headerStyle,
      actualConfig,
      columnsWidth,
      rowsData,
      rowHeights,
      rowStyle
    }
  }
}
</script>

<style lang="scss" scoped>
.base-scroll-list {
  width: 100%;
  height: 100%;
  .base-scroll-list-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .base-scroll-list-header {
    display: flex;
    font-size: 15px;
    align-items: center;
    .header-item {}
  }
  .base-scroll-list-rows {
    display: flex;
    align-items: center;
    .base-scroll-list-columns {
      font-size: 28px;
    }
  }
}
</style>
