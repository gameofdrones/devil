app.controller("GalleryCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {

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

}]);
