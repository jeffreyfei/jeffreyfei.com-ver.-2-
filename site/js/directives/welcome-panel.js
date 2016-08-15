angular.module('JeffreyHome').directive('welcomePanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/welcome-panel.html',
        scope: {},
        link: function(scope, elements, attrs) {
            $(".description-text").typed({
                strings: ['> ^500 Designer, ^1000 Builder, ^1000 Problem Solver'],
                typeSpeed: 0
            });
        }
    };
});
