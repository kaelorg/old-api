/** @type {typeof import('@adonisjs/websocket/src/Ws')} */
const Ws = use('Ws');

/** @type {typeof import('../../Models/Guild')} */
const Guild = use('App/Models/Guild');

const Util = require('../../../src/utils/Util');
const UserStructure = require('../../../src/structures/UserStructure');

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
      const helpers = await Guild.findOne(guild.id);
      const owner = await guild
        .getMember(guild.ownerId)
        .then(({ user }) => new UserStructure(user));

      return Object.assign(guildData, {
        owner,
        helpers,
        channels: channels
          .filter(({ type }) => type === 0)
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

      if (channel && !(await guild.isValidChannel(channel))) {
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

      if (channel && !(await guild.isValidChannel(channel))) {
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

  async editVanity({ guild, request, response }) {
    try {
      const { user, role, time } = request.only(['user', 'role', 'time']);
      const guildRole = guild.roles.find(({ id }) => id === role);

      if (!guildRole || guildRole.managed) {
        return response
          .status(400)
          .send({ message: 'The role entered is invalid' });
      }

      const member = await guild.getMember(user);
      const { vanity } = await Guild.findOne(guild.id);

      if (!vanity.users.some(({ id }) => id === user)) {
        const channel = Ws.getChannel('vanity').topic('vanity');

        if (
          channel &&
          channel.socket.channel.subscriptions.get('vanity').size >= 2
        ) {
          channel.broadcastToAll('add', {
            time,
            role_id: role,
            guild_id: guild.id,
            member_id: member.id,
          });
        } else {
          response.status(503).send({
            message:
              'The manager is not connected to the socket, so he cannot handle the system',
          });
        }
      }
    } catch (error) {
      Util.handleError(error, response);
    }
  }
}

module.exports = GuildController;
