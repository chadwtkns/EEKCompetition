(function () {
  "use strict";
  angular.module('EEKApp', ['ngRoute', 'ngSanitize', 'EEK.controllers', 'EEK.services'])

  .config(function ($routeProvider, $sceDelegateProvider) {
//    $sceDelegateProvider.resourceUrlWhitelist([
//     'self']);
    $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'})
    .when('/upload',{
      templateUrl: 'partials/upload.html',
      controller: 'uploadController'
    })
    .when('/video/:videoId', {
      templateUrl: 'partials/participantVideo.html',
      controller: 'participantVideoController'
    });
  });
  angular.module('EEK.controllers', []);
  angular.module('EEK.services', ['ngResource']);
}());
