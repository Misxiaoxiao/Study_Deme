<template>
  <div class="container">
    <column-list :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1d的专栏，有一段非常有意思的简介，可以更新一下',
    avatar: 'http://baidu.com',
  },
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1d的专栏，有一段非常有意思的简介，可以更新一下',
    avatar: 'http://baidu.com',
  },
]

export default defineComponent({
  components: {
    ColumnList,
  },
  setup() {
    return {
      list: testData,
    }
  },
})
</script>

<style scoped>
</style>
