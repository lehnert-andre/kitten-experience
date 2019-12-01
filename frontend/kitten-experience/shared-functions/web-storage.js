export function setLocalStorageItem(key, value) {
  try {
    if (typeof (Storage) !== "undefined") {
      if (window && window.localStorage) {

        // access web storage
        localStorage.setItem(key, value);
        return;
      }
    }
  } catch (e) {
  }

  throw new Error('No Web Storage support..')
}

export function getLocalStorageItem(key, defaultValue = undefined) {
  try {
    if (typeof (Storage) !== "undefined") {
      if (window && window.localStorage) {

        // access web storage
        const item = localStorage.getItem(key);
        return item ? item : defaultValue;
      }
    }
  } catch (e) {
  }

  throw new Error('No Web Storage support..')
}

export function removeLocalStorageItem(key) {
  try {
    if (typeof (Storage) !== "undefined") {
      if (window && window.localStorage) {

        // access web storage
        return localStorage.removeItem(key);
      }
    }
  } catch (e) {
  }

  throw new Error('No Web Storage support..')
}


export function setSessionStorageItem(key, value) {
  try {
    if (typeof (Storage) !== "undefined") {
      if (window && window.sessionStorage) {

        // access web storage
        sessionStorage.setItem(key, value);
        return;
      }
    }
  } catch (e) {
  }

  throw new Error('No Web Storage support..')
}

export function getSessionStorageItem(key, defaultValue = undefined) {
  try {
    if (typeof (Storage) !== "undefined") {
      if (window && window.sessionStorage) {

        // access web storage
        const item = sessionStorage.getItem(key);
        return item ? item : defaultValue;
      }
    }
  } catch (e) {
  }

  throw new Error('No Web Storage support..')
}

export function removeSessionStorageItem(key) {
  try {
    if (typeof (Storage) !== "undefined") {
      if (window && window.sessionStorage) {

        // access web storage
        return sessionStorage.removeItem(key);
      }
    }
  } catch (e) {
  }

  throw new Error('No Web Storage support..')
}
