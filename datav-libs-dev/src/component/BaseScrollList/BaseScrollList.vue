<template>
  <div class="base-scroll-list" :id="id">
    <div
      class="base-scroll-list-header"
      :style="{
        backgroundColor: actualConfig.headerBg,
        height: actualConfig.headerHeight + 'px',
        fontSize: actualConfig.headerFontSize + 'px',
        color: actualConfig.headerFontColor
      }"
    >
      <div
        class="header-item base-scroll-list-text"
        v-for="(item, index) in headerData"
        :key="item + index"
        :style="{
          ...headerStyle[index],
          width: `${columnsWidth[index]}px`,
          textAlign: aligns[index]
        }"
        v-html="item"
      />
    </div>
    <div
      class="base-scroll-list-rows-wrapper"
      :style="{
        height: (+height - actualConfig.headerHeight) + 'px'
      }"
    >
      <div
        class="base-scroll-list-rows"
        v-for="(row, rowIndex) in currentRowsData"
        :key="row.rowIndex"
        :style="{
          height: `${rowHeights[rowIndex]}px`,
          lineHeight: `${rowHeights[rowIndex]}px`,
          backgroundColor: row.rowIndex % 2 === 0 ? rowBg[1] : rowBg[0],
          fontSize: actualConfig.rowFontSize + 'px',
          color: actualConfig.rowFontColor
        }"
      >
        <div
          class="base-scroll-list-columns base-scroll-list-text"
          v-for="(col, colIndex) in row.data"
          :key="colIndex"
          :style="{
            width: `${columnsWidth[colIndex]}px`,
            textAlign: aligns[colIndex],
            ...rowStyle[colIndex]
          }"
          v-html="col"
        />
      </div>
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
  rowBg: [],
  aligns: [],
  headerFontSize: 28,
  headerFontColor: '#000',
  rowFontSize: 28,
  rowFontColor: '#fff',
  moveNum: 1,
  duration: 3000,
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
    const currentRowsData = ref([])
    const currentIndex = ref(0) // 动画指针
    const rowNum = ref(defaultConfig.rowNum)
    const rowHeights = ref([])
    const rowStyle = ref([])
    const rowBg = ref([])
    const aligns = ref([])
    let avgHeight // 行高

    const handleHeader = (config) => {
      const _headerData = cloneDeep(config.header)
      const _headerStyle = cloneDeep(config.headerStyle)
      const _rowsData = cloneDeep(config.data)
      const _rowStyle = cloneDeep(config.rowStyle)
      const _aligns = cloneDeep(config.aligns)

      if (config.header.length === 0) return
      if (config.headerIndex) {
        _headerData.unshift(config.headerIndexContent)
        _headerStyle.unshift(config.headerIndexStyle)
        _rowStyle.unshift(config.rowIndexStyle)
        _aligns.unshift('center')
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

      const { rowNum } = config
      if (_rowsData.length >= rowNum && _rowsData.length < rowNum * 2) {
        const newRowData = [..._rowsData, ..._rowsData]
        rowsData.value = newRowData.map((item, index) => ({
          data: item,
          rowIndex: index
        }))
      } else {
        rowsData.value = _rowsData.map((item, index) => ({
          data: item,
          rowIndex: index
        }))
      }
      rowStyle.value = _rowStyle
      aligns.value = _aligns
    }

    const handleRows = (config) => {
      // 动态计算每行数据的高度
      const { headerHeight } = config
      rowNum.value = config.rowNum
      const unuseHeight = height.value - headerHeight
      // 如果 rowNum 大于实际数据长度，则以实际长度为准
      if (rowNum.value > rowsData.value.length) {
        rowNum.value = rowsData.value.length
      }
      avgHeight = unuseHeight / rowNum.value
      rowHeights.value = new Array(rowNum.value).fill(avgHeight)

      if (config.rowBg) {
        rowBg.value = config.rowBg
      }
    }

    const startAnimation = async () => {
      const config = actualConfig.value
      const { rowNum, moveNum, duration } = config
      const totalLength = rowsData.value.length
      if (totalLength < rowNum) return
      const index = currentIndex.value
      const _rowsData = cloneDeep(rowsData.value)
      // 讲数据重新进行头尾连接
      const rows = _rowsData.slice(index)
      rows.push(..._rowsData.slice(0, index))
      currentRowsData.value = rows
      // 先将所有行的高度还原
      rowHeights.value = new Array(totalLength).fill(avgHeight)
      const waitTime = 300
      await new Promise(resolve => setTimeout(resolve, waitTime))
      // 将 moveNum 的行高度设置为 0
      rowHeights.value.splice(0, moveNum, ...new Array(moveNum).fill(0))

      currentIndex.value += moveNum
      // 是否到达最后一组数据
      const isLast = currentIndex.value - totalLength
      if (isLast >= 0) {
        currentIndex.value = isLast
      }
      // sleep
      await new Promise(resolve => setTimeout(resolve, duration - waitTime))
      await startAnimation()
    }

    onMounted(() => {
      const _actualConfig = assign(defaultConfig, props.config)
      rowsData.value = _actualConfig.data || []
      handleHeader(_actualConfig)
      handleRows(_actualConfig)
      actualConfig.value = _actualConfig

      startAnimation()
    })

    return {
      id,
      headerData,
      headerStyle,
      actualConfig,
      columnsWidth,
      rowsData,
      rowHeights,
      rowStyle,
      aligns,
      currentRowsData,
      height,
      rowBg
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
  .base-scroll-list-rows-wrapper {
    overflow: hidden;
    .base-scroll-list-rows {
      display: flex;
      align-items: center;
      transition: all 0.3s linear;
      .base-scroll-list-columns {
      }
    }
  }
}
</style>
