app.controller("LauncherCtrl", ["$scope", "$rootScope", "Launchers", function ($scope, $rootScope, Launchers) {
  $rootScope.launchers = [];

  Launchers.all().then( function (data) {
    $rootScope.launchers = _.map(data, function (item) {
      return Launchers.create(item);
    });
  });

  $scope.newLauncher = {};

  $scope.add = function () {
    Launchers.insert($scope.newLauncher).then(function (id) {
      $rootScope.launchers.push(Launchers.create(_.extend({}, $scope.newLauncher, id)));
      $scope.newLauncher = {};
    });
  };

  $scope.toggle = function (launcher) {
    launcher.selected= !launcher.selected;
  };
}]);