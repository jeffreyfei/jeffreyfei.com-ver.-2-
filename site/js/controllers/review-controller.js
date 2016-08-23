angular.module('JeffreyHome').controller('ReviewController', function($scope, $uibModalInstance, $routeParams) {
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.newReview = {};
    // Handle the like button
    $scope.like = function() {
        // Deactiviate button if its clicked again
        if($scope.newReview.like === true) {
            $scope.newReview.like = undefined;
        } else {
            $scope.newReview.like = true;
        }
    };
    // Handle the dislike button
    $scope.unlike = function() {
        if($scope.newReview.like === false) {
            $scope.newReview.like = undefined;
        } else {
            $scope.newReview.like = false;
        }
    };
});
