export const state = () => ({
  app: {
    state: 'online'
  }
});

export const actions = {
  // run on server side to transfer a state to the client
  async nuxtServerInit(store, {req}) {

  },

  async APP_OFFLINE ({ commit }) {
    commit('setAppState', 'offline');
  },
  async APP_ONLINE ({ commit }) {
    commit('setAppState', 'online');
  },
  async APP_UPDATING ({ commit }) {
    commit('setAppState', 'updating');
  },
};

export const mutations = {
  setAppState (state, appState) {
    state.app.state = appState;
  },

};

export const getters = {
  getAppState: state => {
    return state.app.state;
  }
};
