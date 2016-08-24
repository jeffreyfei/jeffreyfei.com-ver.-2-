angular.module('JeffreyHome').controller('VerifyController', function($scope, $routeParams, Review) {
    $scope.iconClass = '';
    $scope.msg = '';
    Review.verify($routeParams.id).then(function(response) {
        $scope.msg = 'Thank you for verifying your E-Mail!';
        $scope.iconClass = 'check';
    }, function(response) {
        $scope.msg = 'Verification failed. Please try again later.';
        $scope.iconClass = 'times';
    });
});
