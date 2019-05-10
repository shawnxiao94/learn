const tagsView = {
  state: {
    cachedViews: []
  },
  mutations: {
    ADD_CACHED_VIEWS: (state, view) => {
      state.cachedViews.push(view.name);
    },
    DEL_CACHED_VIEWS: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    }
  },
  actions: {
    AddCachedViews({ commit }, view) {
      commit("ADD_CACHED_VIEWS", view);
    },
    DelCachedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit("DEL_CACHED_VIEWS", view);
        resolve([...state.cachedViews]);
      });
    }
  }
};

export default tagsView;
