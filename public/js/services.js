'use strict';

var app = angular.module('services', []).
  value('version', '0.1');

/* -------------------------- */
/*    --- HOME MAINT  ---     */
/* -------------------------- */

app.factory("providersService", function($http) {
  return {
    get: function() {
      return $http.get('/providers');
    },
    getRatings: function() {
      return $http.get('/ratings');
    },
    editProvider: function(provider) {
      console.log("in the service");
      var promise = $http.post("/providers/edit", provider).then(function(d) {
          return d.data;
      });
      return promise;
    },
    addProvider: function(userprovider) {
      var promise = $http.post("/providers/add", userprovider).then(function(d) {
          console.log(d);
          return d.data;
      })
      return promise;
    },
  };
});

app.factory("servicetypesService", function($http,FlashService) {
        var refreshList   = function() {
                servicetypesService.get();
        };

        return {
                get: function() {
                        return $http.get('/servicetypes');
                },
                addType: function(usertypes) {
                        var promise = $http.post("/servicetypes/add", usertypes).then(function(d) {
                                return d.data;
                        });
                        return promise;
                },
                editType: function(stype) {
                        var promise = $http.post("/servicetypes/edit", stype).then(function(d) {
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

app.factory("servicesService", function($http,FlashService) {
	var refreshList   = function() {
                servicesService.get();
        };

	return {
                get: function() {
                        return $http.get('/services');
                },
                addService: function(userservice) {
                  var promise = $http.post("/services/add", userservice).then(function(d) {
                      return d.data;
                  });
                  return promise;
                }
	};
});

app.factory("providersService", function($http) {
  return {
    get: function() {
      return $http.get('/providers');
    },
    getRatings: function() {
      return $http.get('/ratings');
    },
    addProvider: function(userprovider) {
      var promise = $http.post("/providers/add", userprovider).then(function(d) {
          console.log(d);
          return d.data;
      })
      return promise;
    }
  };
});

/* -------------------------- */
/*     --- FAM MAINT  ---     */
/* -------------------------- */


app.factory("medicinesService", function($http,FlashService) {
  return {
                get: function() {
                        return $http.get('/medicines');
                },
                addMedicine: function(usermedicine) {
                  var promise = $http.post("/medicines/add", usermedicine).then(function(d) {
                      return d.data;
                  });
                  return promise;
                },
                editMedicine: function(medicine) {
                  var promise = $http.post("/medicines/edit", medicine).then(function(d) {
                      return d.data;
                  });
                  return promise;
                }
  };
});

app.factory("journalService", function($http,FlashService) {
  return {
                getDays: function(range) {
                  if (range.start_date > range.end_date) { 
                      FlashService.show('Start date must be less than End date'); 
                  } else {
                      FlashService.show('');
                      FlashService.clear;
                  }
                  var promise = $http.post("/journal/get", range).then(function(d) {
                      return d.data;
                  });
                  return promise;
                },
                getAvailableFoods: function() {
                   return $http.get('/journal/available');
                },
                addEating: function(added) {
                  var promise = $http.post("/journal/addEating",added).then(function(d) {
                    return d.data;
                  });
                  return promise;
                },
                addCategory: function(category) {
                  var promise = $http.post("/journal/addCategory",category).then(function(d) {
                    return d.data;
                  });
                  return promise;
                }
          }
});

/* -------------------------- */
/*   --- APP  SERVICES  ---   */
/* -------------------------- */


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
