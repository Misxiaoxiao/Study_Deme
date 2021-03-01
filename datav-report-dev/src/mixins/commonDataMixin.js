function format (v) {
  const reg = /\d{1,3}(?=(\d{3})+$)/g
  return `${v}`.replace(reg, '$&,')
}

function wrapperNumber (o, k) {
  return o && o[k] ? format(o[k]) : 0
}

function wrapperArray (o, k) {
  return o && o[k] ? o[k] : []
}

function wrapperPercentage (o, k) {
  return o && o[k] ? `${o[k]}%` : '0%'
}

function wrapperMoney (o, k) {
  return o && o[k] ? `￥ ${format(o[k])}` : '￥ 0.00'
}

export default {
  computed: {
    reportData () {
      return this.getReportData()
    },
    salesToday () {
      return wrapperMoney(this.reportData, 'salesToday')
    },
    salesGrowthLastDay () {
      return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
    },
    salesGrowthLastMonth () {
      return wrapperPercentage(this.reportData, 'salesGrowthLastMonth')
    },
    salesLastDay () {
      return wrapperMoney(this.reportData, 'salesLastDay')
    },
    orderToday () {
      return wrapperNumber(this.reportData, 'orderToday')
    },
    orderLastDay () {
      return wrapperNumber(this.reportData, 'orderLastDay')
    },
    orderTrend () {
      return wrapperArray(this.reportData, 'orderTrend')
    }
  },
  inject: ['getReportData', 'getWordCloud', 'getMapData']
}
