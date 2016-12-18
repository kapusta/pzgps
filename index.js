'use strict';

let argv = require('yargs').argv;
let Server = require('ws').Server;
let Realm = require('realm');
let merge = require('lodash/merge');

let daemon = require('./lib/daemon.js');
let realmSchema = require('./lib/realm-schema.js');
let realmApi = require('./lib/realm-api.js');

const mqkey = {
  consumerKey: ''
};

const pzgpsRealm = new Realm({
  schema: [realmSchema.Location, realmSchema.Climb]
});

const location = {
  current: {}
};

if (argv.mq) {
  try {
    mqkey.consumerKey = require('./lib/mqkey.js').consumerKey;
  } catch (err) {
    console.warn('Failed to import mqkey', err);
  }
}

let wss = new Server({
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
  let intervalId = setInterval(function () {
    socket.send(JSON.stringify(location.current));
  }, 2000);

  socket.on('message', data => { // (data, flags)
    let parsedData = JSON.parse(data);

    // there is room for more structure around recieving messages
    // with different actions, probably realm-api.js methods(?)
    // and this probably starts to look like a router of some sort
    if (parsedData.action === 'getConsumerKey' && mqkey.consumerKey) {
      socket.send(JSON.stringify(mqkey));
    }

    if (parsedData.action === 'newRoute') {
      let route = merge(
        {},
        {timestamp: new Date()},
        {location: location.current},
        {route: parsedData.route}
      );
      console.log('saving new route', route);
      let loc = realmApi.set(pzgpsRealm, route);

      merge(loc, {
        event: 'routeSaved'
      });
      socket.send(JSON.stringify(loc));
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
