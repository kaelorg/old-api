/** @type {typeof import('../../Models/Guild')} */
const Guild = use('App/Models/Guild');

const Util = require('../../../src/utils/Util');

class GuildController {
  guild({ guild }) {
    return guild;
  }

  async guilds({ discord, response }) {
    try {
      const guilds = await discord.user.getGuilds();
      return guilds;
    } catch ({ code, error }) {
      response.status(code).send(error);
    }
  }

  // Edit current guild

  async editGeneral({ guild, request }) {
    const { prefix } = request.only(['prefix']);

    await Guild.update(guild.id, { prefix });
  }

  async editSuggestion({ guild, discord, request, response }) {
    try {
      const { active, channel } = request.only(['active', 'channel']);

      if (channel && !(await discord.isValidGuildChannel(guild.id, channel))) {
        return response
          .status(400)
          .send({ message: 'The inserted channel is invalid' });
      }

      await Guild.update(
        guild.id,
        Util.transformData({ active, channel }, 'suggestion'),
      );
    } catch ({ code, error }) {
      response.status(code).send(error);
    }
  }

  async editWelcome({ guild, discord, request, response, params: { type } }) {
    try {
      if (!['input', 'leave'].includes(type)) {
        return response.status(404).send();
      }

      const { active, channel, message } = request.only([
        'active',
        'channel',
        'message',
      ]);

      if (channel && !(await discord.isValidGuildChannel(guild.id, channel))) {
        return response
          .status(400)
          .send({ message: 'The inserted channel is invalid' });
      }

      await Guild.update(
        guild.id,
        Util.transformData({ active, channel, message }, `welcome.${type}`),
      );
    } catch ({ code, error }) {
      response.status(code).send(error);
    }
  }

  editVanity() {
    return { ok: true };
  }
}

module.exports = GuildController;
