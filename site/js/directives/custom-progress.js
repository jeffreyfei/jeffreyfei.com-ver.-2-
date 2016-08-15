angular.module('JeffreyHome').directive('customProgress', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/custom-progress.html',
        scope: {
            header: '@customHeader',
            date: '@date'
        },
        link: function(scope, elements, attrs) {
            scope.getPercent = function(date) {
                var currTime = new Date().getTime();
                var maxLength = 31556952000;
                var currLength = currTime - Date.parse(date);
                if(currLength >= maxLength) {
                    return 80;
                } else { 
                    var percent = ((currLength / maxLength) * 70);
                    if(percent <= 25) {
                        return 25;
                    }
                    return percent;
                }
            }
            scope.getLength = function(date) {
                var difference = new Date().getTime() - new Date(date);
                var miliYr = 31556952000;
                var miliMon = miliYr / 12;
                if(difference >= miliYr) {
                    var length = Math.floor(difference / miliYr);
                    if(length > 1) {
                        return length + ' years';
                    } else {
                        return '1 year';
                    }
                } else if(difference <= miliYr && difference >= miliMon) {
                    var length = Math.ceil(difference / miliMon) + ' months';
                    return length;
                } else {
                    return '1 month';
                }
            }
        }
    };
});
