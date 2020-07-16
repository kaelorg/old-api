const DiscordService = require('../../src/services/discord');

class DiscordServiceMiddleware {
  async handle(ctx, next) {
    const { user, current } = ctx.auth;

    ctx.discord = new DiscordService(user, current.jwtPayload.data);
    await next();
  }
}

module.exports = DiscordServiceMiddleware;
