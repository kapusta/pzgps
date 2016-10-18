/**
@memberof pzgps
@ngdoc component
@name pzgpsMapquest
@description opens a websocket and gets gps data
@example <pzgps-mapquest></pzgps-mapquest>
*/
(function(angular){
  'use strict';
  angular.module('pzgps').component('pzgpsMapquest', {
    templateUrl: '/components/pzgps-mapquest/pzgps-mapquest.html',
    controllerAs: 'ctrl',
    controller: function($log, sckt, urls) {
      $log.log('pzgpsMapquest component is running');

      var ctrl = this;
      ctrl.gpsData = {};
      ctrl.consumerKey = '';

      ctrl.getConsumerKey = function() {
        ctrl.socket.send({
          'action': 'getConsumerKey'
        });
      };

      ctrl.$onInit = function() {
        ctrl.socket = sckt.connect(urls.gps).socket;
        ctrl.socket.onMessage(function(message) {
          if (message.data && message.data.consumerKey) {
            ctrl.consumerKey = JSON.parse(message.data.consumerKey);
          }
          if (message.data && message.data.lat) {
            ctrl.gpsData = message.data;
          }
        });

        ctrl.getConsumerKey();

      };


    }
  });
}(window.angular));
