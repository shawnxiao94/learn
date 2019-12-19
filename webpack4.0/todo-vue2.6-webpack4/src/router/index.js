// 加载vue模块
import Vue from "vue";
// 加载vue-router
import Router from "vue-router";
// 解决3.0+ 版本以上的路由插件多次点击导航报错的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};

// 导入全局vue路由
const _import = file => () => import("@/pages/" + file + ".vue");
// 使用Router
Vue.use(Router);

// 配置路由
export const constantRouterMap = [
  { path: "/login", component: _import("Login/index") },
  { path: "/404", component: _import("Error/404") },
  { path: "/", component: _import("Home/index") },
  { path: "/list", component: _import("List/index") }
];

// 创建router
export default new Router({
  mode: "hash",
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (!from.meta.noCache) {
        from.meta.savedPosition =
          document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageYoffset;
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  },
  routes: constantRouterMap
});
