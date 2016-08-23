angular.module('JeffreyHome').directive('noteBrief', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/note-brief.html',
        scope: {
            header: '<',
            date: '<'
        }
    };
});
