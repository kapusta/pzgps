var gpsd = require('node-gpsd');

var _handleError = (err, msg) => {
  console.error('daemon error -', err, msg);
};
var _handleWarn = (err) => {
  console.warn('daemon warn -', err);
};
var _handleInfo = (data) => {
  console.log('daemon info -', data);
};

var init = (opt) => {
  return new gpsd.Daemon({
    program: 'gpsd',
    port: (opt.port) ? opt.port : 2947,
    device: (opt.dev) ? (opt.dev) : '/dev/ttyAMA0',
    pid: (opt.pid) ? opt.pid : '/tmp/gpsd.pid',
    logger: {
      info: (data) => {
        console.log('daemon info -', data);
      },
      warn: (err) => {
        console.warn('daemon warn -', err);
      },
      error: (err, msg) => {
        console.error('daemon error -', err, msg);
      }
    }
  });
};

var startDaemon = (daemon) => {
  daemon.start(function(arg) {
    console.log('GPSD start', arg);
  });
};

var stopDaemon = (daemon) => {
  daemon.stop(function(arg) {
    console.log('GPSD Stop', arg);
  });
};

var listen = (opt) => {
  return new gpsd.Listener({
    port: (opt.port) ? opt.port : 2947,
    hostname: 'localhost',
    parse: true,
    logger:  {
      info: (data) => {
        console.log('listener info -', data);
      },
      warn: (err) => {
        console.warn('listener warn -', err);
      },
      error: (err, msg) => {
        console.error('listener error -', err, msg);
      }
    },
  });
};


module.exports = {
  'init': init,
  'startDaemon': startDaemon,
  'stopDaemon': stopDaemon,
  'listen': listen
};
