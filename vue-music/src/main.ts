import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 全局引入样式
import '@/assets/scss/index.scss'

createApp(App).use(router).mount('#app')
