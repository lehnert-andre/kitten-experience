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

  #_id; // private field
  #_imageUrl;
  #_rating; // private field + read-only (no setter)

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
    this.#_rating = rating;
  }

  /*
   * Static public methods
   */

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
