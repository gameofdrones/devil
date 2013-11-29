app.controller("TargetCtrl", ["$scope", "$rootScope", "Targets", function ($scope, $rootScope, Targets) {
  $rootScope.targets = [];


  Targets.all().then( function (data) {
    $rootScope.targets = data;
  });

  $scope.mark = {};

  $scope.fire = function () {
    console.log("fire at", $scope.mark);
    _.forEach($rootScope.selectedLaunchers(), function (launcher) {
      launcher.fireAt($scope.mark.x, $scope.mark.y);
    });

    if (!$scope.isDigesting()) {
      $scope.$digest();
    }
  };

  $scope.newTarget = {};

  $scope.add = function() {
    var launcher = $rootScope.selectedLaunchers()[0];
    $scope.newTarget.url = launcher.url;

    Targets.insert($scope.newTarget).then(function (id) {
      Targets.all().then( function (data) {
        $rootScope.targets = data;
      });
      $scope.newTarget = {};
    });
  };

  $scope.move = function (mark) {
    _.forEach($rootScope.selectedLaunchers(), function (launcher) {
      launcher.goTo(mark.x, mark.y);
    });
  };

  $scope.reset = function () {
    _.forEach($rootScope.selectedLaunchers(), function (launcher) {
      launcher.reset();
    });
  };

  keypress.register_combo({
    "keys": "space",
    "on_keydown": function () {
      $scope.fire();
    }
  });
}]);