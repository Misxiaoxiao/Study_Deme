import Loading from './component/Loading/index'
import FlyBox from './component/FlyBox/index'
import Container from './component/Container/index'
import VueEcharts from './component/VueECharts/index'
import CountTo from './component/CountTo/index'

export default function (vue) {
  vue.use(Loading)
  vue.use(FlyBox)
  vue.use(Container)
  vue.use(VueEcharts)
  vue.use(CountTo)
}
