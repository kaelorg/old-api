class UserController {
  async user({ auth, discord, response, params: { userId } }) {
    try {
      const helpers = userId === '@me' && auth.user;
      const user = await discord.requestUser(userId);

      return {
        user,
        helpers,
      };
    } catch ({ code, error }) {
      response.status(code).send(error);
    }
  }

  // Get user guilds

  async userGuilds({ discord, response }) {
    try {
      const guilds = await discord.user.getGuilds();
      return guilds;
    } catch ({ code, error }) {
      response.status(code).send(error);
    }
  }

  async userGuild({ discord, response, params: { guildId } }) {
    try {
      const guild = await discord.user.getGuild(guildId);
      return guild;
    } catch ({ code, error }) {
      response.status(code).send(error);
    }
  }

  // Edit current user

  async editUserProfile() {
    return { ok: true };
  }
}

module.exports = UserController;
