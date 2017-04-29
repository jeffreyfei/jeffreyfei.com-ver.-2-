angular.module('JeffreyHome').factory('States', function StatesFactory() {
    var state = {};
    return {
        setState: function(newState) {
            state = newState;
        },
        currentState: function() {
            return state;
        }
    };
});
