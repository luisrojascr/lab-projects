/* 
 * Version: v0.1
 * Author:  Luis Rojas
 * Description: Edmodo assigments application
 * Modified on : May 15, 2016
*/ 

'use strict';

(function() {

  angular.module('assigmentsApp', ['ngAnimate', 'ui.bootstrap', 'ngRoute'])

  .config(['$routeProvider', function($routeProvider) { 
      $routeProvider.
        when('/', {
          templateUrl: 'views/new-assigment.html',
          controller: 'SelectAssigmentCtrl'
        }).
        when('/new-assigment', {
          templateUrl: 'views/select-assigment.html',
          controller: 'SelectAssigmentCtrl'
        }).
        when('/assigment/:id', {
          templateUrl: 'views/assigment.html',
          controller: 'AssigmentCtrl',
          activetab: 'assigment'
        }).
        when('/submission/:id', {
          templateUrl: 'views/submission.html',
          controller: 'SubmissionCtrl',
          activetab: 'submission'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);
}());
(function() {
  
   angular.module('assigmentsApp')
    .factory('AssigmentsService', function(){ 
     
      var assigmentid = 0;

      return {
        getAssigmentid : function(){
          return assigmentid;
        },
        setAssigmentid : function(value){
          assigmentid = value;
        } 
      };
      
    });
}());
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
(function() {
   angular.module('assigmentsApp')
    .controller('SelectAssigmentCtrl', function($scope, $rootScope,$http, $location, $routeParams, $route, $filter, AssigmentsService){

      $scope.apartment = [];

      $http.get("https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d").then(function(response) {
        $scope.assigments = response.data;

      });
     
   })
   
   
}());
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