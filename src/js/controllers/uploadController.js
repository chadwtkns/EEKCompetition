(function () {
  angular.module('EEK.controllers')
    .controller('uploadController', function($scope, $filter, videoService) {
      var allVidPromise = videoService.getVideos();
      allVidPromise.query(function (data) {
        $scope.allVids = data;
      });
      $scope.addLoading = function () {
        var italic = document.createElement("i");
        var att = document.createAttribute("class");
        att.value = "fa fa-spinner fa-pulse";
        italic.setAttributeNode(att);
        var currentSpan = document.getElementById("loadingSpan");
        currentSpan.appendChild(italic);
      };
      $scope.saveData = function (data) {
        console.log(data);
      };
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
