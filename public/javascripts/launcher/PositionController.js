app.controller("PositionCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
  $scope.position = {};

  $scope.fire = function () {
    console.log("fire at", $scope.position);
    _.forEach($rootScope.selectedLaunchers(), function (launcher) {
      launcher.fireAt($scope.position.x, $scope.position.y);
    });

    if (!$scope.isDigesting()) {
      $scope.$digest();
    }
  };

  keypress.register_combo({
    "keys": "space",
    "on_keydown": function () {
      $scope.fire();
    }
  });
}]);