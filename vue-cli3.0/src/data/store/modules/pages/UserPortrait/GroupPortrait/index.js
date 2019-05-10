const groupPortrait = {
  state: {
    // 上汽用户业务分布点击时需要带着的数据
    groupPortraitSearchForm: {}
  },
  mutations: {
    ADD_LINK_DATA: (state, obj) => {
      state.groupPortraitSearchForm = obj;
    },
    CLEAR_LINK_DATA: state => {
      state.groupPortraitSearchForm = {};
    }
  },
  actions: {
    AddLinkData({ commit }, obj) {
      commit("ADD_LINK_DATA", obj);
    },
    ClearLinkData({ commit }) {
      commit("CLEAR_LINK_DATA");
    }
  }
};
export default groupPortrait;
