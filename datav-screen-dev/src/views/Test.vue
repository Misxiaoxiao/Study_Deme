<template>
  <div>
    <base-scroll-list
      :header="header"
      :headerStyle="headerStyle"
    ></base-scroll-list>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup (props) {
    const header = ref([])
    const headerStyle = ref([])

    header.value = ['姓名', '年龄', '月薪']
    headerStyle.value = [{ color: 'red' }]

    return {
      header,
      headerStyle
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
