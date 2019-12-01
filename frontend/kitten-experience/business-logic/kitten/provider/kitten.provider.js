class KittenProvider {
  LOGGER;

  constructor({$LOGGER}) {
    this.LOGGER = $LOGGER.getLogger(this);

    this.LOGGER.info('Initiated');
  }
}

export default KittenProvider;
