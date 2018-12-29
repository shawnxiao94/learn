// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

export function init ($el) {
  /* eslint-disable no-new */
  new Vue({
    el: $el,
    components: { App },
    template: '<App/>'
  })
}
if (process.env.NODE_ENV === 'development') {
  init('#app')
}
