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
}

module.exports = DiscordService;
