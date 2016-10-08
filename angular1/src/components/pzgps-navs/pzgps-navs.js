/**
@memberof pzgps
@ngdoc component
@name pzgpsNavs
@description opens a websocket and gets gps data
@example <pzgps-navs></pzgps-navs>
*/
(function(angular){
  'use strict';
  angular.module('pzgps').component('pzgpsNavs', {
    templateUrl: '/components/pzgps-navs/pzgps-navs.html',
    controllerAs: 'ctrl',
    controller: function($log, $location, $rootScope) {
      $log.log('pzgpsNavs component is running');
      var ctrl = this;

      $rootScope.$on('$routeChangeSuccess', function (event, current, previous, rejection) {
        ctrl.$location = $location.url();
      });

    }
  });
}(window.angular));
