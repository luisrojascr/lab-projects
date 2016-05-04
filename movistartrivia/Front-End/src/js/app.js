//angular.module('movistarStarWarsApp', ['angular-route', 'ui.bootstrap', 'ngAnimate']);
angular.module('movistarStarWarsApp', ['ngAnimate', 'ui.bootstrap', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/cinemarkCityMall', {
        templateUrl: 'views/cinemarkCityMall.html',
        controller: 'CinemarkCityMallCtrl'
      }).
      when('/cinemarkEscazu', {
        templateUrl: 'views/cinemarkEscazu.html',
        controller: 'CinemarkEscazuCtrl'
      }).
      when('/cinepolisLincoln', {
        templateUrl: 'views/cinepolisLincoln.html',
        controller: 'CinepolisLincolnCtrl'
      }).
      when('/cinepolisPaseo', {
        templateUrl: 'views/cinepolisPaseo.html',
        controller: 'CinepolisPaseoCtrl'
      }).
      when('/cinepolisTerra', {
        templateUrl: 'views/cinepolisTerra.html',
        controller: 'CinepolisTerraCtrl'
      }).
      when('/photos', {
        templateUrl: 'views/photos.html',
        controller:  'PhotosCtrl',
      }).
      when('/landing', {
        templateUrl: 'views/landing.html'
      }).
      otherwise({
        redirectTo: '/landing'
      });
}]);