angular.module('JeffreyHome').directive('termProgress', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/term-progress.html',
        scope: {
            term: '<',
            startDate: '<',
            courses: '<'
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
            scope.getPercent = function(date) {
                var currTime = new Date().getTime();
                var start = Date.parse(date);
                var end = start + (4 * 2629746000);
                if(currTime >= end) {
                    return 100;
                } if(currTime <= start) {
                    return 0; 
                } else {
                    var duration = end - start;
                    var currDuration = currTime - start;
                    return Math.floor((currDuration / duration) * 100);
                }
            };
            scope.getText = function(date) {
                if(scope.getPercent(date) === 100) {
                    return 'Complete';
                } else {
                    return '';
                }
            };
        }
    };
});
