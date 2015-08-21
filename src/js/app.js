(function () {
  "use strict";
  angular.module('EEKApp', ['ngRoute', 'EEK.controllers', 'EEK.services'])

  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'})
    .when('/upload',{
      templateUrl: 'partials/upload.html',
      controller: 'uploadController'
    });
  });
  angular.module('EEK.controllers', []);
  angular.module('EEK.services', ['ngResource']);
}());
