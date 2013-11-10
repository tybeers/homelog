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
  var tdate = new Date();
  var yyyy = tdate.getFullYear().toString();
  var mm1 = (tdate.getMonth()).toString(); // getMonth() is zero-based
  var mm2 = (tdate.getMonth()+1).toString(); // getMonth() is zero-based
  var dd1  = tdate.getDate().toString();
  var dd2 = tdate.getDate().toString();
  var sdate = yyyy + "-" + (mm1[1]?mm1:"0"+mm1[0]) + "-" +(dd1[1]?dd1:"0"+dd1[0]);
  var edate = yyyy + "-" + (mm2[1]?mm2:"0"+mm2[0]) + "-" +(dd2[1]?dd2:"0"+dd2[0]);
  $scope.search = {start: sdate, end: edate, type: "", provider: ""};
  $scope.total = function() {
    var total = 0.00;
    angular.forEach($scope.services, function(services) {
      total += services.cost * 1;
    });
    return total;
  };
  $scope.userservice = { stype: "", start: "", end: "", provider: "", cost: "", note: ""};
  $scope.myValue =true;
  $scope.buttonText = "New";
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
  $scope.title = "What is this?";
  $scope.message = "What would you like to do?";

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

app.controller("journalController", function($scope, $location, journalService, foods) {
  var tdate = new Date();
  var yyyy = tdate.getFullYear().toString();
  var mm = (tdate.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = tdate.getDate().toString();
  var dd1  = (tdate.getDate()-1).toString();
  var dd2 = (tdate.getDate()+1).toString();
  var sdate = yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" +(dd1[1]?dd1:"0"+dd1[0]);
  var edate = yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" +(dd2[1]?dd2:"0"+dd2[0]);
  $scope.today = yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" +(dd[1]?dd:"0"+dd[0]);
  $scope.usercategory = { name: "" };
  $scope.range = { start_date: sdate, end_date: edate};
  $scope.userfood = { name: "", category_id: "", family_id: "1", status_id: "1", notes: "" }
  $scope.available = foods.data;
  
  $scope.$watchCollection('range', function() { 
      $scope.refreshDays();
  })
 
  $scope.onDrop = function($event,$data,array){
      var dropFood = { day_id: array['id'], food_id: $data['id']};
      journalService.addEating(dropFood).then(function (d) {
        $scope.refreshDays();
      })
    };

    $scope.toggleVisibility = function(model) {
            if ($scope.selected == model) {
              $scope.selected = undefined;
            } else {
              $scope.selected = model;
            };
        };
        
    $scope.isVisible = function(model) {
            return $scope.selected === model;
    };

    $scope.refreshDays = function() {
      journalService.getDays($scope.range).then(function (d) {
          $scope.days = d;
        });
    }

    $scope.refreshFoods = function() {
      journalService.getAvailableFoods().then(function (d) {
        $scope.available = d.data;
      })
    }

    $scope.addCategory = function() {
      journalService.addCategory($scope.usercategory).then(function (d) {
        $scope.refreshDays();
        $scope.refreshFoods();
        $scope.usercategory = { name: "" };
      })
    }

    $scope.addFood = function() {
      journalService.addFood($scope.userfood).then(function (d) {
        $scope.refreshFoods(); //ToDo: push only new object instead of rebuilding
        $scope.userfood = { name: "", category_id: "", family_id: "1", status_id: "1", notes: "" }
      })
    }

});