const isObject = value => value && value.constructor === Object;

class GuildBanFreezeController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  // Types

  onAdd(data) {
    if (isObject(data)) {
      this.socket.broadcastToAll('add', data);
    }
  }

  onRemove(data) {
    if (isObject(data)) {
      this.socket.broadcastToAll('remove', data);
    }
  }

  //

  onError(data) {
    if (isObject(data)) {
      this.socket.broadcastToAll('error', data);
    }
  }

  onStart(data) {
    if (isObject(data)) {
      this.socket.broadcastToAll('start', data);
    }
  }

  onDelete(data) {
    if (isObject(data)) {
      this.socket.broadcastToAll('delete', data);
    }
  }

  onSuccess(data) {
    if (isObject(data)) {
      this.socket.broadcastToAll('success', data);
    }
  }
}

module.exports = GuildBanFreezeController;
