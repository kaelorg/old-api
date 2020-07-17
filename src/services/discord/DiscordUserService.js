const { Permissions, DiscordUtil } = require('../../utils');

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
    return this.request.fetch('/users/@me');
  }

  getGuilds() {
    return this.request.fetch('/users/@me/guilds').then(guilds => {
      return Promise.all(
        guilds.map(async guild => {
          const clientAdded = !!(await this.request
            .clientFetch(`/guilds/${guild.id}`)
            .catch(() => {}));

          return DiscordUtil.parseGuild(clientAdded, guild);
        }),
      );
    });
  }

  async getGuild(id) {
    const guild = await this.request.clientFetch(`/guilds/${id}`);
    const member = await this.request.clientFetch(
      `/guilds/${id}/members/${this.userData.id}`,
    );

    const permissions = new Permissions(
      member.roles
        .concat(id)
        .map(role => guild.roles.find(r => r.id === role).permissions),
    ).freeze();

    if (!permissions.has('MANAGE_GUILD')) return { code: 403 };
    return Object.assign(guild, { member });
  }
}

module.exports = DiscordUserService;
