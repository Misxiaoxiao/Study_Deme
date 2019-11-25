<template>
  <div
    :id="id"
    :style="{
      width: width + 'px',
      height: height + 'px',
      margin: '34px auto'
    }"
  />
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default () {
        return [116.46, 39.92]
      }
    }
  },
  data() {
    return {
      id: 'map',
      key: '0dbc0dfd7c775f2a927174493eab8220'
    }
  },
  watch: {
    point () {}
  },
  mounted () {
    this.id = `map${Math.random().toString().slice(4, 6)}`

    window.onmaploaded = () => {
      const map = new window.AMap.Map(this.id, {
        resizeEnable: true,
        zoom: 11,
        center: this.point
      })
      this.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        const toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        const marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: this.point
        })
        this.marker = marker
        marker.setMap(map)
      })
    }
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded`
    const jsApi = document.createElement('script')
    jsApi.charset = 'utf-8'
    jsApi.src = url
    document.head.appendChild(jsApi)
  }
}
</script>
