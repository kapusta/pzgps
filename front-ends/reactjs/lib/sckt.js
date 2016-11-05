const connect = serverUrl => {
  return new Promise((resolve, reject) => {
    var socket = new WebSocket(serverUrl);
    socket.onopen = e => {
      console.log('Connected.');
      return resolve(socket);
    };
    socket.onerror = e => {
      return reject(e);
    }
  }); // don't need a catch clause here because of the onerror above
};

module.exports = {
  connect: connect
}
