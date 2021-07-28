<template>
    <h1>login page title</h1>
    this is login page
    <el-button @click="goHome">go to home</el-button>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()

    const goHome = () => {
      router.push('/welcome')
    }

    onMounted(() => {
      // request({
      //   method: 'get',
      //   url: '/login',
      //   data: {
      //     name: 'jack'
      //   }
      // }).then(res => {
      //   console.log(res)
      // })
      // request.get('/login').then(res => {
      //   console.log(res)
      // })
    })

    return {
      goHome
    }
  }
})
</script>

<style scoped>
</style>
