app.controller("GalleryCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {

  $scope.actions = {};

  var url = $rootScope.selectedLaunchers()[0].url;
  $scope.galleryURL = url.replace(url.split(":")[2], "9001");

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
