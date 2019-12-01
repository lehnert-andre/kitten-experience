import {getScreenWidth} from "~/shared-functions/runtime-info";
import KittenMockDataProvider from "./provider/kitten-mock-data.provider";
import {getLocalStorageItem, setLocalStorageItem} from "../../shared-functions/web-storage";
import {Kitten} from "./types/kitten.class";

class KittenService {
  #LOGGER;
  #store;

  #kittenProvider;

  constructor({$store, $axios, $LOGGER}) {
    this.#LOGGER = $LOGGER.getLogger(this);

    this.#LOGGER.info('Initiated');

    this.#store = $store;

    // select data provider
    this._selectKittenProvider($LOGGER);
  }

  async nextKitten() {
    await this._loadNextKitten();

    return await this.#store.getters['KITTEN/getFirstIncomingKitten'];
  }

  async loveKitten(kitten) {
    if (!kitten.rating) {
      this._rateKitten(Kitten.lovedKitten(kitten.id, kitten.imageUrl));
    } else {
      throw new Error(`An rated kitten (${kitten.rating}) with id ${kitten.id} could not re-rated.`)
    }
  }

  async hateKitten(kitten) {
    if (!kitten.rating) {
      this._rateKitten(Kitten.hatedKitten(kitten.id, kitten.imageUrl));
    } else {
      throw new Error(`An rated kitten (${kitten.rating}) with id ${kitten.id} could not re-rated.`)
    }
  }

  _selectKittenProvider($LOGGER) {
    const appMode = this.#store.getters['getAppMode'];
    this.#LOGGER.info('Choosing kitten provider for app mode = ', appMode);

    if (appMode === 'STANDALONE') {
      this.#kittenProvider = new KittenMockDataProvider({$LOGGER});
    }
  }

  async _rateKitten(kitten) {
    await this._addKittenToOutgoingQueue(kitten);
    await this._removeKittenFromIncomingQueue();

    const numberOfKitten = this.#store.getters['KITTEN/getOutgoingRequestSize'];


    if (!this.#store.getters['KITTEN/isOutgoingQueueInitialized']) {
      // try to load kitten from local storage before requesting new ones
      const persistedKittenList = this._getPersistedOutgoingKitten();
      if (persistedKittenList.length !== 0) {
        this.#LOGGER.info(`Load outgoing kitten list with ${persistedKittenList.length} items from local storage`, persistedKittenList);
        await this.#store.dispatch('KITTEN/ADD_KITTEN_TO_OUTGOING_QUEUE', persistedKittenList);
      }

      await this.#store.dispatch('KITTEN/INITIALIZE_OUTGOING_QUEUE');
    }

    if (!this.#store.getters['KITTEN/isOutgoingQueueLoading']) {
      await this.#store.dispatch('APP_UPDATING');
      await this.#store.dispatch('KITTEN/SET_OUTGOING_QUEUE_LOADING_STATE', true);

      this.#LOGGER.info(`Send rated kitten list with ${numberOfKitten} items to kitten provider`);

      let ratedKittenList = await this.#store.getters['KITTEN/getOutgoingKitten'];
      ratedKittenList = ratedKittenList.slice(-numberOfKitten); // first x elements of an array

      await this.#kittenProvider.sendRatedKitten(ratedKittenList);

      await this._removeKittenFromOutgoingQueue(numberOfKitten);

      await this.#store.dispatch('KITTEN/SET_OUTGOING_QUEUE_LOADING_STATE', false);
      await this.#store.dispatch('APP_ONLINE');

      //this.releaseOutgoingKittenQueue(numberOfKitten);
    }
  }

  async _addKittenToOutgoingQueue(kitten) {
    await this.#store.dispatch('KITTEN/ADD_KITTEN_TO_OUTGOING_QUEUE', kitten);
    this._persistOutgoingKitten(kitten);
  }

  async _removeKittenFromOutgoingQueue(numberOfKitten) {
    await this.#store.dispatch('KITTEN/REMOVE_FIRST_KITTEN_FROM_OUTGOING_QUEUE', numberOfKitten);
    this._removeFirstPersistedOutgoingKitten(numberOfKitten);
  }

  async _addKittenToIncomingQueue(kitten) {
    await this.#store.dispatch('KITTEN/ADD_KITTEN_TO_INCOMING_QUEUE', kitten);
    this._persistIncomingKitten(kitten);
  }

  async _removeKittenFromIncomingQueue() {
    await this.#store.dispatch('KITTEN/REMOVE_FIRST_KITTEN_FROM_INCOMING_QUEUE');
    this._removeFirstPersistedIncomingKitten();
  }


  async _loadNextKitten() {
    const width = getScreenWidth();
    const numberOfKitten = this.#store.getters['KITTEN/getIncomingRequestSize'];


    if (!this.#store.getters['KITTEN/isIncomingQueueInitialized']) {
      // try to load kitten from local storage before requesting new ones
      const persistedKittenList = this._getPersistedIncomingKitten();
      if (persistedKittenList.length !== 0) {
        this.#LOGGER.info(`Load kitten list with ${persistedKittenList.length} items from local storage`, persistedKittenList);
        await this.#store.dispatch('KITTEN/ADD_KITTEN_TO_INCOMING_QUEUE', persistedKittenList);
      }

      await this.#store.dispatch('KITTEN/INITIALIZE_INCOMING_QUEUE');
    }

    if (!this.#store.getters['KITTEN/isIncomingQueueFilled'] && !this.#store.getters['KITTEN/isIncomingQueueLoading']) {
      try {

        await this.#store.dispatch('APP_UPDATING');
        await this.#store.dispatch('KITTEN/SET_INCOMING_QUEUE_LOADING_STATE', true);

        this.#LOGGER.info(`Request kitten list with ${numberOfKitten} items from kitten provider`);
        let kittenList = await this.#kittenProvider.requestNextKitten(numberOfKitten, width);
        this._addKittenToIncomingQueue(kittenList);

        await this.#store.dispatch('KITTEN/SET_INCOMING_QUEUE_LOADING_STATE', false);
        await this.#store.dispatch('APP_ONLINE');
      } catch (e) {
        this.#LOGGER.warn('Failed to fill incoming kitten queue.', e);
        await this.#store.dispatch('APP_OFFLINE');
      }

      this.fillIncomingKittenQueue(numberOfKitten, width);
    }
  }


  async fillIncomingKittenQueue(numberOfKitten, width) {
    try {
      if (!this.#store.getters['KITTEN/isIncomingQueueLoading']) {
        await this.#store.dispatch('APP_UPDATING');
        await this.#store.dispatch('KITTEN/SET_INCOMING_QUEUE_LOADING_STATE', true);

        while (!this.#store.getters['KITTEN/isIncomingQueueFilled']) {

          this.#LOGGER.info(`Request kitten list with ${numberOfKitten} items from kitten provider`);

          let kittenList = await this.#kittenProvider.requestNextKitten(numberOfKitten, width);
          await this._addKittenToIncomingQueue(kittenList);
        }

        await this.#store.dispatch('KITTEN/SET_INCOMING_QUEUE_LOADING_STATE', false);
        await this.#store.dispatch('APP_ONLINE');
      }
    } catch (e) {
      this.#LOGGER.warn('Failed to fill incoming kitten queue.', e);
      await this.#store.dispatch('APP_OFFLINE');
    }
  }

  _persistIncomingKitten(newKitten) {
    try {
      const localStorageItem = JSON.parse(getLocalStorageItem('incomingKitten', '[]'));

      if (newKitten instanceof Array) {
        newKitten.forEach(kitten => {
          localStorageItem.push(kitten.toJSON());
        });
      } else {
        localStorageItem.push(newKitten.toJSON());
      }

      setLocalStorageItem('incomingKitten', JSON.stringify(localStorageItem))
    } catch (e) {
      this.#LOGGER.error(`Failed to persist kitten`, e);
    }
  }

  _removeFirstPersistedIncomingKitten() {
    try {
      let localStorageItem = JSON.parse(getLocalStorageItem('incomingKitten', '[]'));
      localStorageItem.splice(0, 1);

      setLocalStorageItem('incomingKitten', JSON.stringify(localStorageItem))
    } catch (e) {
      this.#LOGGER.error(`Failed to persist kitten`, e);
    }
  }

  _getPersistedIncomingKitten() {
    try {
      return JSON.parse(getLocalStorageItem('incomingKitten', '[]'));
    } catch (e) {
      this.#LOGGER.error(`Failed to access persisted kitten`, e);
    }
  }

  _persistOutgoingKitten(newKitten) {
    try {
      const localStorageItem = JSON.parse(getLocalStorageItem('outgoingKitten', '[]'));

      if (newKitten instanceof Array) {
        newKitten.forEach(kitten => {
          localStorageItem.push(kitten.toJSON());
        });
      } else {
        localStorageItem.push(newKitten.toJSON());
      }

      setLocalStorageItem('outgoingKitten', JSON.stringify(localStorageItem))
    } catch (e) {
      this.#LOGGER.error(`Failed to persist kitten`, e);
    }
  }

  _removeFirstPersistedOutgoingKitten(numberOfKitten) {
    try {
      const localStorageItem = JSON.parse(getLocalStorageItem('outgoingKitten', '[]'));
      localStorageItem.splice(0, numberOfKitten);

      setLocalStorageItem('outgoingKitten', JSON.stringify(localStorageItem))
    } catch (e) {
      this.#LOGGER.error(`Failed to persist kitten`, e);
    }
  }

  _getPersistedOutgoingKitten() {
    try {
      return JSON.parse(getLocalStorageItem('outgoingKitten', '[]'));
    } catch (e) {
      this.#LOGGER.error(`Failed to access persisted kitten`, e);
    }
  }
}

export default KittenService;
