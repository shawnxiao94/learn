import Vue from "vue";
import App from "./App.vue";
// 路由
import router from "router";
// vuex
import store from "data/store";
// 响应式布局
import responsiveLayout from "common/responsiveLayout/index";

/*
 * UI框架相关
 *
 */
import Element from "element-ui";
// 翻译库
import i18n from "common/lang";

/*
 * 样式相关
 *
 */
// 初始化样式
import "normalize.css/normalize.css";
import "assets/styles/index.styl";
// SVG 图标
import "assets/icons";

/*
 * JS相关
 *
 */

// 权限拦截器
import "common/permission";
// Mock Server
import "data/mock/index";
// 全局vue模板filters过滤器
import filters from "common/filters";
// 本页全局directive指令
import directives from "common/directives";
// 引入正则校验
import Validate from "common/validate/index.js";

// 引入自定义 全局组件
import "components";

/**
 * @see 响应式布局
 *  */
responsiveLayout({});
// 注册vue模板过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
// 注册全局指令方法
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});
// 注册Element UI
Vue.use(Element, {
  size: store.getters.app.size
});
// 全局验证
Vue.use(Validate);
// 阻止启动生产消息，常用作指令。
Vue.config.productionTip = false;

// render
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render (createElement) {
    return createElement(App);
  }
}).$mount("#app");

// PWA => 判断该浏览器支不支持 serviceWorker
if (process.env.envList.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          // eslint-disable-next-line no-console
          console.log("service-worker registed", registration);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log("service-worker registed error", error);
        });
    });
  }
} else {
  /**
   * 启动热加载
   */
  if (module.hot) {
    module.hot.accept();
  }
}
// eslint-disable-next-line no-console
console.log(process.env.NODE_ENV, process.env.envList);
