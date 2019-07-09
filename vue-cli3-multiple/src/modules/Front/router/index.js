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
  { path: '/login', component: _import('Login/index') },
  { path: '/404', component: _import('Error/404') },
  { path: '', redirect: '/home' }
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
  routes: constantRouterMap
})

// 全局路由定义
export const asyncRouterMap = [
  {
    path: '/home',
    component: _import('Layout/index'),
    redirect: '/home/index',
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
        path: 'index',
        name: 'HomeIndex',
        component: _import('Home/index'),
        meta: {
          title: '首页',
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
  },
  {
    path: '/systemManage',
    component: _import('Layout/index'),
    name: 'SystemManage',
    redirect: '/systemManage/userManage',
    meta: {
      title: '系统管理',
      icon: 'layout-aside-system',
      sort: '',
      hidden: false,
      noCache: true
    },
    children: [
      {
        path: 'userManage',
        component: _import('SystemManage/UserManage/index'),
        name: 'SystemManageUserManage',
        meta: {
          title: '人员管理',
          icon: 'layout-aside-system',
          sort: '',
          hidden: false,
          noCache: true,
          permissions: [
            { name: '查询', code: 'SystemManageUserManage_search' },
            { name: '新增', code: 'SystemManageUserManage_add' },
            { name: '日志详情', code: 'SystemManageUserManage_detail' }
          ]
        }
      },
      {
        path: 'logManage',
        component: _import('SystemManage/LogManage/index'),
        name: 'SystemManageLogManage',
        meta: {
          title: '日志管理',
          icon: 'layout-aside-system',
          sort: '',
          hidden: false,
          noCache: true,
          permissions: [{ name: '查询', code: 'SystemManageLogManage_search' }]
        }
      },
      {
        path: 'roleManage',
        component: _import('SystemManage/RoleManage/index'),
        name: 'SystemManageRoleManage',
        meta: {
          title: '角色管理',
          icon: 'layout-aside-system',
          sort: '',
          hidden: false,
          noCache: true,
          permissions: [
            { name: '新增', code: 'SystemManageRoleManage_add' },
            { name: '编辑', code: 'SystemManageRoleManage_update' },
            { name: '删除', code: 'SystemManageRoleManage_del' }
          ]
        }
      },
      {
        path: 'settings',
        component: _import('SystemManage/Settings/index'),
        name: 'SystemManageSettings',
        meta: {
          title: '系统设置',
          icon: 'layout-aside-system',
          sort: '',
          hidden: false,
          noCache: true,
          permissions: []
        }
      }
    ]
  },
  { path: '*', redirect: '/404' }
]
