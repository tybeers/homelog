<!doctype html>
<html lang="en" ng-app="app">
<head>
  <meta charset="UTF-8">
  <title>Homelog</title>
  <link rel="stylesheet" href="/css/normalize.css">
  <link rel="stylesheet" href="/css/foundation.min.css">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/menu.css">
  <script src="/js/angular.js"></script>
  <script src="/js/angular-sanitize.js"></script>
  <script src="/js/underscore.js"></script>
  <script src="/js/app.js"></script>
  <script>
    angular.module("app").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
  </script>
</head>
<body>
  <div class="row">
    <div class="large-12">
      <h1>Home Log</h1>
      <div class="row">
	<div class="small-4 large-4 columns">
		<center><a href="#/home" class="menuButton">Home</a></center>
	</div>
	<div class="small-4 large-4 columns">
		<center><a href="#/services" class="menuButton">Services</a></center>
	</div>
	<div class="small-4 large-4 columns">
		<center><a href="#/servicetypes" class="menuButton">Types</a></center>
	</div>
      </div>
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
