app.factory("Launchers", ["Restangular", function (Restangular) {
  function Launcher (data) {
    this.id = data.id;
    this.url = data.url;
    this.api = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(data.url);
    });

    this.position = function () {
      return Restangular.all("position").doGET();
    };

    this.fireAt = function (x, y) {
      this.api.all("rocket").doPUT();
    };

    this.goTo = function (x, y) {

    };

    this.fire = function () {
      this.api.one("actions", "fire").doPUT();
    };

    this.stop = function () {
      this.api.one("actions", "stop").doPUT();
    };

    this.up = function () {
      this.api.one("actions", "up").doPOST();
    };

    this.down = function () {
      this.api.one("actions", "down").doPOST();
    };

    this.left = function () {
      this.api.one("actions", "left").doPOST();
    };

    this.right = function () {
      this.api.one("actions", "right").doPOST();
    };
  }

  function all() {
    return Restangular.all("launchers").getList();
  }

  function insert(json) {
    return Restangular.all("launchers").post(json);
  }

  return {
    create: function (url) {
      return new Launcher(url);
    },
    all: all,
    insert: insert
  };
}]);