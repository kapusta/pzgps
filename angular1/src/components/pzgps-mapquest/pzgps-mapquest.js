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
      ctrl.gpsData = null;
      ctrl.consumerKey = '';

      ctrl.getConsumerKey = function() {
        ctrl.socket.send({
          'action': 'getConsumerKey'
        });
      };

      ctrl.$onInit = function() {
        ctrl.socket = sckt.connect(urls.gps).socket;
        ctrl.socket.onMessage(function(message) {
          var parsedData = JSON.parse(message.data);

          if (parsedData.consumerKey) {
            ctrl.consumerKey = parsedData.consumerKey;
          }
          if (parsedData.lat) {
            ctrl.gpsData = parsedData;
          }
        });

        ctrl.getConsumerKey();

      };


    }
  });
}(window.angular));
