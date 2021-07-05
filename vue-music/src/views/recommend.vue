<template>
  <div>
    this is recommend page
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getRecommend } from '../service/recommend'

export default defineComponent({
  setup () {
    getRecommend().then(res => {
      console.log(res)
    })

    return {}
  }
})
</script>

<style scoped>
</style>
