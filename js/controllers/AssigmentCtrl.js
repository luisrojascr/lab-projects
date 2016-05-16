(function() {
   angular.module('assigmentsApp')
    .controller('AssigmentCtrl', function($scope, $rootScope,$http, $location, $routeParams, $route,  AssigmentsService){
    
    $scope.$route = $route;
    
    $scope.showTabs = false;
    
    $http.get("https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d").then(function(response) {
      $scope.assigments = response.data;

      var idParam = parseInt($routeParams.id);
     
      $scope.id = idParam;
     
      if(idParam){
      	$scope.showTabs = true;
      	AssigmentsService.setAssigmentid(idParam);
      }
     
      $scope.setAssigment = function(val){
        AssigmentsService.setAssigmentid(val);
        $scope.id = val;
        $scope.showTabs = true;
      }
      
      AssigmentsService.setAssigmentid( $scope.id ); 
     
      for(var i = 0; i < $scope.assigments.length; i++){
         if( parseInt($scope.assigments[i].id) === idParam ){
            $scope.assigment = $scope.assigments[i];
            
         }
      }
      
    });
     
   })
   
   
}());