app.controller("PositionCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
  $scope.position = {};

  $scope.fire = function () {
    console.log("fire");
  };
}]);