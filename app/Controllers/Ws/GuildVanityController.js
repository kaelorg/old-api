const isObject = value => value && value.constructor === Object;

class GuildVanityController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  onNew(data) {
    if (isObject(data)) {
      this.socket.broadcastToAll('new', data);
    }
  }

  onRemove(data) {
    if (isObject(data)) {
      this.socket.broadcastToAll('remove', data);
    }
  }
}

module.exports = GuildVanityController;
