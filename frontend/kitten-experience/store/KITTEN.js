export const state = () => ({
  currentKitten: undefined,
  kittenRanking: []
});

export const actions = {
  async NEXT_KITTEN ({ commit, rootGetters }) {
    const url = `${rootGetters.getKittenBackendUrl}round/new`;
    this.$LOGGER.info('STORE/KITTEN/NEXT_KITTEN', 'Call ' + url );

    let {data} = await this.$axios.get(url);

    this.$LOGGER.info('STORE/KITTEN/NEXT_KITTEN', 'Received response from ' + url + ': ' + JSON.stringify(data));

    commit('nextKitten', data);
  },
  async LOVE_KITTEN ({ getters, dispatch, rootGetters }) {
    const url = `${rootGetters.getKittenBackendUrl}round/result`;
    const currentKitten = getters.getCurrentKitten;

    let {data} = await this.$axios.post(url, { kittenId: currentKitten.kittenId, ratingResult: 'LOVE' });
    this.$LOGGER.info('STORE/KITTEN/LOVE_KITTEN', 'Received response from ' + url + ': ' + JSON.stringify(data));

    dispatch('NEXT_KITTEN');
    dispatch('REFRESH_RANKING');
  },
  async HATE_KITTEN ({ getters, dispatch, rootGetters }) {
    const url = `${rootGetters.getKittenBackendUrl}round/result`;
    const currentKitten = getters.getCurrentKitten;

    let {data} = await this.$axios.post(url, { kittenId: currentKitten.kittenId, ratingResult: 'HATE' });
    this.$LOGGER.info('STORE/KITTEN/HATE_KITTEN', 'Received response from ' + url + ': ' + JSON.stringify(data));

    dispatch('NEXT_KITTEN');
    dispatch('REFRESH_RANKING');
  },
  async REFRESH_RANKING ({ commit, rootGetters }) {
    const url = `${rootGetters.getKittenBackendUrl}contenders`;
    let {data} = await this.$axios.get(url);

    this.$LOGGER.info('STORE/KITTEN/REFRESH_RANKING', 'Received response from ' + url + ': ' + JSON.stringify(data));

    commit('refreshRanking', data);
  },
};

export const mutations = {
  nextKitten (state, nextKitten) {
    state.currentKitten = nextKitten;
  },
  refreshRanking (state, ranking) {
    state.kittenRanking = ranking;
  },
};

export const getters = {
  getCurrentKitten: state => {
    return state.currentKitten;
  },
  getKittenRanking: state => {
    return state.kittenRanking;
  },
  getTop5: state => {
    return state.kittenRanking.slice(0, 5);
  }
};
