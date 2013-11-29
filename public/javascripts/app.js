var app = angular.module("devil", ["restangular", "ui.state", "ui.utils"])
  .config(["RestangularProvider", function (RestangularProvider) {
    "use strict";
    RestangularProvider.setBaseUrl('/');
  }])
  .config(["$locationProvider", "$stateProvider", "$urlRouterProvider",
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
    "use strict";
    $locationProvider.html5Mode(true).hashPrefix("!");

    $stateProvider
      .state("index", {
        url: "/",
        templateUrl: "/views/index"
      })
      .state("position", {
        url: "/position",
        templateUrl: "/views/position",
        controller: "PositionCtrl"
      })
      .state("gallery", {
        url: "/gallery",
        templateUrl: "/views/gallery",
        controller: "GalleryCtrl"
      })
      .state("keyboard", {
        url: "/keyboard",
        templateUrl: "/views/keyboard",
        controller: "KeyboardCtrl"
      });

      $urlRouterProvider.otherwise("/");
  }])
  .config(["RestangularProvider", function(RestangularProvider) {
    RestangularProvider.setBaseUrl("/api");
  }])
  .run(["$rootScope", "$state", "$stateParams", "$log", "$location",
    function ($rootScope, $state, $stateParams, $log, $location) {
    "use strict";
    // Global config
    $rootScope.$log = $log;
    $rootScope.$location = $location;
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.launchers = [];
    $rootScope.selectedLaunchers = function () {
      return _.filter($rootScope.launchers, function (launcher) {
        return launcher.selected;
      });
    };

    $rootScope.isDigesting = function () {
      return ($rootScope.$$phase === "$apply" || $rootScope.$$phase === "$digest");
    };
  }]);
