import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

// 全局APP 信息
import app from './modules/common/app'
// 权限数据
import permission from './modules/common/permission'
// 用户信息
import user from './modules/common/user'

//页面仓库
import pages from './modules/pages/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    user,
    ...pages
  },
  getters
})

export default store
