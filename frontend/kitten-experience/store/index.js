import {UriBuilder} from "../shared-functions/uri-builder";

export const state = () => ({
  app: {
    name: '',
    version: '',
    state: 'ONLINE',
    mode: 'STANDALONE',
    environment: 'DEVELOPMENT',
    baseUrl: '',
    kittenBackendUrl: ''
  }
});

export const actions = {
  // run on server side to transfer a state to the client
  async nuxtServerInit({commit}, {env}) {
    try {

      const appName = (process.env.npm_package_name || 'app');
      this.$LOGGER.info('STORE/nuxtServerInit', 'Define app.name = ', appName);
      commit('setAppName', appName);

      const appVersion = (process.env.npm_package_version || '-');
      this.$LOGGER.info('STORE/nuxtServerInit', 'Define app.version = ', appVersion);
      commit('setAppVersion', appVersion);

      const environment = (process.env.NODE_ENV || 'development').toUpperCase();
      this.$LOGGER.info('STORE/nuxtServerInit', 'Define app.environment = ', environment);
      commit('setAppEnvironment', environment);

      const mode = (env.APP_MODE).toUpperCase();
      this.$LOGGER.info('STORE/nuxtServerInit', 'Define app.mode = ', mode);
      commit('setAppMode', mode);

      const baseUrl = (env.BASE_URL).toLowerCase();
      this.$LOGGER.info('STORE/nuxtServerInit', 'Define app.baseUrl = ', baseUrl);
      commit('setBaseUrl', baseUrl);

      const kittenBackendBaseUrl = (env.KITTEN_BACKEND_BASE_URL).toLowerCase();
      const kittenBackendBasePath = (env.KITTEN_BACKEND_BASE_PATH).toLowerCase();
      const kittenBackendUrl = UriBuilder.fromHost(kittenBackendBaseUrl).path(kittenBackendBasePath).toString();
      this.$LOGGER.info('STORE/nuxtServerInit', 'Define app.kittenBackendUrl = ', kittenBackendUrl);
      commit('setKittenBackendUrl', kittenBackendUrl);

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
  setAppName (state, appName) {
    state.app.name = appName;
  },
  setAppVersion (state, appVersion) {
    state.app.version = appVersion;
  },
  setAppState (state, appState) {
    state.app.state = appState;
  },
  setAppMode (state, appMode) {
    state.app.mode = appMode;
  },
  setAppEnvironment (state, appEnvironment) {
    state.app.environment = appEnvironment;
  },
  setBaseUrl (state, appBaseUrl) {
    state.app.baseUrl = appBaseUrl;
  },
  setKittenBackendUrl (state, kittenBackendUrl) {
    state.app.kittenBackendUrl = kittenBackendUrl;
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
  },
  getAppInfo: state => {
    return state.app;
  }
};
