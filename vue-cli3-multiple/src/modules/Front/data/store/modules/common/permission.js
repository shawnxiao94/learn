import { asyncRouterMap, constantRouterMap } from 'routerF'
// 如果有权限功能，则对路由过滤
import * as api from 'dataF/api/PermissionList'
import store from 'dataF/store'

import { filterRouters, filterPermission } from 'commonF/permission/check'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    // 导航菜单
    menuNavs: [],
    // 按钮权限
    btnPermissions: [],
    // 数据权限
    dataPermissionArr: [],
    // 缓存页面name数组
    cachedViews: []
  },
  mutations: {
    // 路由
    SET_ROUTERS(state, routers) {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    // 菜单
    SET_MENUNAVS(state, menuNavs) {
      state.menuNavs = menuNavs
    },
    // 按钮权限
    SET_BTNPERMISSIONS(state, btnPermissions) {
      state.btnPermissions = btnPermissions
    },
    // 数据权限
    SET_DATAPERMISSIONS(state, DataPermissionArr) {
      state.dataPermissionArr = DataPermissionArr
    },
    // 添加缓存
    ADD_CACHEDVIEWS(state, route) {
      if (
        state.cachedViews.length < 1 ||
        state.cachedViews.every(name => name !== route.name)
      ) {
        state.cachedViews.push(route.name)
      }
    },
    // 删减缓存
    DEL_CACHEDVIEWS(state, route) {
      let _index
      if (
        state.cachedViews.length &&
        state.cachedViews.some((name, index) => {
          if (name === route.name) {
            _index = index
            return true
          } else {
            return false
          }
        })
      ) {
        state.cachedViews.splice(_index, 1)
      }
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .getPermissionList({ sysId: store.getters.user.userInfo.sysId })
          .then(res => {
            let permissionObj = filterPermission(res.Result.data)
            // 页面权限集合
            let pageNameArr = permissionObj.routerNameArr
            // 数据权限集合
            let DataPermissionArr = permissionObj.dataPermissionArr
            // 按钮权限集合
            let btnNameArr = permissionObj.btnPessionArr
            // 权限过滤后的路由
            let _asyncRouterMap = filterRouters(
              asyncRouterMap,
              pageNameArr,
              btnNameArr
            )
            // let _asyncRouterMap = asyncRouterMap
            commit('SET_ROUTERS', _asyncRouterMap)
            // 菜单导航模式，1 => 顶部菜单 || 2 => 侧边菜单|| 3 => TAB菜单
            commit('SET_MENUNAVS', _asyncRouterMap)
            commit('SET_BTNPERMISSIONS', btnNameArr)
            if (DataPermissionArr.length > 1) {
              store.dispatch('SetSourceChannel', { name: '集团', code: '00' })
              DataPermissionArr.unshift({ name: '集团', code: '00' })
            } else {
              store.dispatch('SetSourceChannel', DataPermissionArr[0])
            }
            commit('SET_DATAPERMISSIONS', DataPermissionArr)
            resolve()
          })
          .catch(_ => {
            reject(_)
          })
      })
    },
    // 添加缓存
    AddCachedViews({ commit }, route) {
      commit('ADD_CACHEDVIEWS', route)
    },
    // 删减缓存缓存
    DelCachedViews({ commit }, route) {
      commit('DEL_CACHEDVIEWS', route)
    }
  }
}

export default permission
