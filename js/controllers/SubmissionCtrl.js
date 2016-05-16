(function() {
   angular.module('assigmentsApp')
    .controller('SubmissionCtrl', function($scope, $rootScope,$http, $location, $routeParams, $route, AssigmentsService){
     
    $http.get("https://api.edmodo.com/assignment_submissions?&assignment_creator_id=73240721&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d").then(function(response) {
      $scope.totalSubmissions = response.data;
     
      $scope.submissions = [];
     
      var idParam = parseInt($routeParams.id);
     
      if(idParam){
      	$scope.showTabs = true;
      	AssigmentsService.setAssigmentid(idParam);
      }
     
      $scope.id = AssigmentsService.getAssigmentid();

      for(var i = 0; i < $scope.totalSubmissions.length; i++){
       
         if( parseInt($scope.totalSubmissions[i].assignment_id) === $scope.id ){
            $scope.submissions.push($scope.totalSubmissions[i]);
         }
      }
     
    });
     
   })
   
   
}());