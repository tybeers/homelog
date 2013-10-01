'use strict';

var app = angular.module('services', []).
  value('version', '0.1');

app.factory("BookService", function($http) {
  return {
    get: function() {
      return $http.get('/books');
    }
  };
});

app.factory("servicetypesService", function($http,FlashService) {
        var refreshList   = function() {
                servicetypeService.get();
        };

        return {
                get: function() {
                        return $http.get('/servicetypes');
                },
                addType: function(usertypes) {
                        var promise = $http.post("/servicetypes/add", usertypes).then(function(d) {
                                console.log(d);
                                return d.data;
                        });
                        return promise;
                },
                deleteType: function(stype_id) {
                        var delType = $http.post("/servicetypes/delete",stype_id)
                        return delType;
                }
        };
});

app.factory("FlashService", function($rootScope) {
  return {
    show: function(message) {
      $rootScope.flash = message;
    },
    clear: function() {
      $rootScope.flash = "";
    }
  }
});

app.factory("SessionService", function() {
  return {
    get: function(key) {
      return sessionStorage.getItem(key);
    },
    set: function(key, val) {
      return sessionStorage.setItem(key, val);
    },
    unset: function(key) {
      return sessionStorage.removeItem(key);
    }
  }
});

app.factory("AuthenticationService", function($http, $sanitize, SessionService, FlashService, CSRF_TOKEN) {

  var cacheSession   = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function() {
    SessionService.unset('authenticated');
  };

  var loginError = function(response) {
    FlashService.show(response.flash);
  };

  var sanitizeCredentials = function(credentials) {
    return {
      email: $sanitize(credentials.email),
      password: $sanitize(credentials.password),
      csrf_token: CSRF_TOKEN
    };
  };
  return {
    login: function(credentials) {
      var login = $http.post("/auth/login", sanitizeCredentials(credentials));
      login.success(cacheSession);
      login.success(FlashService.clear);
      login.error(loginError);
      return login;
    },
    logout: function() {
      var logout = $http.get("/auth/logout");
      logout.success(uncacheSession);
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    }
  };
});
