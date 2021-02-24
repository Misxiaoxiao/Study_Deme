<template>
  <!-- <ve-map :data="chartData" height="800px" /> -->
  <ve-bmap
    :title="title"
    :settings="chartSettings"
    :tooltip="{}"
    :series="chartSeries"
    height="100%"
  />
</template>

<script>
const testPoint = [{
  name: '澳门',
  value: [121.15, 31.89, 80]
}, {
  name: '南京',
  value: [118.78, 32.04, 100]
}]

const testPoint2 = [{
  name: '北京',
  value: [116.404269, 39.913385, 200]
}, {
  name: '上海',
  value: [121.475941, 31.222836, 195]
}]

export default {
  data () {
    return {
      // chartData: {
      //   columns: ['位置', '税收'],
      //   rows: [{
      //     // eslint-disable-next-line quote-props
      //     '位置': '上海',
      //     // eslint-disable-next-line quote-props
      //     '税收': 123
      //   }, {
      //     // eslint-disable-next-line quote-props
      //     '位置': '北京',
      //     // eslint-disable-next-line quote-props
      //     '税收': 456
      //   }]
      // }
      title: {
        text: '外卖销售数据大盘',
        subtext: '销售趋势统计',
        sublink: 'https://www.imooc.com',
        left: 'center'
      },
      chartSeries: [
        {
          name: '销售额',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: testPoint,
          encode: {
            value: 2
          },
          itemStyle: {
            color: 'purple'
          },
          symbolSize: (val) => {
            return val[2] / 10
          },
          label: {
            show: false,
            position: 'right',
            formatter: (v) => {
              return `${v.data.name} - ${v.data.value[2]}`
            }
          },
          emphasis: {
            label: {
              show: true
            }
          }
        }, {
          name: 'Top 2',
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: testPoint2,
          symbolSize: (val) => {
            return val[2] / 10
          },
          encode: {
            value: 2
          },
          label: {
            formatter: (v) => {
              return `${v.data.name} - ${v.data.value[2]}`
            },
            position: 'right',
            show: true
          },
          hoverAnimation: true,
          rippleEffect: {
            brushType: 'stroke'
          },
          itemStyle: {
            color: 'purple',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        }
      ],
      chartSettings: {
        key: 'VXPSxWlSlSjyA8MFMxG2uz3n6QC9tySo',
        bmap: {
          center: [104.1141129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: {}
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
