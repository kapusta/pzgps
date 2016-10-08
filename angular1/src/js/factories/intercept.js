// Adapted from: https://gist.github.com/gnomeontherun/5678505
(function(angular, document){
  'use strict';

  angular.module('pzgps').factory('intercept', ['$q', '$rootScope', '$log', function($q, $rootScope, $log) {
    $log.log("intercept factory is running");

    var request = function(obj) {
      // Access to lots of great stuff in here...
      // obj.headers (object), obj.method (string), obj.url (string), obj.withCredentials (boolean)
      //$log.log("intercept: request");
      //$log.log(obj);
      // transform the response here if you need to, the request config is in config
      return obj || $q.when(obj);
    };

    var requestError = function(obj) { // a failed request
      //$log.log("intercept: requestError");
      //$log.log(obj);
      return $q.reject(obj);
    };

    var response = function(obj) { // a succuesful response
      //$log.log("intercept: response");
      //$log.log(obj);
      // transform the response here if you need to, the deserialize JSON is in obj.data
      return obj || $q.when(obj);
    };

    var responseError = function(obj) { // a failed response
      $log.log("intercept factory caught an error: " + obj.status);
      //$log.log(obj); // this object is handed to $http and .then() fires with the object
      return $q.reject(obj);
    };

    return {
      'request': request,
      'requestError': requestError,
      'response': response,
      'responseError': responseError
    };

  }]);

}(window.angular, document));
