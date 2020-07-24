const ClientService = require('../../src/services/ClientService');

class ClientMiddleware {
  async handle(ctx, next) {
    ctx.client = new ClientService();
    await next();
  }
}

module.exports = ClientMiddleware;
