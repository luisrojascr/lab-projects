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