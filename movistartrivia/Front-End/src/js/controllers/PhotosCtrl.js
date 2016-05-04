angular.module('movistarStarWarsApp').controller('PhotosCtrl', function ($scope, $http) {

  $scope.oneAtATime = true;
  
  $http.get("http://ec2-54-200-186-193.us-west-2.compute.amazonaws.com/pictures.php").then(function(response) {
    $scope.results = response.data;
    
    console.log($scope.results);
  });
  
});