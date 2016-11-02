// @see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
module.exports = {
  connect: serverUrl => {
    return new Promise((resolve, reject) => {
      var socket = new WebSocket(serverUrl);
      socket.onopen = e => {
        return resolve(socket);
      };
    });
  }
}
