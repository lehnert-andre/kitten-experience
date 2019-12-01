import {Kitten} from "./types/kitten.class";
import {getScreenWidth} from "~/shared-functions/runtime-info";
import {UriBuilder} from "~/shared-functions/uri-builder";
import KittenRestClientProvider from "./provider/kitten-rest-client.provider";
import KittenStandaloneProvider from "./provider/kitten-standalone.provider";

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

  }

  _selectKittenProvider($LOGGER) {
    const appMode = this.#store.getters['getAppMode'];
    this.#LOGGER.info('Choosing kitten provider for app mode = ', appMode);

    if (appMode === 'STANDALONE') {
      this.#kittenProvider = new KittenStandaloneProvider({$LOGGER});
    }
  }

  async _loadNextKitten() {
    const width = getScreenWidth();
    const numberOfKitten = this.#store.getters['KITTEN/getIncomingRequestSize'];

    while(!this.#store.getters['KITTEN/isIncomingQueueFilled']) {
      let kittenList = await this.#kittenProvider.requestNextKitten(numberOfKitten, width);
      await this.#store.dispatch('KITTEN/ADD_KITTEN_TO_INCOMING_QUEUE', kittenList);
    }
  }
}

export default KittenService;
