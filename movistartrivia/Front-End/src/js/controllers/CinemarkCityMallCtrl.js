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