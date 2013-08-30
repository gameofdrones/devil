app.controller("KeyboardCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
  console.log("toto");

  function start(action) {
    console.log("start", action);
    _.forEach($rootScope.selectedLaunchers(), function (launcher) {
      launcher.start(action);
    });
    $scope.$digest();
  }

  function end(action) {
    console.log("end", action);
    _.forEach($rootScope.selectedLaunchers(), function (launcher) {
      launcher.end(action);
    });
    $scope.$digest();
  }

  keypress.register_combo({
    "keys": "space",
    "on_keydown": function () {
      // console.log("SPACE");
      start("fire");
    },
    "on_keyup": function () {
      // console.log("up");
      end("fire");
    }
  });

  keypress.register_combo({
    "keys": "up",
    "on_keydown": function () {
      start("up");
    },
    "on_keyup": function () {
      end("up");
    }
  });

  keypress.register_combo({
    "keys": "down",
    "on_keydown": function () {
      start("down");
    },
    "on_keyup": function () {
      end("down");
    }
  });

  keypress.register_combo({
    "keys": "left",
    "on_keydown": function () {
      start("left");
    },
    "on_keyup": function () {
      end("left");
    }
  });

  keypress.register_combo({
    "keys": "right",
    "on_keydown": function () {
      start("right");
    },
    "on_keyup": function () {
      end("right");
    }
  });
}]);