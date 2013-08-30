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
    "on_keydown": function () {
      $scope.start("fire");
    },
    "on_keyup": function () {
      $scope.end("fire");
    }
  });

  keypress.register_combo({
    "keys": "up",
    "on_keydown": function () {
      $scope.start("up");
    },
    "on_keyup": function () {
      $scope.end("up");
    }
  });

  keypress.register_combo({
    "keys": "down",
    "on_keydown": function () {
      $scope.start("down");
    },
    "on_keyup": function () {
      $scope.end("down");
    }
  });

  keypress.register_combo({
    "keys": "left",
    "on_keydown": function () {
      $scope.start("left");
    },
    "on_keyup": function () {
      $scope.end("left");
    }
  });

  keypress.register_combo({
    "keys": "right",
    "on_keydown": function () {
      $scope.start("right");
    },
    "on_keyup": function () {
      $scope.end("right");
    }
  });
}]);