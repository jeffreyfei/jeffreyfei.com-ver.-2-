angular.module('JeffreyHome').factory('Notes', function NotesFactory($http) {
    return {
        terms: function() {
            return $http({method: 'GET', url: '/noteSvc/terms'});
        },
        courses: function(term) {
            return $http({method: 'GET', url: '/noteSvc/courses/term/' + term});
        },
        notes: function(course) {
            return $http({method: 'GET', url: '/noteSvc/courses/notes/' + course});
        },
        note: function(note) {
            return $http({method: 'GET', url: '/noteSvc/courses/search/' + note});
        }
    };
});
