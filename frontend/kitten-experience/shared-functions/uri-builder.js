export class UriBuilder {
  _uri = '';

  static fromHost(host) {
    const uriBuilder = new UriBuilder();
    uriBuilder._uri = host;

    return uriBuilder;
  }

  /**
   * Append path to the existing path.
   * @param pathElement
   */
  path(pathElement) {
    this._uri = this._appendPath(this._uri, '' + pathElement);

    return this;
  }

  /**
   * Append query parameter to the existing path.
   *
   * @param key of the query parameter
   * @param value of the query parameter
   */
  queryParam(key, value) {
    this._uri = this._appendQueryParam(this._uri, '' + key, '' + value);

    return this;
  }


  toString() {
    return this._uri;
  }

  /**
   * return <URL>/<PATH>
   */
  _appendPath(url, path) {
    return [this._removeSlashes(url), this._removeSlashes(path)].join('/');
  }

  /**
   * return <URL>?key=value
   */
  _appendQueryParam(url, key, value) {
    let concatChar = '&';

    if (url.indexOf('?') === -1) {
      // the first query parameter uses a '?'
      concatChar = '?';
    }

    return `${this._removeSlashes(url)}${concatChar}${key}=${value}`;
  }

  _removeSlashes(path) {
    if (path.charAt(0) === '/') {
      path = path.substr(1);
    }

    if (path.charAt(path.length - 1) === '/') {
      path = path.substr(0, path.length - 1);
    }

    return path;
  }
}
