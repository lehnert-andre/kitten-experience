export const state = () => ({
  config: {
    incomingRequestSize: 10,
    minIncomingQueueLength: 20,
    outgoingRequestSize: 10,
    maxOutgoingQueueLength: 20
  },
  incomingKitten: [],
  outgoingKitten: []
});

export const actions = {
  async ADD_KITTEN_TO_INCOMING_QUEUE({commit}, kitten) {
    commit('enqueueIncomingKitten', kitten);
  },
  async REMOVE_FIRST_KITTEN_FROM_INCOMING_QUEUE({commit}) {
    commit('dequeueFirstIncomingKitten');
  },
  async ADD_KITTEN_TO_OUTGOING_QUEUE({commit}, kitten) {
    commit('enqueueOutgoingKitten', kitten);
  },
};

export const mutations = {
  enqueueIncomingKitten(state, newKitten) {
    if (newKitten instanceof Array) {
      newKitten.forEach(kitten => {
        state.incomingKitten.push(kitten);
      });
    } else {
      state.incomingKitten.push(newKitten);
    }
  },
  dequeueFirstIncomingKitten(state) {
    this.$LOGGER.info('STORE/KITTEN/dequeueFirstIncomingKitten',
      `Remove first kitten from queue`);

    state.incomingKitten.splice(0, 1); // remove kitten from array
  },
  enqueueOutgoingKitten(state, kitten) {
    state.outgoingKitten.push(kitten);
  },
};

export const getters = {
  getIncomingKitten: state => {
    return state.incomingKitten;
  },
  getFirstIncomingKitten: state => {
    return state.incomingKitten.length > 0 ? state.incomingKitten[0] : undefined;
  },
  getMinIncomingQueueLength: state => {
    return state.config.minIncomingQueueLength;
  },
  isIncomingQueueFilled: state => {
    return state.incomingKitten.length > state.config.minIncomingQueueLength;
  },
  getIncomingRequestSize: state => {
    return state.config.incomingRequestSize;
  },
  getMaxOutgoingQueueLength: state => {
    return state.config.maxOutgoingQueueLength;
  },
  isOutgoingQueueFilled: state => {
    return state.outgoingKitten.length >= state.config.maxOutgoingQueueLength;
  },
};
