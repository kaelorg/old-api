const Permissions = require('./Permissions');

class DiscordUtil {
  static parseGuild(clientAdded, guild = {}) {
    return {
      clientAdded,
      id: guild.id,
      name: guild.name,
      canManage: new Permissions(guild.permissions).has('MANAGE_GUILD'),
      iconURL: guild.icon
        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${
            guild.icon.startsWith('a_') ? 'gif' : 'png'
          }?size=128`
        : null,
      nameAcronym: guild.name
        .replace(/'s /g, ' ')
        .replace(/\w+/g, e => e[0])
        .replace(/\s/g, ''),
    };
  }
}

module.exports = DiscordUtil;
