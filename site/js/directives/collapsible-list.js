angular.module('JeffreyHome').directive('collapsibleList', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/collapsible-list.html',
        scope: {
            header: '<',
            items: '<'
        },
        link: function(scope, elements, attrs) {
            scope.iconClass = 'down';
            scope.isCollapsed = true;
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
