import Vue from 'vue'
import App from './App.vue'
import smui from './packages/index.js'

Vue.config.productionTip = false
Vue.use(smui)
new Vue({
  render: h => h(App),
}).$mount('#app')
