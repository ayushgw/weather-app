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

  .when('/weather', {
    templateUrl: 'pages/weather.htm',
    controller: 'weatherController'
  })
});

//Services
weatherApp.service('cityService', function($resource){
  this.city = 'Hyderabad';

  //API Call
  this.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/weather');
  this.forecastAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily");

});

//Custom Filter
weatherApp.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

//Controllers
weatherApp.controller('homeController', ['$scope', 'cityService',function($scope, cityService){
  $scope.city = cityService.city;

  $scope.$watch('city', function(){
    cityService.city = $scope.city;
  });
}]);

weatherApp.controller('weatherController', ['$scope', 'cityService',function($scope, cityService){
  $scope.city = cityService.city;

  $scope.weatherResult = cityService.weatherAPI.get({q:$scope.city, appid:'c32698499c980065641adfae843a6d8d'});
  console.log($scope.weatherResult);

  //Date & Temp Conversion
  $scope.convertTemp = function(degK){
    return Math.round(degK - 273.15);
  }
  $scope.convertDate = function(dt){
    return new Date(dt * 1000);
  }
}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', '$resource', 'cityService', function($scope, $routeParams, $resource, cityService){
  $scope.city = cityService.city;
  $scope.days = $routeParams.days || '2';

  //API Call
  $scope.forecastResult = cityService.forecastAPI.get({ q:$scope.city, cnt:$scope.days, appid:'c32698499c980065641adfae843a6d8d'});
  console.log($scope.forecastResult);

  //Date & Temp Conversion
  $scope.convertTemp = function(degK){
    return Math.round(degK - 273.15);
  }
  $scope.convertDate = function(dt){
    return new Date(dt * 1000);
  }
}]);
