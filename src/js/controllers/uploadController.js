(function () {
  angular.module('EEK.controllers')
    .controller('uploadController', function($scope, $filter, videoService) {

      var allVidPromise = videoService.getVideos();
      allVidPromise.query(function (data) {
        $scope.allVids = data;
      });

      $scope.submit = function () {
          var data = {
          "firstName": $scope.uploadVideoForm.firstName,
          "lastName": $scope.uploadVideoForm.lastName,
          "email": $scope.uploadVideoForm.email
        };
        var tmp = videoService.postVideos();

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
