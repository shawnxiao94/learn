/*
 * @Author: your name
 * @Date: 2020-02-22 23:16:55
 * @LastEditTime: 2020-02-23 21:58:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ts-app\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'

import 'todomvc-app-css/index.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
