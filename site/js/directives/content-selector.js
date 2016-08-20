angular.module('JeffreyHome').directive('contentSelector', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/content-selector.html',
        scope: {
            contents: '<',
            currentContent: '=' 
        },
        link: function(scope, elements, attrs) {
            scope.currentContent = scope.contents[0];
            var currentPage = 0;
            scope.toggleRight = function() {
                if(currentPage + 1 === scope.contents.length) {
                    currentPage = 0; 
                } else {
                    currentPage++;
                }
                scope.currentContent = scope.contents[currentPage];
            };
            scope.toogleLeft = function() {
                if(currentPage === 0) {
                    currentPage = scope.contents.length - 1;
                } else {
                    currentPage--;
                }
                scope.currentContent = scope.contents[currentPage];
            }
        }
    };
});
