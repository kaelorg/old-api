const isObject = value => value && value.constructor === Object;

class GuildSuggestionController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  onNew(data) {
    if (isObject(data)) {
      this.socket.broadcastToAll('new', data);
    }
  }
}

module.exports = GuildSuggestionController;
