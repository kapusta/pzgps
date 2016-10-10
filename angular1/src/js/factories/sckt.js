(function(angular){
  'use strict';

  angular.module('pzgps').factory('sckt', function($q, $rootScope, $log, $websocket) {
    $log.log("sckt factory is running");

    var sockets = {};

    var connect = function(url) {
      var b64 = window.btoa(url);
      if (sockets[b64]) {
        sockets[b64].connections++;
        return sockets[b64];
      } else {
        var socket = $websocket(url);
        sockets[b64] = {
          'socket': socket,
          'connections' : 1
        };
        return sockets[b64];
      }
    };

    var disconnect = function(url) {
      var b64 = window.btoa(url);
      if (sockets[b64]) {
        sockets[b64].connections--;
      }
      if (!sockets[b64].connections) {
        sockets[b64].socket.close();
        delete sockets[b64];
      }
      $log.log(Object.keys(sockets).length, 'sockets');
    };

    return {
      'connect': connect,
      'disconnect': disconnect
    };

  });

}(window.angular));
