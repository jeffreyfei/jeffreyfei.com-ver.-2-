angular.module('JeffreyHome').directive('projectInfo', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/project-info.html',
        scope: {
            header: '<',
            githubLink: '<',
            extLink:'<',
            date: '<',
            desc: '<',
            tech: '<',
            members: '<'
        }
    };
});
