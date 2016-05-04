//angular.module('movistarStarWarsApp', ['angular-route', 'ui.bootstrap', 'ngAnimate']);
angular.module('movistarStarWarsApp', ['ngAnimate', 'ui.bootstrap', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/cinemarkCityMall', {
        templateUrl: 'views/cinemarkCityMall.html',
        controller: 'CinemarkCityMallCtrl'
      }).
      when('/cinemarkEscazu', {
        templateUrl: 'views/cinemarkEscazu.html',
        controller: 'CinemarkEscazuCtrl'
      }).
      when('/cinepolisLincoln', {
        templateUrl: 'views/cinepolisLincoln.html',
        controller: 'CinepolisLincolnCtrl'
      }).
      when('/cinepolisPaseo', {
        templateUrl: 'views/cinepolisPaseo.html',
        controller: 'CinepolisPaseoCtrl'
      }).
      when('/cinepolisTerra', {
        templateUrl: 'views/cinepolisTerra.html',
        controller: 'CinepolisTerraCtrl'
      }).
      when('/photos', {
        templateUrl: 'views/photos.html',
        controller:  'PhotosCtrl',
      }).
      when('/landing', {
        templateUrl: 'views/landing.html'
      }).
      otherwise({
        redirectTo: '/landing'
      });
}]);
angular.module('movistarStarWarsApp').controller('CinemarkCityMallCtrl', function ($scope, $http) {

  $scope.oneAtATime = true;
  
  $scope.getData = function(){
    $http.get("http://ec2-54-200-186-193.us-west-2.compute.amazonaws.com/trivia.php", {cache: false}).then(function (response) {
    $scope.results = response.data;
    
        
    }); 

  }
  $scope.reloadData = function(){
    $scope.results = "";
    $scope.getData();
  }
  $scope.getData();
  
});
angular.module('movistarStarWarsApp').controller('CinemarkEscazuCtrl', function ($scope, $http) {

  $scope.oneAtATime = true;
  
   $scope.getData = function(){
     $http.get("http://ec2-54-201-195-40.us-west-2.compute.amazonaws.com/trivia.php").then(function(response) {
        $scope.results = response.data;

      });
   }
   
   $scope.reloadData = function(){
    $scope.results = "";
    $scope.getData();
  }
  $scope.getData();
  
});
angular.module('movistarStarWarsApp').controller('CinepolisLincolnCtrl', function ($scope, $http) {

  $scope.oneAtATime = true;
  
  $scope.getData = function(){
    $http.get("http://ec2-54-200-155-98.us-west-2.compute.amazonaws.com/trivia.php").then(function(response) {
      $scope.results = response.data;

    });
  }
  
  $scope.reloadData = function(){
    $scope.results = "";
    $scope.getData();
  }
  $scope.getData();
  
});
angular.module('movistarStarWarsApp').controller('CinepolisPaseoCtrl', function ($scope, $http) {

  $scope.oneAtATime = true;
  
  $scope.getData = function(){
    $http.get("http://ec2-54-200-213-19.us-west-2.compute.amazonaws.com/trivia.php").then(function(response) {
      $scope.results = response.data;

    });
  }
  
  $scope.reloadData = function(){
    $scope.results = "";
    $scope.getData();
  }
  $scope.getData();
  
});
angular.module('movistarStarWarsApp').controller('CinepolisTerraCtrl', function ($scope, $http) {

  $scope.oneAtATime = true;
  
  $scope.getData = function(){
    $http.get("http://ec2-54-201-215-112.us-west-2.compute.amazonaws.com/trivia.php").then(function(response) {
      $scope.results = response.data;

    });
  }
  
  $scope.reloadData = function(){
    $scope.results = "";
    $scope.getData();
  }
  $scope.getData();
  
});
angular.module('movistarStarWarsApp').controller('MainCtrl', function ($scope) {

  
});
angular.module('movistarStarWarsApp').controller('PhotosCtrl', function ($scope, $http) {

  $scope.oneAtATime = true;
  
  $http.get("http://ec2-54-200-186-193.us-west-2.compute.amazonaws.com/pictures.php").then(function(response) {
    $scope.results = response.data;
    
    console.log($scope.results);
  });
  
});
angular.module('movistarStarWarsApp').directive('myControlPanel', function () {
  // ...
});

angular.module('movistarStarWarsApp').service('MyCtrl', function () {
  // ...
});
/* 
 * Version: v1.0
 * Author:  Luis Rojas
 * Created on : Dec 10, 2015
 * Custom scripts
 
 */ 


//Questions Accordion
function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);