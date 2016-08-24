angular.module('JeffreyHome').directive('reviewBox', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/review-box.html',
        scope: {
            header: '<',
            date: '<',
            name: '<',
            comment: '<',
            like: '<'
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
