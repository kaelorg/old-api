const RequestStructure = require('../structures/RequestStructure');

class ClientService {
  constructor() {
    this.request = new RequestStructure({
      apiUrl: 'http://localhost:2001',
      requestTimeout: 5000,
    });
  }

  getCommands() {
    return this.request.fetch('/commands');
  }
}

module.exports = ClientService;
