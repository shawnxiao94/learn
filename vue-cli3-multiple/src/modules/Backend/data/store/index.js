import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/common/app'
import permission from './modules/common/permission'
import user from './modules/common/user'

import getters from './getters'
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
