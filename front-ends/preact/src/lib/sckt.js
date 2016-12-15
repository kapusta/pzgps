const connect = serverUrl => {
  return new Promise((resolve, reject) => {
    let socket = new WebSocket(serverUrl);
    socket.onopen = e => {
      console.log('Connected.', e);
      return resolve(socket);
    };
    socket.onerror = e => {
      return reject(e);
    };
  }); // don't need a catch clause here because of the onerror above
};

// TODO: not purely functional
const setUpSocket = (serverUrl, Component) => {

  connect(serverUrl).then(socket => {

    Component.setState({
      socket
    });

    socket.send(JSON.stringify({
      'action': 'getConsumerKey'
    }));

    socket.onclose = e => {
      // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
      console.error('The WebSocket connection closed', e);
      console.log('Trying to reconnect...');
      window.setTimeout(() => {
        setUpSocket(Component);
      }, 5000);
    };

    socket.onmessage = e => {
      let data = JSON.parse(e.data);
      if (data.consumerKey) {
        Component.setState({
          consumerKey: data.consumerKey
        });
      } else {
        Component.setState({
          gpsData: data
        });
      }
    };

  }).catch((err) => {
    console.error('could not connect to WebSocket server', err);
    console.log('Trying to reconnect...');
    setTimeout(() => {
      setUpSocket(Component);
    }, 5000);
  });

};

export default {
  connect,
  setUpSocket
};
