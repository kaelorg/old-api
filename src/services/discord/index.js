const DiscordUserService = require('./DiscordUserService');
const DiscordRequestService = require('./DiscordRequestService');

class DiscordService {
  /**
   * @param {object} profile
   * @param {object} userData
   * @param {string} userData.id
   * @param {string} userData.accessToken
   * @param {string} userData.refreshToken
   */
  constructor(profile, userData) {
    this.userData = userData;
    this.userProfile = profile;

    this.request = new DiscordRequestService({
      headers: { Authorization: `Bearer ${userData.accessToken}` },
    });
  }

  get user() {
    return new DiscordUserService(this);
  }

  getUser(id) {
    return this.request.clientFetch(
      `/users/${id === '@me' ? this.userData.id : id}`,
    );
  }

  isValidGuildChannel(guildId, channelId) {
    return this.request
      .clientFetch(`/guilds/${guildId}/channels`)
      .then(channels => channels.some(channel => channel.id === channelId));
  }
}

module.exports = DiscordService;
