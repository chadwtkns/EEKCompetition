(function () {
  angular.module('EEK.controllers')
    .controller('loginController', function($scope, adminService) {
      $scope.adminLogin = function () {
        var data = {
          email: $scope.loginForm.email,
          password: $scope.loginForm.password
        };
        var tmp = adminService.login();

        tmp.save(
          data,
          function (data) {
            console.log(data);

          },function (error) {
            console.log(error);
          });

      };
    }
  );
}());
