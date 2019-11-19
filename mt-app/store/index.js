import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store(
  {
    modules: {
      geo,
      home
    },
    actions: {
      async nuxtServerInit({
        commit
      }, { req, app }) {
        // 设置当前城市
        const {
          status,
          data
        } = await app.$axios.get('http://pv.sohu.com/cityjson?ie=utf-8')
        if (status === 200) {
          const posArr = data.split(' = ')
          const {
            // id,
            cname
          } = JSON.parse(posArr[1].replace(';', ''))
          commit('geo/setPosition', {
            city: cname
          })
        }

        const {
          status: status2,
          data: {
            menu
          }
        } = await app.$axios.get('geo/menu')
        commit('home/setMenu', status2 === 200 ? menu : [])
      }
    }
  }
)

export default store
