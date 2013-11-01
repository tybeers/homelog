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

app.controller("providersController", function($scope, $location, providers, providersService) {
  $scope.providers = providers.data;
  $scope.userprovider = { name: "", rating: "", email: "", phone: "", website: "", notes: "" };
  $scope.ratings = [];
  $scope.buttonText = "Add New";
  $scope.myValue =true;

  providersService.getRatings().then(function(d) {
    $scope.ratings = d.data;
  })
  $scope.addProvider = function() {
      providersService.addProvider($scope.userprovider).then(function(d) {
        $scope.providers.push(d);
        $scope.userprovider = { name: "", rating: "", email: "", phone: "", website: "", notes: "" };
        $scope.hide();
      })
  }

  $scope.hide = function() {
    $scope.myValue = !$scope.myValue;
    if ($scope.myValue) {
      $scope.buttonText = "Add New";
      $scope.userprovider = { name: "", rating: "", email: "", phone: "", website: "", notes: "" };
    } else {
      $scope.buttonText = "Cancel";
    }
  }
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
  $scope.total = function() {
    var total = 0.00;
    angular.forEach($scope.services, function(services) {
      total += services.cost * 1;
    });
    return total;
  };
  $scope.userservice = { stype: "", start: "", end: "", provider: "", cost: "", note: ""};
  $scope.myValue =true;
  $scope.buttonText = "Add New";
  $scope.providerList = [];
  $scope.testTypes = [];
  servicetypesService.get().then(function(d) {
    $scope.testTypes = d.data;
  });
  providersService.get().then(function(d) {
    $scope.providerList = d.data;
  })
  $scope.addService = function() {
      servicesService.addService($scope.userservice).then(function(d) {
        $scope.hide();
        $scope.services.push(d);
      })
  };

  $scope.hide = function() {
    $scope.myValue = !$scope.myValue;
    if ($scope.myValue) {
      $scope.buttonText = "Add New";
      $scope.userservice = { stype: "", start: "", end: "", provider: "", cost: "", note: ""};
    } else {
      $scope.buttonText = "Cancel";
    }

  }
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
