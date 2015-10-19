// Code goes here

(function() {
  
 var app = angular.module("main", []);
    var maincontroller = function($scope, $http, $interval, $log, $location, $anchorScroll, github) {

    var onusercomplete = function(response) {
      $scope.user = response.data;
    
    $http.get($scope.user.repos_url)
            .then(onRepos,onError);
            $location.hash("userdetails");
            $anchorScroll();
            
    };
    
    var decrementcountdown = function()
    {
     $scope.countdown-=1;
     if($scope.countdown<1)
     {
       $scope.search($scope.username);
       
     }
     
      
    };
  
    var countdownInterval = null;
  var startcountdown = function()
  {
    countdownInterval = $interval(decrementcountdown,1000,$scope.countdown);
    
    
  };
    
    var onRepos = function(response)
    {
      $scope.Rep = response.data;
      
      
    };
    
    $scope.search = function(username)
    {
      $log.info("searching for " + username);
      username = username == undefined ? 'ssntosh' : username;
        github.getuser(username).then(onusercomplete, onError);
     if(countdownInterval)
     {
       $interval.cancel(countdownInterval);
       $scope.countdown= null;
     }
      
      
    };
    var onError = function(reason) {
      $scope.error1 = "Error accured";


    };

    $scope.countdown="10";
  startcountdown();

  };
      app.controller("maincontroller", ["$scope","$http","$interval","$log","$location","$anchorScroll","github",maincontroller]);

}());
