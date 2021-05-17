<template>
  <div style="width: 100%; height: 100%;">
    <vue-e-charts :options="options" />
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import echarts from 'echarts'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'JiangsuMapWarning',
  setup () {
    const options = ref({})
    let timer = null

    const update = () => {
      fetch('http://www.youbaobao.xyz/datav-res/datav/map.json')
        .then(res => res.json())
        .then(data => {
          const center = []
          data.features.forEach(item => {
            if (item.properties) {
              center.push({
                key: item.properties.name,
                value: item.properties.cp
              })
            }
          })
          echarts.registerMap('jiangsu', data)
          options.value = {
            geo: [{
              map: 'jiangsu',
              roam: false,
              itemStyle: {
                areaColor: '#013c62',
                shadowColor: '#013c62',
                shadowBlur: 20,
                shadowOffsetX: -5,
                shadowOffsetY: -5
              }
            }],
            visualMap: {
              show: true,
              max: 100,
              inRange: {
                color: ['#a5dcf4', '#006edd']
              }
            },
            series: [
              {
                type: 'map',
                mapType: 'jiangsu',
                label: {
                  show: true,
                  color: '#fff',
                  emphasis: {
                    color: '#fff',
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: '#2980b9',
                    borderWidth: 1,
                    areaColor: '#12235c'
                  },
                  emphasis: {
                    areaColor: '#fa8c16',
                    borderWidth: 0
                  }
                },
                data: center.map(centerItem => {
                  const key = centerItem.key
                  const value = Math.random() * 100
                  return {
                    name: key,
                    value
                  }
                })
              }, {
                type: 'effectScatter',
                data: [],
                coordinateSystem: 'geo',
                symbolSize: 14,
                itemStyle: {
                  show: true,
                  color: '#feae21'
                },
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    formatter (params) {
                      return `{title|${params.data.city}}\n{content|发生 xx 事件}`
                    },
                    backgroundColor: '#feae21',
                    padding: [0, 0],
                    borderRadius: 3,
                    lineHeight: 32,
                    color: '#fff',
                    rich: {
                      title: {
                        padding: [0, 10, 10, 10],
                        color: '#fff'
                      },
                      content: {
                        padding: [10, 10, 0, 10],
                        color: '#fff'
                      }
                    }
                  },
                  emphasis: {
                    show: true
                  }
                }
              }, {
                type: 'effectScatter',
                data: [],
                coordinateSystem: 'geo',
                symbolSize: 14,
                itemStyle: {
                  show: true,
                  color: '#e93f42'
                },
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    formatter (params) {
                      return `{title|${params.data.city}}\n{content|发生 xx 事件}`
                    },
                    backgroundColor: 'rgba(233, 63, 66, .9)',
                    padding: [0, 0],
                    borderRadius: 3,
                    lineHeight: 32,
                    color: '#fff',
                    rich: {
                      title: {
                        padding: [0, 10, 10, 10],
                        color: '#fff'
                      },
                      content: {
                        padding: [10, 10, 0, 10],
                        color: '#fff'
                      }
                    }
                  },
                  emphasis: {
                    show: true
                  }
                }
              }, {
                type: 'effectScatter',
                data: [],
                coordinateSystem: 'geo',
                symbolSize: 14,
                itemStyle: {
                  show: true,
                  color: '#08baec'
                },
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    formatter (params) {
                      return `{title|${params.data.city}}\n{content|发生 xx 事件}`
                    },
                    backgroundColor: 'rgba(8, 186, 236, .9)',
                    padding: [0, 0],
                    borderRadius: 3,
                    lineHeight: 32,
                    color: '#fff',
                    rich: {
                      title: {
                        padding: [0, 10, 10, 10],
                        color: '#fff'
                      },
                      content: {
                        padding: [10, 10, 0, 10],
                        color: '#fff'
                      }
                    }
                  },
                  emphasis: {
                    show: true
                  }
                }
              }
            ]
          }
          timer = setInterval(() => {
            const _options = cloneDeep(options.value)
            for (let i = 1; i < 4; i++) {
              _options.series[i].data = []
            }

            const cityLength = center.length
            const cityIndex = Math.floor(Math.random() * cityLength)
            const eventIndex = Math.floor(Math.random() * 3) + 1
            _options.series[eventIndex].data = [{
              city: center[cityIndex].key,
              value: center[cityIndex].value
            }]

            options.value = _options
          }, 2000)
        })
        .catch(err => {
          console.error(err)
        })
    }

    onMounted(update)

    onUnmounted(() => timer && clearInterval(timer))

    return {
      options
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
