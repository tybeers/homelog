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

app.controller("BooksController", function($scope, books) {
  $scope.books = books.data;
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

app.controller("servicesController",function($scope, services, servicesService) {
	$scope.services = services.data;

});

app.controller("HomeController", function($scope, $location, AuthenticationService) {
  $scope.title = "Choose your adventure";
  $scope.message = "Click image to maintain";

  $scope.logout = function() {
    AuthenticationService.logout().success(function() {
      $location.path('/login');
    });
  };
});
