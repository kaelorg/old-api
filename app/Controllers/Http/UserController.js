/** @type {import('../../Models/User')} */
const User = use('App/Models/User');

class UserController {
  async user({ auth, params: { userId } }) {
    const helpers = userId === '@me' ? auth.user : await User.findOne(userId);

    return {
      helpers,
    };
  }

  async userGuilds({ discord }) {
    const guilds = await discord.user.getGuilds();
    return guilds;
  }

  async userGuild({ discord, response, params: { guildId } }) {
    const { code, ...guild } = await discord.user.getGuild(guildId);

    if (code) return response.status(code).send();
    return guild;
  }
}

module.exports = UserController;
