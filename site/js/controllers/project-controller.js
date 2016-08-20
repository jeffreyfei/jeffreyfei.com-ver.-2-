angular.module('JeffreyHome').controller('ProjectController', function($scope, $location, $anchorScroll) {
    $scope.gotoTop = function() {
        $location.hash('top');
        $anchorScroll();
    };

    $scope.projects = [{
            header: 'Aerodrifting Systems Online',
            date: 'July 2016 - Aug 2016',
            link: 'http://aerodriftingsystems.com/',
            desc: ['A.D. Systems online is a retail platform built for Aerodrifting Systems located in Los Angeles, California. It is designed to work in correlation with the A.D. System ebay store, advertise products, and collect user feedbacks.','The site comes in with its own review and purchase request systems, which allows customers to voice their concerns and provides them with the option to stay in touch with the store directly rather than through third-party platforms such as ebay.'],
            tech: ['AngularJS', 'AngularUI Bootstrap', 'Node.js', 'Redis']
        },{
            header: 'Wat-Product',
            date: 'Jan 2016 - Feb 2016',
            github: 'https://github.com/ian952/Watson-Challenge',
            desc: ['A Web Application which rates a product that the user enters. It utilizes the News API of IBM Watson to search for articles about the product, and analyze the article using the Sentiment API. A rating is then assigned to the product by an algorithm within the program.'],
            tech: ['Bootstrap', 'Node.js', 'IBM Watson'],
            members: ['Ian Hu', 'William Lo']
        },{
            header: 'PT Now',
            date: 'Dec 2013 - Sep 2015',
            github: 'https://github.com/jeffreyfei/PT-Now',
            desc: ['PT Now is a desktop schedule keeping application designed for a TV screen that is currently being used in Pinetree Secondary School TV displays. Users are free to switch between the application\'s "Normal" and "Classic" mode. Under the "Normal" mode, an automatically synchronized digital clock is displayed on the right, and a dynamic class schedule with the current ongoing class highlighted on the left. Meanwhile, the "Classic" mode only displays digital clock.', 'PT Now also allows the user to manually set time, and it incorporates customizable settings regarding the date of the schedule change (In order to comply to the school district\'s schedule changes during the semester).'],
            tech: ['Java', 'Java Swing']
        },{
            header: 'Mayo',
            date: 'Oct 2015',
            link: 'https://youtu.be/o-mH6ScYlmU',
            github: 'https://github.com/jeffreyfei/mayo2',
            desc: ['Mayo is a desktop based gesture painter controlled by the Mayo Armband. Users can control the behaviour of the painter by inputting gestures such as a fist for inking, stretching fingers inward and outward to change the pen size, and spreading fingers for colour change.'],
            tech: ['Java', 'Java Swing', 'Myo Armband'],
            members: ['Ian Hu', 'Brian Ho']
        },{
            header: 'Tetrimino Simulator',
            date: 'Sep 2015 - Dec 2015',
            github: 'https://github.com/danyalraza/Tetris',
            desc: ['A fully functional Tetris game with the Launchpad Development Kit as the control unit. It includes basic functionalities such as horizontal translation and rotation of blocks on the gameboard using the Launchedpad as a joystick. It also includes other functionalities such as block holding, and displaying the upcoming block on the Launchpad LED screen.'],
            tech: ['Processing', 'Launchpad Development Kit'],
            members: ['Ian Hu', 'Brian Ho', 'William Lo', 'Danyal Raza']
        },{
            header: 'PolyCalc',
            date: 'Dec 2014 - Apr 2015',
            github: 'https://github.com/jeffreyfei/PolyCalc',
            desc: ['An Android mobile calculator that allows user to enter a polynomial equation of the n-th degree (e.g. x^3-2x^2+x-1), an upper bound and a lower bound to compute all real roots within the given range.'],
            tech: ['Java', 'Android SDK']
        }
    ];
});
