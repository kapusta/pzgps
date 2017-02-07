'use strict';

let argv = require('yargs').argv;
let Server = require('ws').Server;
let merge = require('lodash/merge');

let daemon = require('./lib/daemon.js');

let mqkey = {
  consumerKey: ''
};

let location = {
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

    // there is room for more structure around recieving messages with
    // different actions, probably starts to look like a router of some sort,
    if (parsedData.action === 'pzgps.get.consumerKey' && mqkey.consumerKey) {
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
      // at this point, you could PUT/POST data into a database (eg, CouchDB)
      // then report that back out to the consuming client. the schema for that
      // message out to the client is up to you, the format below is naive at best.
      socket.send(JSON.stringify(merge(route, {
        event: 'pzgps.put.route'
      })));
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
