import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import datav from 'datav-libs-dev'
import vueCountTo from './components/CountTo/vue-countTo'

createApp(App)
  .use(store)
  .use(router)
  .use(datav)
  .component('CountTo', vueCountTo)
  .mount('#app')
