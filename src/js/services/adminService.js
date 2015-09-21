(function () {
    angular.module('EEK.services')
        .factory('adminService',
            function ($resource, $cookies) {
                return {
                    login: function () {
                        return $resource('/v1/auth/login'); //NOTE could be temporarily the signup API
                    },
                    getCookieValue: function (key) {
                        return $cookies.get(key);
                    }
                };
        });
}());
