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
    controller: function($log, $scope, sckt) {
      $log.log('pzgpsWebsocket component is running');
      var ctrl = this;


      ctrl.$onInit = function() {

        ctrl.socket = sckt.connect('ws://circ.local:9000').socket;

        ctrl.socket.onMessage(function(message) {
          ctrl.gpsData = JSON.parse(message.data);
        });

      };

      $scope.$on('$destroy', function(evt) {
        sckt.disconnect('ws://circ.local:9000');
      });

      // ctrl.sendMessage = function() {
      //   ctrl.socket.send({
      //     'action': 'stop'
      //   });
      // };

      // var connectSocket = function(url) {
      //   $log.log('trying to connect to', url);
      //   var socket = $websocket(url);
      //   socket.onMessage(function(message) {
      //     var gpsData = JSON.parse(message.data);
      //     $log.info('message!', gpsData);
      //     ctrl.gpsData = gpsData;
      //   });
      // };
      //
      // ctrl.$onInit = function() {
      //   connectSocket('ws://circ.local:9000');
      // };


    }
  });
}(window.angular));
