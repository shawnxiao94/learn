// vue
import Vue from "vue";
// 路由
import router from "./router";
// vuex
import store from "@/data/store";
// 跟组件
import App from "./App";
// Element UI
import Element from "element-ui";
// 初始化样式
import "normalize.css/normalize.css";
// 引入全站样式
import "@/assets/styles/index.styl";
// SVG 图标
import "@/assets/icons";
// 翻译库
import i18n from "@/common/lang";
// Error Log
// import '@/common/utils/errorLog'
// 权限拦截器
import "@/common/permission";
// Mock Server
import "@/data/mock/index";
// 全局vue模板fiters过滤器
import * as filters from "@/common/filters";
// 全局directive指令
import directives from "@/common/directives";
// Echarts图表插件
import "echarts";
// 引入正则校验
import Validate from "@/common/validate/index.js";
// 展开收起侧边栏组件
import Hamburger from "@/components/Hamburger";
// 日期插件
import Datetimerange from "@/components/Datetimerange";
import DateCycleMonth from "@/components/Datetimerange/DateCycleMonth";
// 多选框插件
import MultipleSelect from "@/components/MultipleSelect";
// 面包屑组件
import Crumbs from "@/components/Crumbs/index";
// 响应式布局
import responsiveLayout from "@/common/responsiveLayout/index";
/**
 * @see 自定义全局组件
 *  */
Vue.component("Hamburger", Hamburger);
Vue.component("Datetimerange", Datetimerange);
Vue.component("DateCycleMonth", DateCycleMonth);
Vue.component("MultipleSelect", MultipleSelect);
Vue.component("Crumbs", Crumbs);
/**
 * @end
 *  */
/**
 * @see 响应式布局
 *  */
responsiveLayout({});
/**
 * @end
 *  */
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
  size: "mini"
});
// 全局验证
Vue.use(Validate);
// 阻止启动生产消息，常用作指令。
Vue.config.productionTip = false;
// 绑定全局事件Bus
Vue.prototype.$Bus = new Vue();
// render
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render(createElement) {
    return createElement(App);
  }
}).$mount("#app");
