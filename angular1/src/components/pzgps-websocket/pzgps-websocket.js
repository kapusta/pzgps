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
    controller: function($log, $scope, sckt, urls) {
      $log.log('pzgpsWebsocket component is running');
      var ctrl = this;

      ctrl.$onInit = function() {
        ctrl.socket = sckt.connect(urls.gps).socket;
        ctrl.socket.onMessage(function(message) {
          ctrl.gpsData = JSON.parse(message.data);
        });
      };

      ctrl.stopDaemon = function(evt) {
        ctrl.socket.send({
          'action': 'stopDaemon'
        });
      };

      $scope.$on('$destroy', function(evt) {
        sckt.disconnect(urls.gps);
      });

    }
  });
}(window.angular));
