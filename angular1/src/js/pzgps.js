(function(angular) {
  'use strict'; // ECMA5 strict mode

  var pzgps = angular.module('pzgps', ['ngRoute', 'ngWebSocket']);

  // Configure the module.
  pzgps.config(function($routeProvider, $locationProvider, $httpProvider) {
    var baseUrl = '/';

    $locationProvider.html5Mode(true);

    $routeProvider
    .when(baseUrl, {
      template:  function(params){
        return '<pzgps-about></pzgps-about>';
      }
    })
    .when(baseUrl + 'websocket', {
      template: function(params){
        return '<pzgps-websocket></pzgps-websocket>';
      }
    })
    .otherwise({redirectTo: baseUrl});

  });

  pzgps.run(function($routeParams, $route, $rootScope, $http, $location) {

    $http.defaults.headers.get  = {
      'Content-Type': 'application/json'
    };

    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
      $location.replace().path($rootScope.baseUrl);
    });

  });

}(window.angular));
