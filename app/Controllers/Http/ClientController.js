const Util = require('../../../src/utils/Util');

class ClientController {
  async commands({ client, response }) {
    try {
      const commands = await client.getCommands();
      return commands;
    } catch (error) {
      Util.handleError(error, response);
    }
  }
}

module.exports = ClientController;
