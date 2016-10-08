/**
@memberof pzgps
@ngdoc component
@name pzgpsWebsocket
@description opens a websocket and gets gps data
@example <pzgps-websocket></pzgps-websocket>
*/
(function(angular){
  'use strict';
  angular.module('pzgps').component('pzgpsWebsocket', {
    templateUrl: '/components/pzgps-websocket/pzgps-websocket.html',
    controllerAs: 'ctrl',
    controller: function($log, $websocket) {
      $log.log('pzgpsWebsocket component is running');
      var ctrl = this;

      var connectSocket = function(url) {
        $log.log('trying to connect to', url);
        var socket = $websocket(url);
        socket.onMessage(function(message) {
          var gpsData = JSON.parse(message.data);
          $log.info('message!', gpsData);
          ctrl.gpsData = gpsData;
        });
      };

      ctrl.$onInit = function() {
        connectSocket('ws://circ.local:9000');
      };


    }
  });
}(window.angular));
