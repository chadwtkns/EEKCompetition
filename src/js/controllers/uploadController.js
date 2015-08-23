(function () {
  angular.module('EEK.controllers')
    .controller('uploadController', function($scope, $filter, videoService) {

      var allVidPromise = videoService.getVideos();
      allVidPromise.query(function (data) {
        $scope.allVids = data;
      });

    }
  );
}());
