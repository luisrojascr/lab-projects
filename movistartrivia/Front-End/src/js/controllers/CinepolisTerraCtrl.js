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