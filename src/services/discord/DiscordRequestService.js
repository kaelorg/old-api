const Util = require('../../utils/Util');
const RequestStructure = require('../../structures/RequestStructure');

class DiscordRequestService extends RequestStructure {
  constructor(options = {}) {
    super(Object.assign(options, { apiUrl: 'https://discord.com/api/v6' }));

    if (!/^Bearer [a-zA-Z0-9.-]+$/i.test(this.options.headers.Authorization)) {
      throw new Error('INVALID_AUTHORIZATION_HEADER');
    }
  }

  clientFetch(endpoint, options = {}) {
    options = Util.mergeDefault({ headers: { Authorization: '' } }, options);

    Object.defineProperty(options.headers, 'Authorization', {
      value: `Bot ${process.env.DISCORD_TOKEN}`,
    });

    return this.fetch(endpoint, options);
  }
}

module.exports = DiscordRequestService;
