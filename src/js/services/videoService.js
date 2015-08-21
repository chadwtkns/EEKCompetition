(function () {
    angular.module('EEK.services')
        .factory('videoService',
            function ($resource) {
                return {
                    getVideos: function () {
                        return $resource('/v1/video');
                    }
                };
        });
}());
