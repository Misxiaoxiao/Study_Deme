<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <i-select />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <categroy />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ISelect from '@/components/changeCity/iSelect.vue'
import Hot from '@/components/changeCity/hot.vue'
import Categroy from '@/components/changeCity/categroy.vue'

export default {
  components: {
    ISelect,
    Hot,
    Categroy
  }
}
</script>

<style lang="scss">
</style>
