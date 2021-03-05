import { reactive, computed, watch } from 'vue'

export default function useTest () {
  const state = reactive({
    count: 1
  })

  const increament = () => {
    state.count++
  }

  const doubleCount = computed(() => state.count * 2)

  watch(() => state.count, () => {
    console.log(`state count changed to ${state.count}`)
  })

  return {
    state,
    doubleCount,
    increament
  }
}
