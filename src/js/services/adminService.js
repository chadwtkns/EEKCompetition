(function () {
    angular.module('EEK.services')
        .factory('adminService',
            function ($resource) {
                return {
                    login: function () {
                        return $resource('/v1/auth/login'); //NOTE could be temporarily the signup API
                    }
                };
        });
}());
