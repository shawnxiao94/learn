import store from 'dataB/store'
import { setStorage, removeStorage } from '@/common/utils/auth.js'
import * as constains from './constants'
/**
 * @see 面包屑
 */
// 新增页面缓存数组
const setRouteCache = route => {
  store.dispatch('AddCachedViews', route)
  route.meta.noCache = false //-----------
}
// 删减页面缓存数组
const clearRouteCache = route => {
  store.dispatch('DelCachedViews', route)
  route.meta.noCache = true
}
// 设置面包屑到本地存储
const setCrumbs = state => {
  if (!state.routerCrumbs.length) {
    removeStorage(constains.ROUTERCRUMBS)
    return
  }
  let _routerCrumbs = state.routerCrumbs.map(item => {
    return {
      fullPath: item.fullPath,
      hash: item.hash,
      meta: item.meta,
      name: item.name,
      params: item.params,
      path: item.path,
      query: item.query
    }
  })
  setStorage(constains.ROUTERCRUMBS, _routerCrumbs)
}

const crumbs = {
  state: {
    // 存储面包屑路由
    routerCrumbs: []
  },
  mutations: {
    // 添加面包屑路由
    ADD_ROUTER_CRUMBS: (state, route) => {
      state.routerCrumbs.push(route)
      setRouteCache(route)
      // 面包屑数组改变则更新本地存储数据
      setCrumbs(state)
    },
    // 删减面包屑路由
    MOVE_TO_ROUTER_CRUMBS: (state, route) => {
      let _index =
        state.routerCrumbs.findIndex(item => {
          return item.name === route.name
        }) + 1
      state.routerCrumbs.slice(_index).forEach(_route => {
        clearRouteCache(_route)
      })
      state.routerCrumbs = state.routerCrumbs.slice(0, _index)
      setCrumbs(state)
    },
    // 清空面包屑路由
    DEL_ROUTER_CRUMBS: state => {
      state.routerCrumbs.forEach(_route => {
        clearRouteCache(_route)
      })
      state.routerCrumbs = []
      setCrumbs(state)
    },
    // 赋值
    SET_ROUTER_CRUMBS: (state, _routerCrumbs) => {
      state.routerCrumbs = _routerCrumbs
    }
  },
  actions: {
    // 添加面包屑路由
    AddRouterCrumbs({ commit }, route) {
      commit('ADD_ROUTER_CRUMBS', route)
    },
    // 移动到指定路由面包屑
    MoveToRouterCrumbs({ commit }, route) {
      commit('MOVE_TO_ROUTER_CRUMBS', route)
    },
    // 清空路由面包屑
    DelRouterCrumbs({ commit }) {
      commit('DEL_ROUTER_CRUMBS')
    },
    SetRouterCrumbs({ commit }, _routerCrumbs) {
      commit('SET_ROUTER_CRUMBS', _routerCrumbs)
    }
  }
}
export default crumbs
