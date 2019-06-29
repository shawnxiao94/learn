// 加载vue模块
import Vue from 'vue'
// 加载vue-router
import Router from 'vue-router'
// 导入全局vue路由
const _import = file => () => import('@/modules/Front/pages/' + file + '.vue')
// 使用Router
Vue.use(Router)

// 配置路由
export const constantRouterMap = [
  { path: '/404', component: _import('Error/404') }
]

// 全局路由定义
export const asyncRouterMap = [
  {
    path: '',
    component: _import('Layout/index'),
    redirect: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      icon: 'layout-aside-home',
      sort: '',
      noCache: true,
      hidden: false,
      index: 0,
      type: 'front'
    },
    children: [
      {
        path: 'home',
        name: 'HomeIndex',
        component: _import('Home/index'),
        meta: {
          title: '前台首页',
          icon: '',
          sort: '',
          noCache: true,
          hidden: false,
          index: 1,
          type: 'front',
          permissions: [{ name: '查询', code: 'HomeIndex_search' }]
        }
      }
    ]
  }
]

// 创建router
export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (!from.meta.noCache) {
        from.meta.savedPosition =
          document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageYoffset
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: constantRouterMap.concat(asyncRouterMap)
})
