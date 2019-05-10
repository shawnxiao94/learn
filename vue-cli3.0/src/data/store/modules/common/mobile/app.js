const app = {
  state: {
    mobileMenu: {
      // 侧边栏展开收起
      opened: false
    }
  },
  mutations: {
    // toggle 侧边栏展开收起状态
    TOGGLE_MOBILEMENU: state => {
      state.mobileMenu.opened = !state.mobileMenu.opened;
    },
    // 设置侧边栏展开收起状态
    SET_MOBILEMENU: (state, status) => {
      state.mobileMenu.opened = status;
    }
  },
  actions: {
    // toggle 侧边栏展开收起状态
    ToggleMobileMenu({ commit }) {
      commit("TOGGLE_MOBILEMENU");
    },
    // 设置侧边栏展开收起状态
    SetMobileMenu({ commit }, status) {
      commit("SET_MOBILEMENU", status);
    }
  }
};

export default app;
