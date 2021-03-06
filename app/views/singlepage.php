<!doctype html>
<html lang="en" ng-app="app">
<head>
  <meta charset="UTF-8">
  <title>Maint Log</title>
  <link rel="stylesheet" href="/css/normalize.css">
  <link rel="stylesheet" href="/css/foundation.min.css">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/menu.css">
  <link rel="stylesheet" href="/css/angular-table.css">
  <script src="/js/jquery-2.0.3.min.js"></script>
  <script src="/js/angular.js"></script>
  <script src="/js/angular-sanitize.js"></script>
  <script src="/js/angular-route.min.js"></script>
  <script src="/js/draganddrop.js"></script>
  <script src="/js/underscore.js"></script>
  <script src="/js/app.js"></script>
  <script src="/js/services.js"></script>
  <script src="/js/controllers.js"></script>
  <script src="/js/directives.js"></script>
  <script src="/js/filters.js"></script>
  <script>
    angular.module("app").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
  </script>
</head>
<body>
  <div class="row">
    <div class="large-12">
      <div class="row">
        <div class="large-6 large-offset-3">
          <div id="flash" class="alert-box alert" ng-show="flash">
            {{ flash }}
          </div>
        </div>
      </div>
      <div id="view" ng-view></div>
    </div>
  </div>

</body>
</html>
