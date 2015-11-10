(function () {
  "use strict";
  angular.module('EEKApp', ['ngRoute', 'ngSanitize', 'EEK.controllers', 'EEK.services'])

  .config(function ($routeProvider, $sceDelegateProvider) {
//    $sceDelegateProvider.resourceUrlWhitelist([
//     'self']);
    $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'})
    .when('/apply',{
      templateUrl: 'partials/upload.html',
      controller: 'uploadController'
    })
    .when('/admin/login',{
      templateUrl: 'partials/adminLogin.html',
      controller: 'loginController'
    })
    .when('/admin/dashboard',{
      templateUrl: 'partials/adminDashboard.html',
      controller: 'adminController'
    })
    .when('/video/:videoId', {
      templateUrl: 'partials/participantVideo.html',
      controller: 'participantVideoController'
    })
    .when('/leaderboards', {
      templateUrl: 'partials/leaderboards.html',
      controller: 'staticContentController'
    })
    .when('/faq', {
      templateUrl: 'partials/faq.html',
      controller: 'staticContentController'
    })
    .when('/resources', {
      templateUrl: 'partials/resources.html',
      controller: 'staticContentController'
    })
    .when('/contact', {
      templateUrl: 'partials/contact.html',
      controller: 'staticContentController'
    })
    .when('/success', {
      templateUrl: 'partials/success.html',
      controller: 'staticContentController'
    })
    .when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'staticContentController'
    });
  });
  angular.module('EEK.controllers', []);
  angular.module('EEK.services', ['ngResource','ngCookies']);
}());
