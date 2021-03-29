<template>
  <div class="base-scroll-list">
    <div
      class="base-scroll-list-header"
      :style="{
        backgroundColor: headerBg,
        height: headerHeight + 'px'
      }"
    >
      <div
        class="header-item base-scroll-list-text"
        v-for="(item, index) in header"
        :key="item + index"
        :style="headerStyle[index]"
        v-html="item"
      />
    </div>
    <div class="base-scroll-list-rows"></div>
  </div>
</template>

<script>
export default {
  name: 'BaseScrollList',
  props: {
    // 标题数据
    header: Array,
    // 标题样式
    headerStyle: Array,
    headerBg: {
      type: String,
      default: 'rgb(90, 90, 90)'
    },
    headerHeight: {
      type: [Number, String],
      default: 35
    }
  },
  setup (props) {
    console.log(props)
  }
}
</script>

<style lang="scss" scoped>
.base-scroll-list {
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
}
</style>
