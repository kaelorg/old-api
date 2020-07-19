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
    } catch ({ code, error }) {
      return response.status(code).send(error);
    }

    await next();
  }
}

module.exports = GuildMiddleware;
