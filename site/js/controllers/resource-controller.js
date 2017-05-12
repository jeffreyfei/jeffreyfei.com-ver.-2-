angular.module('JeffreyHome').controller('ResourceController', function($scope, $window, Notes) {
    const seasonOrder = {
        'Winter': 0,
        'Spring': 1,
        'Fall': 2
    };
    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.loading = true;
    function paginate(data){
        let compare = function(a, b) {
            if(a.timestamp > b.timestamp) {
                return -1;
            }
            if(a.timestamp < b.timestamp) {
                return 1;
            }
            return 0;
        };
        data.sort(compare);
        for(let i = 0, page = 0; i < data.length; i++) {
            if(i%15 === 0) {
                page++;
            }
            data[i].page = page;
        }
        return data;
    };
    function sortTerm(terms){
        return terms.sort(function(term1, term2) {
            let term1Arr = term1.split(' ');
            let term2Arr = term2.split(' ');
            if (parseInt(term1Arr[1]) > parseInt(term2Arr[1])) {
                return -1;
            } else if (parseInt(term1Arr[1]) < parseInt(term2Arr[1])) {
                return 1;
            } else {
                return seasonOrder[term2Arr[0]] - seasonOrder[term1Arr[0]];
            }
        });
    };
    Notes.terms().then(function(response) {
        $scope.terms = sortTerm(response.data);
        $scope.$emit('update-term', response.data[0]);        
    }, function(response) {
        $scope.terms = [];
        $window.alert('Connection Failed : ' + response.data);
    });
    $scope.$on('update-term', function(event, data) {
        Notes.courses(data).then(function(response) {
            $scope.subjects = response.data.sort();
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
});
