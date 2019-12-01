import KittenProvider from "./kitten.provider";

class KittenRestClientProvider extends KittenProvider{
  #store;
  #httpClient;

  constructor({$store, $axios, $LOGGER}) {
    super({$store, $axios, $LOGGER});

    this.#store = $store;
    this.#httpClient = $axios;
  }

  requestNextKitten() {
    //TODO REST call
  }

}

export default KittenRestClientProvider;
