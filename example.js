/*******************************************************************************
*  Code contributed to the webinos project
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*******************************************************************************/

var gpsd = require('node-gpsd');

var daemon = new gpsd.Daemon({
    program: 'gpsd',
    device: '/dev/ttyAMA0',
    port: 2947,
    pid: '/tmp/gpsd.pid',
    parse: true,
    logger: {
        info: function(info) {
          console.log('info callback', info);
        },
        warn: function(warning) {
          console.log('warning callback', warning);
        },
        error: function(error) {
          console.log('error callback', error);
        }
    }
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


var startWatching = function(listener) {
  console.log('gunna watch now');

  listener.watch();

};


daemon.start(function() {
    console.log('started');


    //listener.logger = console;




    listener.connect(function (foo) {
        console.log('connected', foo);

        listener.on('TPV', function (data) {
          console.log('TPV', data);
        });
        listener.on('SKY', function (data) {
          console.log('SKY', data);
        });
        listener.on('INFO', function (data) {
          console.log('INFO', data);
        });
        listener.on('DEVICE', function (data) {
          console.log('DEVICE', data);
        });

        if (listener.isConnected()) {
          startWatching(listener);
        }

        listener.devices();
        listener.version();
        listener.device();
    });



});
