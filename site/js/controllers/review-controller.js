angular.module('JeffreyHome').controller('ReviewController', function($scope, $uibModalInstance, $routeParams, Review) {
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
    $scope.contentHide = false;
    $scope.submitHide = false;
    $scope.msg = '';
    $scope.postReview = function() {
        // Get a formatted date for instant display
        $scope.newReview.date = new Date().toDateString().split(' ').splice(1, 4).join(' ');
        $scope.newReview.timestamp = Date.now() + '';
        $scope.submitHide = true;
        Review.post($routeParams.note, $scope.newReview).then(function(response) {
            if(response.data === 'review added') {
                $uibModalInstance.close($scope.newReview);    
            } else if(response.data === 'verification sent') {
                $scope.contentHide = true;
                $scope.msg = 'Thank you for commenting! Since you are a first time user, a verification E-Mail is sent to ' + $scope.newReview.email + '. Please check your mail box.';
            } else {
                $uibModalInstance.close();
            }
        }, function(response) {
            $scope.contentHide = true;
            if(response.status === 401 && response.data === 'not-waterloo') {
                $scope.msg = 'Please enter a UWaterloo E-Mail';
            } else {
                $scope.msg = 'Error : ' + response.data; 
            }
        });
    };
});
