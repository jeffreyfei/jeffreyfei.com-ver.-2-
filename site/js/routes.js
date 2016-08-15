angular.module('JeffreyHome').config(function($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/home'
        })
        .when('/home', {
            templateUrl: 'templates/pages/home/index.html',
            controller: 'HomeController'
        })
        .when('/projects', {
            templateUrl: 'templates/pages/projects/index.html',
            controller: 'ProjectController'
        })
        .when('/resources', {
            templateUrl: 'templates/pages/resources/index.html',
            controller: 'ResourceController'
        })
        .when('/resume', {
            templateUrl: 'templates/pages/resume/index.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});
