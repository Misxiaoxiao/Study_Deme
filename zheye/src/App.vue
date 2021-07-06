<template>
  <div class="container">
    <global-header :user="currentUser" />
    <column-list :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobelHeader.vue'

const currentUser: UserProps = {
  isLogin: true,
  name: 'xiao',
}

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1d的专栏，有一段非常有意思的简介，可以更新一下，可以更新一下可以更新一下可以更新一下可以更新一下可以更新一下可以更新一下可以更新一下',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb1-q.mafengwo.net%2Fs7%2FM00%2F2E%2F37%2FwKgB6lSuHraAYMNtAAXF8ovILuk683.png&refer=http%3A%2F%2Fb1-q.mafengwo.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628132261&t=9ddee0c2aa9b47a632fb34a3d61715ae',
  },
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1d的专栏，有一段非常有意思的简介，可以更新一下',
  },
]

export default defineComponent({
  components: {
    ColumnList,
    GlobalHeader,
  },
  setup() {
    return {
      list: testData,
      currentUser,
    }
  },
})
</script>

<style scoped>
</style>
