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
      var socketAddress = 'ws://circ.local:9000';

      ctrl.$onInit = function() {

        ctrl.socket = sckt.connect(socketAddress).socket;

        ctrl.socket.onMessage(function(message) {
          ctrl.gpsData = JSON.parse(message.data);
        });

      };

      $scope.$on('$destroy', function(evt) {
        sckt.disconnect(socketAddress);
      });

    }
  });
}(window.angular));
