angular.module('JeffreyHome').controller('ResourceController', function($scope, $window, Notes, States) {
    $scope.currentState = States.currentState();
    if($scope.currentState.currentPage === {}) {
        $scope.currentPage = 1;
    } else {
        $scope.currentPage = $scope.currentState.currentPage;
        $scope.currentSubject = $scope.currentState.currentSubject;
        $scope.currentTerm = $scope.currentState.currentTerm;
    }
    $scope.itemsPerPage = 15;
    $scope.loading = true;
    var paginate = function(data) {
        var compare = function(a, b) {
            if(a.timestamp > b.timestamp) {
                return -1;
            }
            if(a.timestamp < b.timestamp) {
                return 1;
            }
            return 0;
        };
        data.sort(compare);
        for(var i = 0, page = 0; i < data.length; i++) {
            if(i%15 === 0) {
                page++;
            }
            data[i].page = page;
        }
        return data;
    };
    Notes.terms().then(function(response) {
        $scope.terms = response.data;
        $scope.$emit('update-term', response.data[0]);
        
    }, function(response) {
        $scope.terms = [];
        $window.alert('Connection Failed : ' + response.data);
    });
    $scope.$on('update-term', function(event, data) {
        Notes.courses(data).then(function(response) {
            $scope.subjects = response.data;
            $scope.currentSubject = response.data[0];
            $scope.$emit('update-notes', response.data[0]);
        }, function(response) {
            $scope.subjects = [];
            $scope.currentSubject = '';
            $window.alert('Connection Failed : ' + response.data);
        });

    });
    $scope.$on('update-notes', function(event, data) {
        Notes.notes(data).then(function(response) {
            $scope.notes = paginate(response.data);
            $scope.noteNum = response.data.length;
            $scope.loading = false;
        }, function(response) {
            $scope.notes = [];
            $window.alert('Connection Failed : ' + response.data);
        });
    });
    $scope.$watch('currentSubject', function() {
        if($scope.currentSubject !== undefined && $scope.currentSubject !== '') {
            $scope.$emit('update-notes', $scope.currentSubject);
        }
    });
    $scope.$watch('currentTerm', function() {
        if($scope.currentTerm !== undefined && $scope.currentTerm !== '') {
            $scope.$emit('update-term', $scope.currentTerm);
        }
    });
    $scope.$watch('currentPage', function() {
        currentState.currentPage = $        
    });
});
