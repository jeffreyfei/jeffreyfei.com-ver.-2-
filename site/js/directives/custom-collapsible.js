angular.module('JeffreyHome').directive('customCollapsible', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/custom-collapsible.html',
        scope: {
            header: '@',
            subHeader: '@',
            details: '<'
        },
        link: function(scope, elements, attrs) {
            scope.isCollapsed = true;
            scope.iconClass = 'down';
            scope.toggleCollapse = function() {
                scope.isCollapsed = !scope.isCollapsed;
                if(scope.isCollapsed) {
                    scope.iconClass = 'down';
                } else {
                    scope.iconClass = 'up';
                }
            };
        }
    };
});
