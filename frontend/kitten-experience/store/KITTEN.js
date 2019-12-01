import {getLocalStorageItem, setLocalStorageItem} from "../shared-functions/web-storage";

export const state = () => ({
  config: {
    incomingRequestSize: 10,
    minIncomingQueueLength: 20,
    incomingQueueInitialized: false,
    incomingQueueLoading: false,
    outgoingRequestSize: 10,
    maxOutgoingQueueLength: 1,
    outgoingQueueInitialized: false,
    outgoingQueueLoading: false,
  },
  incomingKitten: [],
  outgoingKitten: []
});


export const actions = {
  async ADD_KITTEN_TO_INCOMING_QUEUE({commit, getters}, newKitten) {
    // add to runtime storage
    if (newKitten instanceof Array) {
      newKitten.forEach(kitten => {
        commit('enqueueIncomingKitten', kitten);

      });
    } else {
      commit('enqueueIncomingKitten', newKitten);
    }
    },
  async REMOVE_FIRST_KITTEN_FROM_INCOMING_QUEUE({commit}) {
    commit('dequeueFirstIncomingKitten');
  },
  async ADD_KITTEN_TO_OUTGOING_QUEUE({commit}, newKitten) {
    // add to runtime storage
    if (newKitten instanceof Array) {
      newKitten.forEach(kitten => {
        commit('enqueueOutgoingKitten', kitten);

      });
    } else {
      commit('enqueueOutgoingKitten', newKitten);
    }
  },
  async REMOVE_FIRST_KITTEN_FROM_OUTGOING_QUEUE({commit}, numberOfFirstElements = 1) {
    commit('dequeueFirstOutgoingKitten', numberOfFirstElements);
  },
  async INITIALIZE_INCOMING_QUEUE({commit}) {
    commit('initializeIncomingQueue');
  },
  async INITIALIZE_OUTGOING_QUEUE({commit}) {
    commit('initializeOutgoingQueue');
  },
  async SET_INCOMING_QUEUE_LOADING_STATE({commit}, isLoading) {
    commit('setIncomingQueueLoading', isLoading);
  },
  async SET_OUTGOING_QUEUE_LOADING_STATE({commit}, isLoading) {
    commit('setOutgoingQueueLoading', isLoading);
  },
};

export const mutations = {
  enqueueIncomingKitten(state, newKitten) {
    state.incomingKitten.push(newKitten);
  },
  dequeueFirstIncomingKitten(state) {
    this.$LOGGER.info('STORE/KITTEN/dequeueFirstIncomingKitten',
      `Remove first kitten from queue`);

    state.incomingKitten.splice(0, 1); // remove kitten from array
  },
  enqueueOutgoingKitten(state, kitten) {
    this.$LOGGER.info('STORE/KITTEN/enqueueOutgoingKitten',
      `Add rated kitten to the outgoind queue`, kitten);

    state.outgoingKitten.push(kitten);
  },
  dequeueFirstOutgoingKitten(state, numberOfFirstElements) {
    this.$LOGGER.info('STORE/KITTEN/dequeueFirstOutgoingKitten',
      `Remove first ${numberOfFirstElements} kitten from outgoing queue`);

    state.outgoingKitten.splice(0, numberOfFirstElements); // remove kitten from array
  },
  initializeIncomingQueue(state) {
    state.config.incomingQueueInitialized = true;
  },
  initializeOutgoingQueue(state) {
    state.config.outgoingQueueInitialized = true;
  },
  setIncomingQueueLoading(state, isLoading) {
    state.config.incomingQueueLoading = isLoading;
  },
  setOutgoingQueueLoading(state, isLoading) {
    state.config.outgoingQueueLoading = isLoading;
  }
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
  isIncomingQueueInitialized: state => {
    return state.config.incomingQueueInitialized;
  },
  isIncomingQueueLoading: state => {
    return state.config.incomingQueueLoading;
  },
  getOutgoingKitten: state => {
    return state.outgoingKitten;
  },
  getMaxOutgoingQueueLength: state => {
    return state.config.maxOutgoingQueueLength;
  },
  isOutgoingQueueFilled: state => {
    return state.outgoingKitten.length >= state.config.maxOutgoingQueueLength;
  },
  getOutgoingRequestSize: state => {
    return state.config.outgoingRequestSize;
  },
  isOutgoingQueueInitialized: state => {
    return state.config.outgoingQueueInitialized;
  },
  isOutgoingQueueLoading: state => {
    return state.config.outgoingQueueLoading;
  },
};
