const Util = require('../../src/utils/Util');

class GuildMiddleware {
  async handle(ctx, next) {
    const {
      discord,
      response,
      params: { guildId },
    } = ctx;

    try {
      const guild = await discord.user.getGuild(guildId);
      ctx.guild = guild;
    } catch (error) {
      return Util.handleError(error, response);
    }

    await next();
  }
}

module.exports = GuildMiddleware;
