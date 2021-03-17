import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import datav from 'datav-libs-dev'

createApp(App)
  .use(store)
  .use(router)
  .use(datav)
  .mount('#app')
