const UserStructure = require('../../structures/UserStructure');
const GuildStructure = require('../../structures/GuildStructure');

class DiscordUserService {
  /**
   * @param {import('.')} discordService
   */
  constructor(discordService) {
    this.discordService = discordService;
  }

  get request() {
    return this.discordService.request;
  }

  get profile() {
    return this.discordService.userProfile;
  }

  get userData() {
    return this.discordService.userData;
  }

  getUser() {
    return this.request
      .fetch('/users/@me')
      .then(data => new UserStructure(data));
  }

  getGuilds() {
    return this.request.fetch('/users/@me/guilds').then(guilds => {
      return Promise.all(
        guilds.map(guild =>
          new GuildStructure(this.discordService, guild).toJSON(true),
        ),
      );
    });
  }

  async getGuild(id) {
    const guildData = await this.request.clientFetch(`/guilds/${id}`);
    const member = await this.request.clientFetch(
      `/guilds/${id}/members/${this.userData.id}`,
    );

    const guild = new GuildStructure(
      this.discordService,
      Object.assign(guildData, { member }),
    );

    if (!guild.permissions.has('MANAGE_GUILD')) {
      const error = {
        code: 403,
        error: {
          message: 'The current user does not have sufficient permissions',
        },
      };

      throw error;
    }

    return guild;
  }
}

module.exports = DiscordUserService;
