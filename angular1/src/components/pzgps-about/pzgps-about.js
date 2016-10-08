/**
@memberof pzgps
@ngdoc component
@name pzgpsAbout
@description about the site
@example <pzgps-about></pzgps-about>
*/
(function(angular){
  'use strict';
  angular.module('pzgps').component('pzgpsAbout', {
    templateUrl: '/components/pzgps-about/pzgps-about.html',
    controllerAs: 'ctrl',
    controller: function($log) {
      $log.log('pzgpsAbout component is running');
      var ctrl = this;
    }
  });
}(window.angular));
