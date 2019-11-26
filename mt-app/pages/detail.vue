<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24"></el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/detail/crumbs.vue'

export default {
  components: {
    Crumbs
  }
}
</script>

<style lang="scss">
@import "@/assets/css/detail/index.scss";
</style>
