/**
 * Created by Administrator on 2016/4/16.
 */
angular.module('myApp',[]).controller('MyController',function($scope,$timeout) {
    var updateClock = function () {
        $scope.Clock = new Date();
        $timeout(function () {
            updateClock();
        }, 1000);
    };
    updateClock();
    $scope.Clock={
        now:new Date()
    };
    var updateClock = function(){
        $scope.Clock.now= new Date();

    };
    setInterval(function(){
        $scope.$apply(updateClock)
    },1000);
    updateClock();
});

