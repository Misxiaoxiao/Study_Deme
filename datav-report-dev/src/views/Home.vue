<template>
  <div class="home">
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script>
import TopView from '../components/TopView'
import SalesView from '../components/SalesView'
import BottomView from '../components/BottomView'
import MapView from '../components/MapView'
import { mapScatter, wordcloud, screenData } from '../api'

export default {
  name: 'Home',
  components: {
    TopView,
    SalesView,
    BottomView,
    MapView
  },
  data () {
    return {
      reportData: null,
      wordCloud: null,
      mapData: null
    }
  },
  provide () {
    return {
      getReportData: () => (this.reportData),
      getWordCloud: () => (this.wordCloud),
      getMapData: () => (this.mapData)
    }
  },
  mounted () {
    screenData().then(data => { this.reportData = data })
    wordcloud().then(data => { this.wordCloud = data })
    mapScatter().then(data => { this.mapData = data })
  }
}
</script>

<style>
  .home {
    width: 100%;
    padding: 20px;
    background: #eee;
    box-sizing: border-box;
  }
</style>
