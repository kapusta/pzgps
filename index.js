var gpsd = require('node-gpsd');

// var daemon = new gpsd.Daemon({
//     program: 'gpsd',
//     device: '/dev/ttyAMA0',
//     port: 2947,
//     pid: '/tmp/gpsd.pid',
//     logger: {
//         info: function() {},
//         warn: console.warn,
//         error: console.error
//     }
// });
//
// daemon.start(function(arg) {
//   console.log('Started', arg);
// });
//


var handleTpv = function(tpvData) {
  console.log(tpvData);
  // TODO: store the data somewhere
};

var handleError = function(err, msg) {
  console.log('error -', err, msg);
};

var handleWarn = function(err) {
  console.log('warn -', err);
};

var handleInfo = function(data) {
  console.log('info -', data);
};

var connected = function() {
  console.log('connected');
};

var device = function(data) {
  console.log('device -', data);
};


var listener = new gpsd.Listener({
  port: 2947,
  hostname: 'localhost',
  parse: true,
  logger:  {
    info: handleInfo,
    warn: handleWarn,
    error: handleError
  },
});


listener.on('TPV', handleTpv);
listener.on('error', handleError);
listener.on('connected', connected);
listener.on('INFO', handleInfo);
listener.on('DEVICE', device);

listener.connect();
listener.watch();
listener.device();
