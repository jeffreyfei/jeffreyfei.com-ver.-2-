angular.module('JeffreyHome').controller('ProjectController', function($scope, $location, $anchorScroll) {
    $scope.projects = [{
            header: 'Share My Notes',
            date: 'Nov 2017 - Present',
            github: 'https://github.com/jeffreyfei/share-my-notes',
            desc: ['Created a horizontally scalable note sharing service in Go', 'Designed and developed load balancing strategy based on real time server status that allows requests to be diverted to servers with less pending jobs', 'Implemented job buffer for provider server which mitigates performance drops when processing large amounts of client requests'],
            tech: ['Go']
        },
        {
            header: 'Kontex',
            date: 'Nov 2017 - Present',
            github: 'https://github.com/jeffreyfei/kontex',
            desc: ['Implemented automatic feature extractions on sentences such as sentence to title similarity and sentence to sentence cohesion', 'Utilized the extracted sentence features and scikit-learn’s Naïve Baye’s classifier to train a predictive Machine Learning model'],
            tech: ['Python', 'scikit-learn'],
            members: ['William Lo']
        },
        {
            header: 'Aerodrifting Systems Online',
            date: 'Jan 2017 - Present',
            link: 'http://aerodriftingsystems.com/',
            desc: ['A fullstacks eCommerce solution designed for Aerodrifting Systems, which is a retailer specialized in custom built PCs based in Los Angeles, California.','Users are given the option to either purchase from existing templates within the store, or build their own custom PCs using the builder functionality of the site. The site allows users to sign in with their Google account and has a user-associated payment system powered by Paypal, which allows users to keep track of their orders and communicate with the store owner with ease.'],
            tech: ['Vue.js', 'Node.js', 'Redis', 'Google OAuth2', 'Paypal API']
        },
        {
            header: 'Game of Green',
            date: 'Jan 2017 (SMART Intern Hackthon)',
            github: 'https://github.com/andrewmcewen/2017winter-intern-project',
            desc: ['An online educational game intended to teach young students about basic concepts of environmental science, such as the preservation of natural resources', 'The game keeps track of data such as the student\'s daily energy consumption and water usage to create an record of an individual\'s environmental footprint. Each student represents a fictional city within the game, and the visual effects of the environment changes according to the students performance.'],
            tech: ['Vue.js', 'Node.js', 'PostgreSQL'],
            members: ['Andrew McEwen', 'Daren Wang', 'Ryan Liu', 'Ken Zhang', 'Kai Rusch', 'Anoop Dhaliwal', 'Pushpak Kumar', 'Kamil Zielinski', 'Max Webber', 'Jerusha Chua', 'Richard Wan']
        },
        {
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
