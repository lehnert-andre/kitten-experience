export const state = () => ({
  app: {
    state: 'ONLINE',
    mode: 'STANDALONE',
    environment: 'DEVELOPMENT'
  }
});

export const actions = {
  // run on server side to transfer a state to the client
  async nuxtServerInit({commit}, {env}) {
    try {

      const environment = (process.env.NODE_ENV || 'development').toUpperCase();
      this.$LOGGER.info('STORE/nuxtServerInit', 'Define app.environment = ', environment);
      commit('setAppEnvironment', environment);

      const mode = (env.APP_MODE).toUpperCase();
      this.$LOGGER.info('STORE/nuxtServerInit', 'Define app.mode = ', mode);
      commit('setAppMode', mode);

    } catch (e) {
      this.$LOGGER.error('STORE/nuxtServerInit', 'App configuration failed', e);
    }
  },


  async APP_OFFLINE ({ commit }) {
    commit('setAppState', 'OFFLINE');
  },
  async APP_ONLINE ({ commit }) {
    commit('setAppState', 'ONLINE');
  },
  async APP_UPDATING ({ commit }) {
    commit('setAppState', 'UPDATING');
  },
};

export const mutations = {
  setAppState (state, appState) {
    state.app.state = appState;
  },
  setAppMode (state, appMode) {
    state.app.mode = appMode;
  },
  setAppEnvironment (state, appEnvironment) {
    state.app.environment = appEnvironment;
  },
};

export const getters = {
  getAppState: state => {
    return state.app.state;
  },
  getAppMode: state => {
    return state.app.mode;
  },
  getAppEnvironment: state => {
    return state.app.environment;
  },
  isProduction: state => {
    return state.app.environment === 'PRODUCTION'
  }
};
