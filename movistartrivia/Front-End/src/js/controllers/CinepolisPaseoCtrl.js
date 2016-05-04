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