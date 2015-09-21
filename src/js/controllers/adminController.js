(function () {
  angular.module('EEK.controllers')
    .controller('adminController', function($scope, $location,adminService) {
        var adminCheck = adminService.getCookieValue('ICookie');
        if (adminCheck !== 'adminView') {
          $location.path('/');
        }
    }
  );
}());
