import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BMap from '../views/BMap.vue'
import LiquidFill from '../views/LiquidFill.vue'
import Wordcloud from '../views/Wordcloud.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bmap',
    name: 'BMap',
    component: BMap
  },
  {
    path: '/liquidfill',
    name: 'LiquidFill',
    component: LiquidFill
  },
  {
    path: '/wordcloud',
    name: 'Wordcloud',
    component: Wordcloud
  }
]

const router = new VueRouter({
  routes
})

export default router
