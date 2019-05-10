import Vue from 'vue'
import Index from './index.vue'

Vue.config.productionTip = false
export function init (Idstr) {
  new Vue({
    render (createElement) {
      return createElement(Index)
    }
  }).$mount(Idstr)
}
if (process.env.NODE_ENV === 'development') {
  init('#app')
}
