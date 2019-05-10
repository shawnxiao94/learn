const errorLog = {
  state: {
    index: 1,
    logs: []
  },
  mutations: {
    ADD_ERROR_LOG: (state, log) => {
      if (state.logs.length === 10) {
        state.logs.pop();
      }
      log.index = state.index++;
      state.logs.unshift(log);
    }
  },
  actions: {
    AddErrorLog({ commit }, log) {
      commit("ADD_ERROR_LOG", log);
    }
  }
};

export default errorLog;
