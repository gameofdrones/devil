app.factory("Launchers", ["Restangular", "$http", function (Restangular, $http) {
  function Launcher (data) {
    this.id = data.id;
    this.url = data.url;
    this.actions = {};
    this.api = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(data.url);
    });
  }

  Launcher.prototype.position = function () {
    return Restangular.all("position").doGET();
  };

  Launcher.prototype.fireAt = function (x, y) {
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    return this.api.all("rocket").doPUT({x: x, y: y});
  };

  Launcher.prototype.goTo = function (x, y) {
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    return this.api.all("position").doPUT({x: x, y: y});
  };

  Launcher.prototype.reset = function () {
    return this.api.all("position").doDELETE();
  };

  Launcher.prototype.start = function (action) {
    if (!this.actions[action]) {
      this.actions[action] = true;
      this[action]();
    }
  };

  Launcher.prototype.end = function (action) {
    var self = this;
    self.actions[action] = false;
    self.stop().then(function () {
      _.forEach(this.actions, function (value, action) {
        if (value) {
          self[action]();
        }
      });
    });
  };

  Launcher.prototype.fire = function () {
    console.log("Action: fire");
    return this.api.one("actions", "fire").put();
  };

  Launcher.prototype.stop = function () {
    console.log("Action: stop");
    return this.api.one("actions", "stop").put();
  };

  Launcher.prototype.up = function () {
    console.log("Action: up");
    return this.api.one("actions", "up").post();
  };

  Launcher.prototype.down = function () {
    console.log("Action: down");
    return this.api.one("actions", "down").post();
  };

  Launcher.prototype.left = function () {
    console.log("Action: left");
    return this.api.one("actions", "left").post();
  };

  Launcher.prototype.right = function () {
    console.log("Action: right");
    return this.api.one("actions", "right").post();
  };

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