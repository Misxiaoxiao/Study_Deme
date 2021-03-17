import { ref, onMounted, onUnmounted } from 'vue'

const ageMockData = [
  { startValue: 0, value: 131107, axis: '0-20', color: 'rgb(116, 166, 49)' },
  { startValue: 0, value: 330831, axis: '20-30', color: 'rgb(190, 245, 99)' },
  { startValue: 0, value: 551238, axis: '30-50', color: 'rgb(202, 252, 137)' },
  { startValue: 0, value: 31088, axis: '>50', color: 'rgb(251, 253, 142)' }
]

export default function () {
  const todayUser = ref(10000)
  const growthLastDay = ref(1.7)
  const growthLastMonth = ref(2.1)
  const ageData = ref(ageMockData)
  const averageAge = ref(0)

  let task

  onMounted(() => {
    task = setInterval(() => {
      todayUser.value += 100
      growthLastDay.value += 0.5
      growthLastMonth.value += 0.5
      averageAge.value += 1
    }, 3000)
  })

  onUnmounted(() => {
    clearInterval(task)
  })

  return {
    todayUser,
    growthLastDay,
    growthLastMonth,
    ageData,
    averageAge
  }
}
