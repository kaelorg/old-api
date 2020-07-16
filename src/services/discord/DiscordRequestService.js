const fetch = require('node-fetch');
const AbortController = require('abort-controller');

const Util = require('../../utils/Util');

const REQUEST_TIMEOUT = 10000;
const API_URL = 'https://discord.com/api/v6';

class DiscordRequestService {
  constructor(options = {}) {
    options = Util.mergeDefault({ headers: { Authorization: false } }, options);

    if (!/^Bearer [a-zA-Z0-9.-]+$/i.test(options.headers.Authorization)) {
      throw new Error('INVALID_AUTHORIZATION_HEADER');
    }

    this.options = options;
  }

  refreshOptions(newOptions = {}) {
    this.options = Util.mergeDefault(this.options, newOptions);
  }

  fetch(endpoint, options = {}) {
    return this.defaultFetch(`${API_URL}${endpoint}`, options);
  }

  defaultFetch(url, options = {}) {
    const controller = new AbortController();
    const queryParams = new URLSearchParams(options.params || {}).toString();

    const { signal } = controller;
    const reponseTimeout = setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT,
    );

    return fetch(`${url}${queryParams ? `?${queryParams}` : ''}`, {
      ...Util.mergeDefault(this.options, options),
      signal,
    })
      .then(res => {
        if (!res.ok || res.status !== 200) {
          const error = new Error('ERROR_IN_REQUEST');
          error.res = res;
          throw error;
        }

        return res.json();
      })
      .finally(() => clearTimeout(reponseTimeout));
  }
}

module.exports = DiscordRequestService;
