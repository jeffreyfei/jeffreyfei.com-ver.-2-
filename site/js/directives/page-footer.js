angular.module('JeffreyHome').directive('pageFooter', function($location, $anchorScroll) {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/page-footer.html',
        scope: {
            links: '<'
        },
        link: function(scope, elements, attrs) {
            scope.gotoTop = function() {
                $location.hash('top');
                $anchorScroll;
            };
        }
    };
});
