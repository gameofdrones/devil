app.factory("Launchers", ["Restangular", function (Restangular) {
  function Launcher (url) {
    this.url = url;
    this.api = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(url);
    });

    this.position = function () {
      return Restangular.all("position").doGET();
    };

    this.fireAt = function (x, y) {
      Restangular.all("rocket").doPUT();
    };

    this.goTo = function (x, y) {

    };

    this.fire = function () {
      Restangular.one("actions", "fire").doPUT();
    };

    this.stop = function () {
      Restangular.one("actions", "stop").doPUT();
    };

    this.up = function () {
      Restangular.one("actions", "up").doPOST();
    };

    this.down = function () {
      Restangular.one("actions", "down").doPOST();
    };

    this.left = function () {
      Restangular.one("actions", "left").doPOST();
    };

    this.right = function () {
      Restangular.one("actions", "right").doPOST();
    };
  }

  return {
    create: function (url) {
      return new Launcher(url);
    }
  };
}]);