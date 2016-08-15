angular.module('JeffreyHome').directive('navBar', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/nav-bar.html',
        scope: {},
        link: function(scope, elements, attrs) {
            scope.isInvert = true;
            scope.makeInvert = function() {
                scope.isInvert = true;
            };
            scope.makeNormal = function() {
                scope.isInvert = false;
            };
        }
    };
});
