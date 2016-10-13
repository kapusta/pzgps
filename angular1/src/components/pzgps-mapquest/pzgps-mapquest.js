/**
@memberof pzgps
@ngdoc component
@name pzgpsMapquest
@description opens a websocket and gets gps data
@example <pzgps-mapquest></pzgps-websocket>
*/
(function(angular){
  'use strict';
  angular.module('pzgps').component('pzgpsMapquest', {
    templateUrl: '/components/pzgps-websocket/pzgps-websocket.html',
    controllerAs: 'ctrl',
    controller: function($log, sckt, urls) {
      $log.log('pzgpsMapquest component is running');

      var ctrl = this;
      ctrl.gpsData = {};
      ctrl.mqKey = ''; // need to figure out a way to get this in here appropriately

      ctrl.getConsumerKey = function() {
        ctrl.socket.send({
          'get': 'getConsumerKey'
        });
      };

      ctrl.$onInit = function() {
        ctrl.socket = sckt.connectTo(urls.gps).socket;
        ctrl.socket.onMessage(function(message) {
          ctrl.gpsData = JSON.parse(message.data);
        });
      };

    }
  });
}(window.angular));
