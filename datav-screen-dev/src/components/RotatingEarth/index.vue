<template>
  <div class="rotating-earth">
    <vue-e-charts :options="options" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import 'echarts-gl'

const ROOT_PATH = './'

export default {
  name: 'RotatingEarth',
  setup () {
    const options = ref({})

    const update = () => {
      options.value = {
        globe: {
          baseTexture: `${ROOT_PATH}assets/datav-gl-texture.jpeg`,
          heightTexture: `${ROOT_PATH}assets/datav-gl-texture.jpeg`,
          displacementScale: 0.04,
          environment: `${ROOT_PATH}assets/star-bg.jpeg`,
          shading: 'realistic',
          realisticMaterial: {
            roughness: 0.9
          },
          postEffect: {
            enable: true
          },
          light: {
            main: {
              intensity: 5,
              shadow: true
            },
            ambient: {
              intensity: 5
            }
          }
        }
      }
    }

    onMounted(update)

    return {
      options
    }
  }
}
</script>

<style lang="scss" scoped>
  .rotating-earth {
    width: 100%;
    height: 100%;
  }
</style>
