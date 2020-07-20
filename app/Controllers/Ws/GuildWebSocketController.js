class GuildWebSocketController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;

    console.log('user joined with %s socket id', socket.id, socket.topic);
  }

  onCall(data) {
    this.socket.broadcastToAll('call', data);
  }

  onMessage() {
    // same as: socket.on('message')
  }

  onClose() {
    // same as: socket.on('close')
  }

  onError() {
    // same as: socket.on('error')
  }
}

module.exports = GuildWebSocketController;
