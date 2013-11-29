app.factory("Targets", ["Restangular", "$http", function (Restangular, $http) {
  function all() {
    return Restangular.all("targets").getList();
  }

  function insert(json) {
    return Restangular.all("targets").post(json);
  }

  return {
    all: all,
    insert: insert
  };
}]);
