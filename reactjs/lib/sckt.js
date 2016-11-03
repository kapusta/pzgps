const connect = serverUrl => {
  return new Promise((resolve, reject) => {
    var socket = new WebSocket(serverUrl);
    socket.onopen = e => {
      return resolve(socket);
    };
  });
};

const disconnect = socket => {
  socket.close();
};

module.exports = {
  connect: connect,
  disconnect: disconnect
}
