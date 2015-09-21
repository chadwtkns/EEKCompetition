(function () {
  angular.module('EEK.controllers')
    .controller('loginController', function($scope, $location, adminService) {
      $scope.adminLogin = function () {
        var data = {
          email: $scope.loginForm.email,
          password: $scope.loginForm.password
        };
        var tmp = adminService.login();

        tmp.save(
          data,
          function (data) {
            if(data.success === true) {
            $location.path('/admin/dashboard');
          } else {
            $scope.error = data.success;
          }

          },function (error) {
            $scope.error = error;
          });

      };
    }
  );
}());
