/** @type {typeof import('../../Models/Guild')} */
const Guild = use('App/Models/Guild');

const Util = require('../../../src/utils/Util');

class GuildController {
  async guilds({ discord, response }) {
    try {
      const guilds = await discord.user.getGuilds();
      return guilds;
    } catch (error) {
      Util.handleError(error, response);
    }
  }

  async guild({ guild, response }) {
    try {
      const guildData = await guild.toJSON();
      const channels = await guild.getChannels();

      return Object.assign(guildData, {
        channels: channels
          .filter(channel => channel.type === 0)
          .map(channel => ({
            id: channel.id,
            name: channel.name,
          })),
      });
    } catch (error) {
      Util.handleError(error, response);
    }
  }

  // Edit current guild

  async editGeneral({ guild, request }) {
    const { prefix } = request.only(['prefix']);
    await Guild.update(guild.id, { prefix });
  }

  async editSuggestion({ guild, request, response }) {
    try {
      const { active, channel } = request.only(['active', 'channel']);

      if (channel && !(await guild.isValidChannel(guild.id, channel))) {
        return response
          .status(400)
          .send({ message: 'The inserted channel is invalid' });
      }

      await Guild.update(
        guild.id,
        Util.transformData({ active, channel }, 'suggestion'),
      );
    } catch (error) {
      Util.handleError(error, response);
    }
  }

  async editWelcome({ guild, request, response, params: { type } }) {
    try {
      if (!['input', 'leave'].includes(type)) {
        return response.status(404).send();
      }

      const { active, channel, message } = request.only([
        'active',
        'channel',
        'message',
      ]);

      if (channel && !(await guild.isValidChannel(guild.id, channel))) {
        return response
          .status(400)
          .send({ message: 'The inserted channel is invalid' });
      }

      await Guild.update(
        guild.id,
        Util.transformData({ active, channel, message }, `welcome.${type}`),
      );
    } catch (error) {
      Util.handleError(error, response);
    }
  }

  editVanity() {
    return { ok: true };
  }
}

module.exports = GuildController;
