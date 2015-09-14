(function () {
  angular.module('EEK.controllers')
    .controller('participantVideoController', function($scope, $routeParams, $sce,videoService, updateService) {
      var shareableVid = videoService.getShareableVideo($routeParams.videoId);

      shareableVid.query(function (data) {
//        console.log(data);
        $scope.test = data[0].firstName;
        $scope.votes = data[0].votes;
//        $scope.playable = $sce.trustAsResourceUrl(data[0].uploadedFileName);
//        $scope.getIframeSrc = function (videoId) {
//          return  videoId;
//        };
//        console.log(data);
      });
      $scope.videoVotes = function (votes) {
        var voteObj = {
          votes : votes
        };
       updateService.update({ id:$routeParams.videoId }, voteObj);
      };
//      console.log($scope.test);
    }
  );
}());
