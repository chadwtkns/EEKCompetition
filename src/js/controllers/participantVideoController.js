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
      $scope.streamingVid = videoService.playVideo();
      $scope.videoVotes = function (votes) {
        var voteObj = {
          votes : votes,
          email : $scope.participantEmail
        };
        if ($scope.participantEmail === undefined) {
           $scope.error = "You must include your email address";
           return;
        }
       var updatedStuff = updateService.update({ id:$routeParams.videoId }, voteObj);
//        console.log(up);
        updatedStuff.$promise.then(function(data){
          $scope.error = data[0].voteError;
          console.log('hit');
          console.log(data[0].votes);
          $scope.votes = data[0].votes;
        });
      };
//      console.log($scope.test);
    }
  );
}());
