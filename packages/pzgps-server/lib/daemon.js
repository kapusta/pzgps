let gpsd = require('node-gpsd');

let init = opt => {
  return new gpsd.Daemon({
    program: 'gpsd',
    port: (opt.port) ? opt.port : 2947,
    device: (opt.dev) ? (opt.dev) : '/dev/ttyAMA0',
    pid: (opt.pid) ? opt.pid : '/tmp/gpsd.pid',
    logger: {
      info: data => {
        console.log('daemon info -', data);
      },
      warn: err => {
        console.warn('daemon warn -', err);
      },
      error: (err, msg) => {
        console.error('daemon error -', err, msg);
      }
    }
  });
};

let startDaemon = daemon => {
  daemon.start(function (arg) {
    console.log('GPSD start', arg);
  });
};

let stopDaemon = daemon => {
  // why doesn't stop() work (gpsd exiting when run via .spawn())
  // since it exits, gpsd.js sets it to undefined, but somehow the daemon is still running!
  // see: https://github.com/eelcocramer/node-gpsd/blob/master/lib/gpsd.js#L205
  daemon.stop(function (arg) {
    console.log('GPSD Stop', arg);
  });
};

let listen = opt => {
  return new gpsd.Listener({
    port: (opt.port) ? opt.port : 2947,
    hostname: 'localhost',
    parse: true,
    logger: {
      info: data => {
        console.log('listener info -', data);
      },
      warn: err => {
        console.warn('listener warn -', err);
      },
      error: (err, msg) => {
        console.error('listener error -', err, msg);
      }
    }
  });
};

module.exports = {
  init: init,
  startDaemon: startDaemon,
  stopDaemon: stopDaemon,
  listen: listen
};
