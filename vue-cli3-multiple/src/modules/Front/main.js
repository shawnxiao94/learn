import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
Vue.use(require('vue-wechat-title'))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
