<template>
  <div class="recommend">
    <div class="slider-wrapper">
      <div class="slider-content">
        {{slidersData}}
        <slider
          v-if="slidersData.length"
          :sliders="slidersData"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getRecommend } from '../service/recommend'
import Slider from '@/components/Base/Slider/index.vue'

export default defineComponent({
  components: {
    Slider
  },
  setup () {
    const slidersData = ref([])
    // const length = ref(0)

    onMounted(async () => {
      const res: any = await getRecommend()
      slidersData.value = res.data.slider
      // length.value = res.data.slider.length
    })

    return {
      slidersData,
      // length
    }
  }
})
</script>

<style lang="scss" scoped>
  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
