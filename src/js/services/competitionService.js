(function () {
    angular.module('EEK.services')
        .factory('competitionService',
            function ($resource) {
                return {
                    getCats: function () {
                        return $resource('/v1/admin/cats');
                    }
                };
        });
}());
