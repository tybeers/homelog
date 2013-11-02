var app = angular.module("app", ['ngSanitize','services','controllers','directives','angular-table']);

app.config(function($httpProvider) {

  var logsOutUserOn401 = function($location, $q, SessionService, FlashService) {
    var success = function(response) {
      return response;
    };

    var error = function(response) {
      if(response.status === 401) {
        SessionService.unset('authenticated');
        $location.path('/login');
        FlashService.show(response.data.flash);
      }
      return $q.reject(response);
    };

    return function(promise) {
      return promise.then(success, error);
    };
  };

  $httpProvider.responseInterceptors.push(logsOutUserOn401);

});

app.config(function($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/home', {
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  });

  $routeProvider.when('/providers', {
    templateUrl: 'templates/providers.html',
    controller: 'providersController',
    resolve: {
      providers : function(providersService) {
        return providersService.get();
      }
    }
  });

   $routeProvider.when('/servicetypes', {
    templateUrl: 'templates/servicetypes.html',
    controller: 'servicetypesController',
    resolve: {
      servicetypes : function(servicetypesService) {
        return servicetypesService.get();
      }
    }
  });

   $routeProvider.when('/services', {
    templateUrl: 'templates/services.html',
    controller: 'servicesController',
    resolve: {
      services : function(servicesService) {
        return servicesService.get();
      }
    }
  });

  $routeProvider.when('/medicines', {
    templateUrl: 'templates/medicines.html',
    controller: 'medicinesController',
    resolve: {
      medicines : function(medicinesService) {
        return medicinesService.get();
      }
    }
  });

  $routeProvider.otherwise({ redirectTo: '/home' });

});

app.run(function($rootScope, $location, AuthenticationService, FlashService) {
  var routesThatDontRequireAuth = ['/login'];

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(!(_(routesThatDontRequireAuth).contains($location.path())) && !AuthenticationService.isLoggedIn()) {
      $location.path('/login');
      FlashService.show("Please log in to continue.");
    }
  });
});

