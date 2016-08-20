angular.module('JeffreyHome').directive('btnRow', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/btn-row.html',
        scope: {
            btns: '<',
            active: '='
        },
        link: function(scope, elements, attrs) {
            
        }
    };
});
