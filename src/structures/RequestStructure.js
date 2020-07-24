const fetch = require('node-fetch');
const AbortController = require('abort-controller');

const Util = require('../utils/Util');

class RequestStructure {
  constructor(options = {}) {
    options = Util.mergeDefault(
      { apiUrl: '', requestTimeout: 10000, headers: {} },
      options,
    );

    if (!/^https?:\/\//.test(options.apiUrl)) {
      throw new Error('INVALID_API_URL_PROVIDED');
    }

    this.options = options;
  }

  refreshOptions(newOptions = {}) {
    this.options = Util.mergeDefault(this.options, newOptions);
  }

  fetch(endpoint, options = {}) {
    return this.defaultFetch(`${this.options.apiUrl}${endpoint}`, options);
  }

  defaultFetch(url, options = {}) {
    const controller = new AbortController();
    const queryParams = new URLSearchParams(options.params || {}).toString();

    const { signal } = controller;
    const reponseTimeout = setTimeout(
      () => controller.abort(),
      this.options.requestTimeout,
    );

    return fetch(`${url}${queryParams ? `?${queryParams}` : ''}`, {
      ...Util.mergeDefault(this.options, options),
      signal,
    })
      .then(async res => {
        if (!res.ok || !(res.status >= 200 && res.status < 300)) {
          let message = { message: 'Bad Request' };
          const error = new Error('ERROR_IN_REQUEST');

          try {
            message = await res.json();
          } catch (e) {
            // Silent
          }

          error.response = res;
          error.error = message;
          error.code = res.status;

          throw error;
        }

        return res.json();
      })
      .catch(error => {
        const isAborted = error.name === 'AbortError';

        error.code = error.code || (isAborted && 504) || 500;
        error.error =
          error.error ||
          (isAborted && { message: error.message || 'Unknown Message' });

        throw error;
      })
      .finally(() => clearTimeout(reponseTimeout));
  }
}

module.exports = RequestStructure;
