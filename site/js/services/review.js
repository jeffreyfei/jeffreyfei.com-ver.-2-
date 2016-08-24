angular.module('JeffreyHome').factory('Review', function ReviewFactory($http) {
    return {
        post: function(noteName, review) {
            return $http({method: 'POST', url: '/review/note/'+noteName, data: review});
        },
        get: function(noteName) {
            return $http({method: 'GET', url: '/review/note/'+noteName});
        },
        verify: function(id) {
            return $http({method: 'POST', url: '/review/verify/'+id});
        }
    };
});
