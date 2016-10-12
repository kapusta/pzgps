var argv = require('yargs').argv;
var daemon = require('./daemon.js');
var server = require('ws').Server
var wss = new server({ port: (argv.port) ? argv.port : '9000' });

const location = {
  current: {},
  last: {}
};


wss.on('connection', (socket) => {

  console.log('new websocket connection, (', wss.clients.length, ' total)');

  // send out the location data on an interval
  var intervalId = setInterval(function() {
    socket.send(JSON.stringify(location.current));
  }, 2000);

  socket.on('message', (data, flags) => {
    var parsedData = JSON.parse(data);
    console.log('new message from client', parsedData);
    // TODO: small schema of verbs mapped to methods to start/stop the daemon
  });

  socket.on('close', () => {
    clearInterval(intervalId);
    console.log('websocket connection closed, (', wss.clients.length, ' remain)');
  });

});



const dmon = daemon.init({
  'port': (argv.daemonPort) ? argv.daemonPort : 2947
});
const listener = daemon.listen({});

listener.on('connected', (data) => console.log('listener is conected', data));
listener.on('DEVICE', (data) => console.log('device', data));
listener.on('TPV', (tpvData) => {
  location.last = (location.current) ? location.current : null;
  location.current = tpvData;
});

listener.connect();
listener.watch();
listener.device();
