'use strict';

var app = angular.module('controllers', []).
  value('version', '0.1');


app.controller("LoginController", function($scope, $location, AuthenticationService) {
  $scope.credentials = { email: "", password: "" };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials).success(function() {
      $location.path('/home');
    });
  };
});

app.controller("providersController", function($scope, providers) {
  $scope.providers = providers.data;
});

app.controller("servicetypesController",function($scope, servicetypes, servicetypesService) {
        $scope.servicetypes = servicetypes.data;
        $scope.usertypes = { name: "", created_at: "" };

        $scope.addServiceType = function() {
                 servicetypesService.addType($scope.usertypes).then(function(d) {
                         $scope.servicetypes.push(d);
                         $scope.usertypes = { name: "", created_at: "" };
                });
        };

        $scope.delete = function ( idx ) {
                var stype_to_delete = $scope.servicetypes[idx];

                servicetypesService.deleteType(stype_to_delete).success(function () {
                        $scope.servicetypes.splice(idx, 1);
                });
        };
});

app.controller("servicesController",function($scope, $location, services, servicesService, servicetypesService, providersService) {
	$scope.services = services.data;
  $scope.userservice = { stype: "", start: "", end: "", provider: "", cost: "", note: ""};
  $scope.providerList = [];
  $scope.testTypes = [];
  servicetypesService.get().then(function(d) {
    $scope.testTypes = d.data;
  });
  providersService.get().then(function(d) {
    $scope.providerList = d.data;
  })
  $scope.addService = function() {
      servicesService.addService($scope.userservice).success(function() {
        $location.path('/services');
      })
  };
});

app.controller("HomeController", function($scope, $location, AuthenticationService) {
  $scope.title = "Choose your adventure";
  $scope.message = "Click image to maintain";

  $scope.logout = function() {
    AuthenticationService.logout().success(function() {
      $location.path('/login');
    });
  };

  $scope.go = function ( path ) {
  $location.path( path );
  };
});
