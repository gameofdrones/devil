app.controller("KeyboardCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {

  $scope.actions = {};

  $scope.start = function (action) {
    $scope.actions[action] = true;
    _.forEach($rootScope.selectedLaunchers(), function (launcher) {
      launcher.start(action);
    });
    if (!$scope.isDigesting()) {
      $scope.$digest();
    }
  };

  $scope.end = function (action) {
    $scope.actions[action] = false;
    _.forEach($rootScope.selectedLaunchers(), function (launcher) {
      launcher.end(action);
    });
    if (!$scope.isDigesting()) {
      $scope.$digest();
    }
  };

  keypress.register_combo({
    "keys": "space",
    "on_keydown": function (e) {
      e.preventDefault();
      $scope.start("fire");
    },
    "on_keyup": function (e) {
      e.preventDefault();
      $scope.end("fire");
    }
  });

  keypress.register_combo({
    "keys": "up",
    "on_keydown": function (e) {
      e.preventDefault();
      $scope.start("up");
    },
    "on_keyup": function (e) {
      e.preventDefault();
      $scope.end("up");
    }
  });

  keypress.register_combo({
    "keys": "down",
    "on_keydown": function (e) {
      e.preventDefault();
      $scope.start("down");
    },
    "on_keyup": function (e) {
      e.preventDefault();
      $scope.end("down");
    }
  });

  keypress.register_combo({
    "keys": "left",
    "on_keydown": function (e) {
      e.preventDefault();
      $scope.start("left");
    },
    "on_keyup": function (e) {
      e.preventDefault();
      $scope.end("left");
    }
  });

  keypress.register_combo({
    "keys": "right",
    "on_keydown": function (e) {
      e.preventDefault();
      $scope.start("right");
    },
    "on_keyup": function (e) {
      e.preventDefault();
      $scope.end("right");
    }
  });
}]);