angular.module('JeffreyHome').directive('academicsPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/academics-panel.html',
        scope: {},
        link: function(scope, elements, attrs) {
            scope.terms = [{
                header: 'First year | Term A',
                start: '2015-09',
                courses: [
                    'MATH 117 | Caculus 1 for Engineering',
                    'MATH 115 | Linear Algebra',
                    'CS 137 | Programming Principles',
                    'ECE 140 | Linear Circuits',
                    'ECE 105 | Physics of Eletrical Engineering'
                ]
            },{
                header: 'First year | Term B',
                start: '2016-01',
                courses: [
                    'MATH 119 | Calculus 2 for Engineering',
                    'MATH 135 | Algebra for Honours Mathematics',
                    'CS 138 | Intro to Data Abstration and Implementation',
                    'ECE 124 | Digital Circuits and Systems',
                    'ECE 106 | Physics of Electrical Engineering 2'
                ]
            },{
                header: 'Second year | Term A',
                start: '2016-09',
                courses: [
                    'CS 241 | Foundations of Sequential Programming',
                    'SE 212 | Logic and Computation',
                    'STAT 206 | Statistics of Software Engineering',
                    'ECE 222 | Digital Computers',
                    'CHE 102 | Chemistry for Engineers',
                    'SPCOM 223 | Public Speaking'
                ]
            }];
        }
    };
});
