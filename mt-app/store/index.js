import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'

Vue.use(Vuex)

const store = () => new Vuex.Store(
  {
    modules: {
      geo
    },
    actions: {
      async nuxtServerInit({
        commit
      }, { req, app }) {
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
      }
    }
  }
)

export default store
