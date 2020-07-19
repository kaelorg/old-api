const DiscordCDNUtil = require('../utils/DiscordCDNUtil');

class UserStructure {
  constructor(data = {}) {
    this.id = data.id;
    this.email = data.email;
    this.avatar = data.avatar;
    this.username = data.username;
    this.publicFlags = data.public_flags;
    this.discriminator = data.discriminator;
  }

  get tag() {
    return `${this.username}#${this.discriminator}`;
  }

  get avatarURL() {
    return this.avatar
      ? DiscordCDNUtil.avatar(this.id, this.avatar, {
          size: 128,
          dynamic: true,
          format: 'png',
        })
      : DiscordCDNUtil.defaultAvatar(this.discriminator % 5);
  }

  toJSON() {
    return {
      id: this.id,
      tag: this.tag,
      avatar: this.avatarURL,
      username: this.username,
      discriminator: this.discriminator,
    };
  }
}

module.exports = UserStructure;
