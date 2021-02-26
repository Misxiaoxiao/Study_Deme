export default {
  computed: {
    reportData () {
      return this.getReportData()
    }
  },
  inject: ['getReportData', 'getWordCloud', 'getMapData']
}
