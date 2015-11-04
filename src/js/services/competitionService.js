(function () {
    angular.module('EEK.services')
        .factory('competitionService',
            function ($resource) {
                return {
                  getRealJson: function (fileName) {
                    return $resource('json/:file.json', {file:fileName});
                  }
                };
        });
}());
