/**
 * Kitten transfer object with a technical identifier and an image url.
 *
 * A kitten can be hated or loved.
 *
 * <p>
 * Usage:
 * <code>
 * const kitten = new Kitten(id, imageUrl)
 * kitten.rating === null -> true
 * </code>
 *
 * <p>
 * <code>
 * const unratedKitten = Kitten.unratedKitten(id, imageUrl);
 * unratedKitten.rating === null -> true
 * </code>
 *
 * <p>
 * <code>
 * const lovedKitten = Kitten.lovedKitten(id, imageUrl);
 * lovedKitten.rating === 'LOVE' -> true
 * </code>
 *
 * <p>
 * <code>
 * const hatedKitten = Kitten.hatedKitten(id, imageUrl);
 * hatedKitten.rating === 'HATE' -> true
 * </code>
 */
export class Kitten {

  #_imageUrl; // private field
  #_rating; // private field + read-only (no setter)

  // technical fields
  #_id;

  /**
   * New kitten instance without rating
   *
   * @param id technical id of the kitten
   * @param imageUrl of the kitten image
   * @param rating (optional) rating of the kitten
   */
  constructor(id, imageUrl, rating = null) {
    this.#_id = id; // private mandatory field
    this.#_imageUrl = imageUrl;
    this.#_rating = rating; // private optional field
  }

  /*
   * Static public methods
   */

  /**
   * Converts JSON to a class instance
   *
   * @param id json parameter
   * @param imageUrl json parameter
   * @param rating json parameter
   * @return {Kitten} instance
   */
  static fromJSON({ id, imageUrl, rating }) {
    return new Kitten(id, imageUrl, rating);
  }

  /**
   * Creates a new loved kitten
   *
   * rating === 'LOVE'
   *
   * @param id technical id of the kitten
   * @param imageUrl of the kitten image
   * @return {Kitten} instance
   */
  static unratedKitten(id, imageUrl) {
    return new Kitten(id, imageUrl);
  }

  /**
   * Creates a new loved kitten
   *
   * rating === 'LOVE'
   *
   * @param id technical id of the kitten
   * @param imageUrl of the kitten image
   * @return {Kitten} instance
   */
  static lovedKitten(id, imageUrl) {
    const kitten = new Kitten(id, imageUrl);
    kitten.loved();
    return kitten;
  }

  /**
   * Creates a new loved kitten
   *
   * rating === 'HATE'
   *
   * @param id technical id of the kitten
   * @param imageUrl of the kitten image
   * @return {Kitten} instance
   */
  static hatedKitten(id, imageUrl) {
    const kitten = new Kitten(id, imageUrl);
    kitten.hated();
    return kitten;
  }


  /*
   * Public Methods
   */

  /**
   * Defines the rating of the current kitten to 'LOVE'
   */
  loved() {
    this.#_rating = 'LOVE';
  }

  /**
   * @return {boolean} true, if the kitten is loved
   */
  isLoved() {
    return this.#_rating === 'LOVE';
  }

  /**
   * Defines the rating of the current kitten to 'HATE'
   */
  hated() {
    this.#_rating = 'HATE';
  }

  /**
   * @return {boolean} true, if the kitten is hated
   */
  isHated() {
    return this.#_rating === 'HATE';
  }

  /**
   * Convert the class instance to a JSON object.
   *
   * Missing value will be ignored.
   *
   * @return {{imageUrl: *, rating: *, id: *}} JSON representation of a kitten class
   */
  toJSON() {
    return {
      id: this.#_id || undefined,
      imageUrl: this.#_imageUrl || undefined,
      rating: this.#_rating || undefined
    }
  }

  /*
   * Getter & Setter
   */

  get id() {
    return this.#_id;
  }

  set id(value) {
    this.#_id = value;
  }

  get imageUrl() {
    return this.#_imageUrl;
  }

  set imageUrl(value) {
    this.#_imageUrl = value;
  }

  get rating() {
    return this.#_rating;
  }
}
