//Modules
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//Routes
weatherApp.config(function($routeProvider){

  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.htm',
    controller: 'homeController'
  })

  .when('/forecast', {
    templateUrl: 'pages/forecast.htm',
    controller: 'forecastController'
  })

  .when('/forecast/:days', {
    templateUrl: 'pages/forecast.htm',
    controller: 'forecastController'
  })
});

//Services
weatherApp.service('cityService', function(){
  this.city = 'Hyderabad';
});

//Controllers
weatherApp.controller('homeController', ['$scope', 'cityService',function($scope, cityService){
  $scope.city = cityService.city;

  $scope.$watch('city', function(){
    cityService.city = $scope.city;
  });
}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', '$resource', 'cityService', function($scope, $routeParams, $resource, cityService){
  $scope.city = cityService.city;

  $scope.days = $routeParams.days || '2';

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
    callback: "JSON_CALLBACK"}, {
    get: {method:"JSONP"}
  });

  $scope.weatherResult = $scope.weatherAPI.get({ q:$scope.city, cnt:$scope.days, appid:'c32698499c980065641adfae843a6d8d'});
  console.log($scope.weatherResult);

  $scope.convertTemp = function(degK){
   return Math.round(degK - 273.15);
 }

  $scope.convertDate = function(dt){
    return new Date(dt * 1000);
  }
}]);
