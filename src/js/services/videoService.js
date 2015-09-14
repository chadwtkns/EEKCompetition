(function () {
    angular.module('EEK.services')
      .factory('videoService',
          function ($resource) {
              return {
                  getVideos: function () {
                      return $resource('/v1/video');
                  },
                  getShareableVideo: function (videoId) {
                      return $resource('/v1/video/' + videoId);
                  },
                  postVideos: function () {
                      return $resource('/v1/video');
                  },
                  updateVotes: function (videoId) {
                    console.log(videoId);
                    return $resource('/v1/video/' + videoId, null,{method:'put'});
                  }
              };
      })
      .factory('updateService', function($resource){
        return $resource('/v1/video/:id', null,
        {
            'update': { method:'PUT' }
        });

      });
}());
