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