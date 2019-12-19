const tagsView = {
  state: {
    visitedViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) {
        return;
      }
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.title || "no-name"
      });
    },
    DEL_VISITED_VIEWS: (state, name) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.name === name) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, name) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.name === name) {
          state.visitedViews = state.visitedViews.slice(i, i + 1);
          break;
        }
      }
    },
    DEL_ALL_VIEWS: (state, name) => {
      state.visitedViews = state.visitedViews.filter(item => {
        return item.name === name;
      });
    }
  },
  actions: {
    addVisitedViews ({ commit }, view) {
      commit("ADD_VISITED_VIEWS", view);
    },
    delVisitedViews ({ commit, state }, name) {
      return new Promise(resolve => {
        commit("DEL_VISITED_VIEWS", name);
        resolve([...state.visitedViews]);
      });
    },
    delOthersViews ({ commit, state }, name) {
      return new Promise(resolve => {
        commit("DEL_OTHERS_VIEWS", name);
        resolve([...state.visitedViews]);
      });
    },
    delAllViews ({ commit, state }, name) {
      return new Promise(resolve => {
        commit("DEL_ALL_VIEWS", name);
        resolve([...state.visitedViews]);
      });
    }
  }
};
export default tagsView;
