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
                  playVideo: function () {
                    var client = new BinaryClient('ws://localhost:4021');
                      client.on('stream', function(stream, meta){
                        var parts = [];
                        stream.on('data', function(data){
                          parts.push(data);
                        });
                        stream.on('end', function(){
                          var vid = document.createElement("video");
                          vid.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
                          var att = document.createAttribute("controls");
                          vid.setAttributeNode(att);
                          document.body.appendChild(vid);
                          client.close();
                        });
                      });
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
            'update': { method:'PUT', isArray: true }
        });

      });
}());
