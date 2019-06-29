import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'

// 初始化样式
import 'normalize.css/normalize.css'

// Element UI
import Element from 'element-ui'

Vue.use(require('vue-wechat-title'))
// 注册Element UI
Vue.use(Element, {
  size: 'medium'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
