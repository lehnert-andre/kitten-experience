export const state = () => ({
  navigationDrawer: {
    show: false,
    clipped: true,
    miniVariant: false,
  },
  // read only
  routes: [
    {
      icon: 'mdi-apps',
      title: 'Welcome',
      to: '/'
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire',
      to: '/inspire'
    }
  ],
});

export const actions = {
  async SHOW_NAVIGATION_DRAWER ({ commit }) {
    this.$LOGGER.info('STORE/navigation', 'showNavigationDrawer');

    commit('showNavigationDrawer');
  },
  async HIDE_NAVIGATION_DRAWER ({ commit }) {
    this.$LOGGER.info('STORE/navigation', 'hideNavigationDrawer');

    commit('hideNavigationDrawer');
  },
  async TOGGLE_NAVIGATION_DRAWER ({ commit, getters }) {
    if (getters.isNavigationDrawerVisible) {
      commit('hideNavigationDrawer');
    } else {
      commit('showNavigationDrawer');
    }
  },
  async MINIFY_NAVIGATION_DRAWER ({ commit }) {
    commit('minifyNavigationDrawer');
  },
  async EXPAND_NAVIGATION_DRAWER ({ commit }) {
    commit('expandNavigationDrawer');
  },
};

export const mutations = {
  showNavigationDrawer (state) {
    state.navigationDrawer.show = true;
  },
  hideNavigationDrawer (state) {
    state.navigationDrawer.show = false;
  },
  minifyNavigationDrawer (state) {
    state.navigationDrawer.miniVariant = true;
  },
  expandNavigationDrawer (state) {
    state.navigationDrawer.miniVariant = false;
  }
};

export const getters = {
  isNavigationDrawerVisible: state => {
    return state.navigationDrawer.show;
  },
  isNavigationDrawerClipped: state => {
    return state.navigationDrawer.clipped;
  },
  isNavigationDrawerMinified: state => {
    return state.navigationDrawer.miniVariant;
  },
  getRoutes: state => {
    return state.routes;
  }
};
