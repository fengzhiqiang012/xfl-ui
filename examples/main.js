import Vue from 'vue'
import App from './App.vue'
import router from './router'
import xflUi from '@/index.js'
import { showText } from '@/utils'
console.log(showText('法外狂徒'))
Vue.config.productionTip = false
Vue.use(xflUi)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
