angular.module('JeffreyHome').controller('NoteController', function($scope, $window, $routeParams, $uibModal, Notes, Review) {
    // Get note information
    Notes.note($routeParams.note).then(function(response) {
        $scope.note = response.data;
    }, function(response) {
        $scope.note = {};
        $window.alert('Error : ' + response.data);
    });
    // Get comments
    Review.get($routeParams.note).then(function(response) {
        $scope.reviews = response.data;
    }, function(response) {
        $scope.reviews = [];
        $window.alert('Error : ' + response.data);
    });
    // Open review modal
    $scope.openReview = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'templates/modals/review.html',
            controller: 'ReviewController',
            size: 'lg'
        });
        modalInstance.result.then(function(newReview) {
            // Append new comment to the review list
            $scope.reviews.push(newReview);
        }, function() {
            console.log('review window closed');
        });
    };
});
