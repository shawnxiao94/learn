import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/common/app";
import errorLog from "./modules/common/errorLog";
import permission from "./modules/common/permission";
import tagsView from "./modules/common/tagsView";
import user from "./modules/common/user";
/**
 * 手机端适配
 *   */
import mobileApp from "./modules/common/mobile/app";
/* End */
import getters from "./getters";
//页面仓库
import pages from "./modules/pages/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    mobileApp,
    ...pages
  },
  getters
});

export default store;
