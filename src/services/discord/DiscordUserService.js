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
            .fetch(`/guilds/${guild.id}`, {
              headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
            })
            .catch(() => {}));

          return DiscordUtil.parseGuild(clientAdded, guild);
        }),
      );
    });
  }

  async getGuild(id) {
    this.request.refreshOptions({
      headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
    });

    const guild = await this.request.fetch(`/guilds/${id}`).catch(() => {});

    if (!guild) return { code: 400 };

    const member = await this.request
      .fetch(`/guilds/${id}/members/${this.userData.id}`)
      .catch(() => {});

    if (!member) return { code: 400 };

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
