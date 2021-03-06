import KittenProvider from "./kitten.provider";
import {Kitten} from "../types/kitten.class";
import {UriBuilder} from "~/shared-functions/uri-builder";
import {randomIntFromInterval} from "../../../shared-functions/math-utils";

const MAX_KITTEN_IMAGES = 16;

class KittenMockDataProvider extends KittenProvider{

  constructor({$LOGGER}) {
    super({$LOGGER});
  }


  async requestNextKitten(numberOfKitten, imageSize) {
    await new Promise(resolve => setTimeout(() => resolve(), 5));

      this.LOGGER.info(`requestNextKitten: Request with numberOfKitten = ${numberOfKitten} and imageSize ${imageSize}x${imageSize} px`);

      const kittenResponse = [];

      for(let i = 1; i <= numberOfKitten; i++) {

        // generate random kitten image ids
        const randomImageId = randomIntFromInterval(1, MAX_KITTEN_IMAGES);

        const url = UriBuilder.fromHost('http://placekitten.com/')
          .path(Math.min(imageSize, 680))
          .path(Math.min(imageSize, 680))
          .queryParam('image', randomImageId)
          .toString();

        const kitten = Kitten.unratedKitten(i, url);

        kittenResponse.push(kitten);
      }

      this.LOGGER.info(`requestNextKitten: Response with `, kittenResponse);


      return kittenResponse;

  }

  async sendRatedKitten(kittenList) {
    await new Promise(resolve => setTimeout(() => resolve(), 5));

    this.LOGGER.info(`sendRatedKitten: Send rated kitten list with ${kittenList.length} enties to the backend.`, kittenList);
  }

}

export default KittenMockDataProvider;
