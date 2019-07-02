import Cookies from 'js-cookie'
import * as constants from './constants'
const app = {
  state: {
    sidebar: {
      // 侧边栏展开收起
      opened: Cookies.get(constants.SIDEBARSTATUS)
        ? !!+Cookies.get(constants.SIDEBARSTATUS)
        : true,
      withoutAnimation: false
    },
    // 当前语言
    language: Cookies.get(constants.LANGUAGE) || 'zh',
    device: 'desktop',
    size: Cookies.get(constants.SIZE) || 'medium'
  },
  mutations: {
    // toggle 侧边栏展开收起状态
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set(constants.SIDEBARSTATUS, 1)
      } else {
        Cookies.set(constants.SIDEBARSTATUS, 0)
      }
    },
    // 设置侧边栏展开收起状态
    SET_SIDEBAR: (state, status) => {
      Cookies.set(constants.SIDEBARSTATUS, status ? 1 : 0)
      state.sidebar.opened = status
    },
    // 设置语言
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set(constants.LANGUAGE, language)
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set(constants.SIDEBARSTATUS, 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set(constants.SIZE, size)
    }
  },
  actions: {
    // toggle 侧边栏展开收起状态
    ToggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    // 设置侧边栏展开收起状态
    SetSideBar({ commit }, status) {
      commit('SET_SIDEBAR', status)
    },
    // 设置语言
    SetLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    // 关闭sideBar
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    // 触发改变系统类型
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    // 设置UI尺寸
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    }
  }
}

export default app
