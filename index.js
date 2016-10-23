var argv = require('yargs').argv;
var Server = require('ws').Server;
var daemon = require('./lib/daemon.js');

const mqkey = {
  path: './lib/mqkey.js',
  consumerKey: ''
};

const location = {
  current: {}
};

if (argv.mq) {
  try {
    mqkey.consumerKey = require(mqkey.path).consumerKey;
  } catch (err) {
    console.warn('Tried to import mqkey at path', mqkey.path, err);
  }
}

var wss = new Server({
  port: (argv.port) ? argv.port : '9000'
});

const dmon = daemon.init({
  port: (argv.daemonPort) ? argv.daemonPort : 2947
});
dmon.start();
const listener = daemon.listen({});

// set up server listener
wss.on('connection', socket => {
  console.log('new websocket connection, (', wss.clients.length, ' total)');

  // send out the location data on an interval
  var intervalId = setInterval(function () {
    socket.send(JSON.stringify(location.current));
  }, 2000);

  socket.on('message', data => { // (data, flags)
    var parsedData = JSON.parse(data);
    // console.log('new message from client', parsedData);

    // there's room for more protocols here...
    if (parsedData.action === 'getConsumerKey' && mqkey.consumerKey) {
      socket.send(JSON.stringify(mqkey));
    }
  });

  socket.on('close', () => {
    clearInterval(intervalId);
    console.log('websocket connection closed, (', wss.clients.length, ' remain)');
  });
});

// set up event listeners
listener.on('connected', () => console.log('listener is conected'));
listener.on('DEVICE', data => console.log('device', data));
listener.on('TPV', tpvData => {
  location.current = tpvData;
});

listener.connect();
listener.watch();
listener.device();
