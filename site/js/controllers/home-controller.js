angular.module('JeffreyHome').controller('HomeController', function($scope, $location, $anchorScroll) {
    $scope.gotoTop = function() {
        $location.hash('top');
        $anchorScroll();
    };
});
