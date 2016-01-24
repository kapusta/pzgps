var gpsd = require('node-gpsd');

var daemon = new gpsd.Daemon({
    program: 'gpsd',
    device: '/dev/ttyAMA0',
    port: 2947,
    pid: '/tmp/gpsd.pid',
    logger: {
        info: function() {},
        warn: console.warn,
        error: console.error
    }
});


daemon.start(function(arg) {
  console.log('Started', arg);
});


var listener = new gpsd.Listener({
    port: 2947,
    hostname: 'localhost',
    logger:  {
        info: function() {},
        warn: console.warn,
        error: console.error
    },
    parse: true
});

listener.connect(function(arg) {
    console.log('Connected', arg);
});

if (listener.isConnected()) {
  console.log('listening!');
}

listener.watch(options);
