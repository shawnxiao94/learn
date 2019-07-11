import { setCookie, getCookie } from 'common/utils/cookie'
import * as constants from './constants'
const app = {
  state: {
    sidebar: {
      // 侧边栏展开收起
      opened: !+getCookie(constants.SIDEBARSTATUS),
      withoutAnimation: false
    },
    // 当前语言
    language: getCookie(constants.LANGUAGE) || 'en',
    // 顶部导航是否固定定位
    topFixed: !+getCookie(constants.TOPFIXED),
    // 当前响应式模式
    responsiveLayout: {
      // 终端类型 pc、ipad、mobile
      clientType: getCookie(constants.CLIENTTYPE) || 'pc'
    },
    size: getCookie(constants.SIZE) || 'medium',
    // 是否显示全屏按钮
    fullScreen: !+getCookie(constants.FULLSCREEN),
    // 设置左上边是否显示折叠菜单功能按钮
    showHamburger: !+getCookie(constants.SHOWHAMBURGER),
    // 设置菜单导航模式，1 => 顶部菜单 || 2 => 侧边菜单|| 3 => TAB菜单
    menuMode: getCookie(constants.MENUMODE)
      ? ~~getCookie(constants.MENUMODE)
      : 3
  },
  mutations: {
    // toggle 侧边栏展开收起状态
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        setCookie(constants.SIDEBARSTATUS, 0)
      } else {
        setCookie(constants.SIDEBARSTATUS, 1)
      }
    },
    // 设置侧边栏展开收起状态
    SET_SIDEBAR: (state, status) => {
      setCookie(constants.SIDEBARSTATUS, status ? 0 : 1)
      state.sidebar.opened = status
    },
    // 设置语言
    SET_LANGUAGE: (state, language) => {
      state.language = language
      setCookie(constants.LANGUAGE, language)
    },
    // 设置顶部导航是否固定定位
    SET_TOPFIXED: (state, topFixed) => {
      setCookie(constants.TOPFIXED, topFixed ? 0 : 1)
      state.topFixed = topFixed
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      setCookie(constants.SIDEBARSTATUS, 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    // 设置终端类型
    SET_CLIENTTYPE: (state, type) => {
      state.responsiveLayout.clientType = type
    },
    SET_SIZE: (state, size) => {
      state.size = size
      setCookie(constants.SIZE, size)
    },
    // 设置是否显示全屏按钮
    SET_FULLSCREEN: state => {
      state.fullScreen = !state.fullScreen
      if (state.fullScreen) {
        setCookie(constants.FULLSCREEN, 0)
      } else {
        setCookie(constants.FULLSCREEN, 1)
      }
    },
    // 设置左上边是否显示折叠菜单功能按钮
    SET_HAMBURGER: state => {
      state.showHamburger = !state.showHamburger
      if (state.showHamburger) {
        setCookie(constants.SHOWHAMBURGER, 0)
      } else {
        setCookie(constants.SHOWHAMBURGER, 1)
      }
    },
    // 设置菜单导航模式
    SET_MENUMODE: (state, menuMode) => {
      state.menuMode = menuMode
      setCookie(constants.MENUMODE, menuMode)
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
    // 设置顶部导航是否固定定位
    SetTopfixed({ commit }, topFixed) {
      commit('SET_TOPFIXED', topFixed)
    },
    // 关闭sideBar
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    // 设置终端类型
    SetClientType({ commit }, type) {
      commit('SET_CLIENTTYPE', type)
    },
    // 设置UI尺寸
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    },
    // toggle 全屏按钮
    ToggleFullscreen({ commit }) {
      commit('SET_FULLSCREEN')
    },
    // toggle 设置左上边是否显示折叠菜单功能按钮
    ToggleHamburger({ commit }) {
      commit('SET_HAMBURGER')
    },
    // 设置菜单导航模式
    setMenuMode({ commit }, menuMode) {
      commit('SET_MENUMODE', menuMode)
    }
  }
}

export default app
