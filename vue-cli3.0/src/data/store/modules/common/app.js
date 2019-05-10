import Cookies from "js-cookie";

const app = {
  state: {
    sidebar: {
      // 侧边栏展开收起
      opened: !+Cookies.get("sidebarStatus")
    },
    // 当前语言
    language: Cookies.get("language") || "zh",
    // 当前响应式模式
    responsiveLayout: {
      // 终端类型 pc、ipad、mobile
      clientType: "pc"
    }
  },
  mutations: {
    // toggle 侧边栏展开收起状态
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set("sidebarStatus", 1);
      } else {
        Cookies.set("sidebarStatus", 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    // 设置侧边栏展开收起状态
    SET_SIDEBAR: (state, status) => {
      Cookies.set("sidebarStatus", status);
      state.sidebar.opened = status;
    },
    // 设置语言
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      Cookies.set("language", language);
    },
    // 设置终端类型
    SET_CLIENTTYPE: (state, type) => {
      state.responsiveLayout.clientType = type;
    }
  },
  actions: {
    // toggle 侧边栏展开收起状态
    ToggleSideBar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
    // 设置侧边栏展开收起状态
    SetSideBar({ commit }, status) {
      commit("SET_SIDEBAR", status);
    },
    // 设置语言
    SetLanguage({ commit }, language) {
      commit("SET_LANGUAGE", language);
    },
    // 设置终端类型
    SetClientType({ commit }, type) {
      commit("SET_CLIENTTYPE", type);
    }
  }
};

export default app;
