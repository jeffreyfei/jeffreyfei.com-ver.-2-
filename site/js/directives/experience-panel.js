angular.module('JeffreyHome').directive('experiencePanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/experience-panel.html',
        scope: {},
        link: function(scope, elements, attrs) {
            scope.emcInfo = {
                header: 'Software Engineer Co-op | EMC',
                subHeader: 'May 2016 - Aug 2016',
                details: {
                    'Prescan Dashboard': [
                        'Implemented AngularJS and Bootstrap to build a user-friendly web interface displaying montly build reports with advanced filtering functionalities',
                        'Constructed Node.js backend integrated with data-mining capabilities which not only supports a dynamic frontend interface but also enables automated file upload from build machines using its REST API'
                    ],
                    'Outstanding Owner Issues Audit': [
                        'Server-side command line tool created by Python to automate user reassiginments over the Coverity static analysis platform',
                        'Reassigned issue reports owned by inactive users by cross referencing Coverity user data and corporate LDAP server using Coverity SOAP API'
                    ],
                    'Coverity-Bugzilla Cross-reference': [
                        'Server-side Python script that enables communication between Coverity and Bugzilla by utilizing the Coverity SOAP API and Bugzilla REST API',
                        'Identifies the corresponding Bugzilla reports of newly detected issues queried from Coverity by data-mining the Perforce change history',
                        'Automatically updates Bugzilla reports by utilizing its REST API with data acquired from Coverity'
                    ],
                    'Purify-Coverity Importer': [
                        'Server-side Python script that performs data-mining on logs produced by the Purify dynamic analysis platform to the Coverity web interface',
                        'Enabled easy access to software issue reports produced by two analytic process on a single platform'
                    ] 
                }
            };
            scope.adSysInfo = {
                header: 'Full Stacks Development | Aerodrifting Systems',
                subHeader: 'July 2016 - Aug 2016',
                details: {
                    'Aerodriting Systems Online' : [
                        'Utilized AngularJS and AngularUI Bootstrap to build a customer-oriented retail interface that works in correlation with its ebay store to provide the guest with an improved shopping experience',
                        'Implemented customer review and purchase request system using a Node.js backend with a Redis database'
                    ]
                }
            }
        }
    };
});
