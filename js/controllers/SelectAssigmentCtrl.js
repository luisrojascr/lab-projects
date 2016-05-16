(function() {
   angular.module('assigmentsApp')
    .controller('SelectAssigmentCtrl', function($scope, $rootScope,$http, $location, $routeParams, $route, $filter, AssigmentsService){

      $scope.apartment = [];

      $http.get("https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d").then(function(response) {
        $scope.assigments = response.data;

      });
     
   })
   
   
}());