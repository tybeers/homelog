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


/* -------------------------- */
/*    --- HOME MAINT  ---     */
/* -------------------------- */


app.controller("providersController", function($scope, $location, $http, providers, providersService) {
  $scope.providers = providers.data;
  $scope.userprovider = { name: "", rating: "", email: "", phone: "", website: "", notes: "" };
  $scope.ratings = [];
  $scope.buttonText = "Add New";
  $scope.myValue =true;

  providersService.getRatings().then(function(d) {
    $scope.ratings = d.data;
  })
  $scope.editProvider = function ( idx ) {
        var prov_to_edit = $scope.providers[idx];
        var tempprovider = { name: prov_to_edit.name, rating: prov_to_edit.rating_id, email: prov_to_edit.email, phone: prov_to_edit.phone, website: prov_to_edit.website, notes: ""};
        console.log(tempprovider);
        //providersService.editProvider(tempprovider).then(function(d) {
          //this is bad, but it wont run from the service, need to fix
        $http.post("/providers/edit", prov_to_edit).then(function(d) {
          $scope.providers.push();
        });
  };
  $scope.addProvider = function() {
      providersService.addProvider($scope.userprovider).then(function(d) {
        $scope.providers.push(d);
        $scope.userprovider = { name: "", rating: "", email: "", phone: "", website: "", notes: "" };
        $scope.hide();
      })
  };
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
        $scope.editServiceType = function ( idx ) {
              var stype_to_edit = $scope.servicetypes[idx];
              servicetypesService.editType(stype_to_edit).then(function (d) {
                $scope.servicetypes.push();
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
  console.log($scope.services);
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

/* -------------------------- */
/*    --- FAM  MAINT  ---     */
/* -------------------------- */

app.controller("medicinesController", function($scope, $location, medicines, medicinesService) {
  $scope.medicines = medicines.data;
  $scope.myValue = true;
  $scope.buttonText = "+";
  $scope.usermedicine = { name: "", brand: "", dosage: "", units: "", frequency: "", notes: "", start: "", end: "" };

  $scope.addMedicine = function() {
      medicinesService.addMedicine($scope.usermedicine).then(function(d) {
        $scope.medicines.push(d);
        $scope.hide();
        $scope.usermedicine = { name: "", brand: "", dosage: "", units: "", frequency: "", notes: "", start: "", end: "" };
      })
  };
  $scope.editMedicine = function ( idx ) {
        var med_to_edit = $scope.medicines[idx];
        console.log(med_to_edit);
        medicinesService.editMedicine(med_to_edit).then(function (d) {
          $scope.medicines.push();
        });
  };
  $scope.hide = function() {
    $scope.myValue = !$scope.myValue;
    if ($scope.myValue) {
      $scope.buttonText = "+";
      $scope.usermedicine = { name: "", brand: "", dosage: "", units: "", frequency: "", notes: "", start: "", end: "" };
    } else {
      $scope.buttonText = "-";
    }

  };
});

app.controller("journalController", function($scope, $location, journalService) {
  $scope.start_date = '2013-11-01';
  $scope.end_date = '2013-11-07';
  $scope.$watch('start_date + end_date', function() { $scope.days = journalService.getDays($scope.start_date,$scope.end_date); })

  $scope.dayFood = function (day) {
    var day_to_get = $scope.days[day];
    journalService.getDay(day_to_get);
  };

});