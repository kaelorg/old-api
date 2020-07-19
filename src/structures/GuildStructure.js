const { Util, Permissions, DiscordCDNUtil } = require('../utils');

class GuildStructure {
  /**
   * @param {import('../services/discord')} discordService
   * @param {object} data
   */
  constructor(discordService, data = {}) {
    data = Util.mergeDefault(
      { member: { id: discordService.userData.id, roles: [] } },
      data,
    );

    this.id = data.id;
    this.name = data.name;
    this.icon = data.icon;
    this.region = data.region;

    this.member = data.member;
    this.ownerId = data.owner_id;
    this.features = data.features;

    this._roles = data.roles || [];
    this._emojis = data.emojis || [];

    this._permissions = data.permissions;
    this._permissionsNew = data.permissions_new;

    this.discordService = discordService;
  }

  get request() {
    return this.discordService.request;
  }

  get emojis() {
    return this._emojis.map(emoji => ({
      id: emoji.id,
      name: emoji.name,
      url: DiscordCDNUtil.emoji(emoji.id, emoji.animated ? 'gif' : 'png'),
      displayName: `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>`,
    }));
  }

  get roles() {
    return this._roles.map(role => ({
      id: role.id,
      name: role.name,
      color: role.color,
      managed: role.managed,
      hexColor: `#${role.color.toString(16).padStart(6, '0')}`,
    }));
  }

  get memberRoles() {
    return this.member.roles
      .concat(this.id)
      .filter(role => this._roles.some(r => r.id === role))
      .map(role => this._roles.find(r => r.id === role));
  }

  get nameAcronym() {
    return this.name
      .replace(/'s /g, ' ')
      .replace(/\w+/g, e => e[0])
      .replace(/\s/g, '');
  }

  get iconURL() {
    return (
      this.icon &&
      DiscordCDNUtil.icon(this.id, this.icon, {
        size: 128,
        dynamic: true,
        format: 'png',
      })
    );
  }

  get permissions() {
    const memberPermissions =
      typeof this._permissions === 'number'
        ? this._permissions
        : this.memberRoles.map(role => role.permissions);

    return new Permissions(
      this.member && this.member.id === this.ownerId
        ? Permissions.ALL
        : memberPermissions,
    ).freeze();
  }

  getChannels() {
    return this.request.clientFetch(`/guilds/${this.id}/channels`);
  }

  getMember(memberId) {
    return this.request.clientFetch(`/guilds/${this.id}/members/${memberId}`);
  }

  isValidChannel(channelId) {
    return this.getChannels.then(channels =>
      channels.some(channel => channel.id === channelId),
    );
  }

  hasClientAdded() {
    return this.request
      .clientFetch(`/guilds/${this.id}`)
      .then(() => true)
      .catch(() => false);
  }

  async toJSON(getClientAdded = false) {
    return {
      id: this.id,
      name: this.name,
      roles: this.roles,
      emojis: this.emojis,
      iconURL: this.iconURL,
      nameAcronym: this.nameAcronym,
      canManage: this.permissions.has('MANAGE_GUILD'),
      clientAdded: getClientAdded ? await this.hasClientAdded() : undefined,
    };
  }
}

module.exports = GuildStructure;
