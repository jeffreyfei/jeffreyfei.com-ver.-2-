angular.module('JeffreyHome').controller('NoteController', function($scope, $window, $routeParams, $uibModal, Notes) {
    // Get note information
    Notes.note($routeParams.note).then(function(response) {
        $scope.note = response.data;
    }, function(response) {
        $scope.note = {};
        $window.alert('Connection failed : ' + response.data);
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
