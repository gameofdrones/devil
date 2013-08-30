var path = require("path");

var renamedTasks = {
};

module.exports = function (grunt) {
  "use strict";

  var bower = require("bower");
  var _ = grunt.util._;
  var isMatch = grunt.file.isMatch;

  require("matchdep").filterDev("grunt-*").forEach(function (plugin) {
    grunt.loadNpmTasks(plugin);
    if (renamedTasks[plugin]) {
      grunt.renameTask(renamedTasks[plugin].original, renamedTasks[plugin].renamed);
    }
  });

  var configuration = {
    pkg : grunt.file.readJSON("package.json"),
    play: grunt.file.readJSON("conf/constants.json"),
    dir: {
      app: {
        root: "app",
        controllers: "controllers",
        models: "models",
        views: "views"
      },
      conf: {
        root: "conf"
      },
      public: {
        root: "public",
        styles: "<%= config.dir.public.root %>/stylesheets",
        scripts: "<%= config.dir.public.root %>/javascripts",
        fonts: "<%= config.dir.public.styles %>/fonts",
        images: "<%= config.dir.public.root %>/images"
      },
      test: {
        root: "test"
      },
      components: {
        root: "bower_components"
      }
    }
  };

  grunt.registerTask("bower", [
    "shell:bowerInstall",
    "parallel:bowerBuild",
    "clean:components"
  ]);

  grunt.registerTask("build", [
    "clean:public",
    "parallel:bowerCopy",
    "less:raw"
  ]);

  grunt.registerTask("default", [
    "build",
    "watch"
  ]);

  grunt.registerTask("deploy", [
    "clean:dist",
    "build",
    "less:dist",
    "uglify:dist"
  ]);

  grunt.registerTask("test", [
    "jshint:stdout",
    "jshint:junit"
  ]);

  grunt.initConfig({
    config: configuration,

    clean: {
      public: [
        "<%= config.dir.public.scripts %>/vendors/**/*",
        "<%= config.dir.public.styles %>/vendors/**/*"
      ],
      components: [
        "<%= config.dir.components.root %>/angular",
        "<%= config.dir.components.root %>/angular-resource"
      ],
      dist: [
        "<%= config.dir.public.styles %>/<%= config.play.application.files.style %>*.min.css",
        "<%= config.dir.public.scripts %>/<%= config.play.application.files.script %>*.min.js"
      ]
    },

    concat: {

    },

    less: {
      options: {
        paths: ["<%= config.dir.components.root %>", "public/stylesheets/less"]
      },
      raw: {
        files: {
          "<%= config.dir.public.styles %>/<%= config.play.application.files.style %>.css": "<%= config.dir.public.styles %>/less/main.less"
        }
      },
      dist: {
        options: {
          compress: true
        },
        files: [{
          "<%= config.dir.public.styles %>/<%= config.play.application.files.style %>.<%= config.play.application.version %>.min.css": "<%= config.dir.public.styles %>/less/main.less"
        }]
      }
    },

    jshint: {
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      },
      stdout: {
        files: { src: [
          "Gruntfile.js",
          "public/javascripts/*.js",
          "public/javascripts/animations/*.js",
          "public/javascripts/authentification/*.js",
          "public/javascripts/contracts/*.js",
          "public/javascripts/directive/*.js",
          "public/javascripts/global/*.js",
          "public/javascripts/user/*.js",
          "public/javascripts/util/*.js",
          "test/**/*.js",
          "!<%= config.dir.public.scripts %>/<%= config.play.application.files.script %>.<%= config.play.application.version %>.min.js"]
        },
        options: {
          "force" : true
        }
      },
      junit: {
        files: { src: [
          "Gruntfile.js",
          "public/javascripts/*.js",
          "public/javascripts/animations/*.js",
          "public/javascripts/authentification/*.js",
          "public/javascripts/directive/*.js",
          "public/javascripts/user/*.js",
          "public/javascripts/util/*.js",
          "test/**/*.js",
          "!<%= config.dir.public.scripts %>/<%= config.play.application.files.script %>.<%= config.play.application.version %>.min.js"]
        },
        options: {
          reporter: require("jshint-junit-reporter"),
          reporterOutput: "target/test-reports/jshint.xml",
          "force" : true
        }
      }
    },

    uglify: {
      options: {
        banner: ""
      },
      dist: {
        options: {
          compress: true,
          report: "min"
        },
        files: [{
          dest: "<%= config.dir.public.scripts %>/<%= config.play.application.files.script %>.<%= config.play.application.version %>.min.js",
          src: [
            "<%= config.dir.public.scripts %>/vendors/jquery/jquery.js",
            "<%= config.dir.public.scripts %>/vendors/lodash/lodash.js",
            "<%= config.dir.public.scripts %>/vendors/angular/angular.js",
            "<%= config.dir.public.scripts %>/vendors/angular/angular-resource.js",
            "<%= config.dir.public.scripts %>/vendors/angular/angular-sanitize.js",
            "<%= config.dir.public.scripts %>/vendors/angular-ui/utils/ui-utils.js",
            "<%= config.dir.public.scripts %>/vendors/angular-ui/router/angular-ui-router.js",
            "<%= config.dir.public.scripts %>/vendors/angular-ui/bootstrap/ui-bootstrap-tpls.js",
            "<%= config.dir.public.scripts %>/vendors/restangular/restangular.js",
            "<%= config.dir.public.scripts %>/vendors/angular-http-auth/http-auth-interceptor.js",
            "<%= config.dir.public.scripts %>/vendors/blockui/jquery.blockUI.js",
            "<%= config.dir.public.scripts %>/vendors/snapjs/snap.js",
            "<%= config.dir.public.scripts %>/vendors/moment/moment.js",
            "<%= config.dir.public.scripts %>/util/blockUI.js",
            "<%= config.dir.public.scripts %>/app.js",
            "<%= config.dir.public.scripts %>/*.js",
            "<%= config.dir.public.scripts %>/!(vendors)/**/*.js",
            "!<%= config.dir.public.scripts %>/<%= config.play.application.files.script %>.<%= config.play.application.version %>.min.js"
          ]
        }]
      }
    },

    copy: {
      // Here start the Bower hell: manual copying of all required resources installed with Bower
      // Prefix them all with "bower"
      // Be sure to add them to the "bowerCopy" task near the top of the file
      bowerFontAwesome: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.root %>/font-awesome/font/",
          src: ["*"],
          dest: "<%= config.dir.public.fonts %>/vendors/fontawesome/"
        }]
      },
      bowerJQuery: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.root %>/jquery/",
          src: ["jquery.js", "jquery.min.js"],
          dest: "<%= config.dir.public.scripts %>/vendors/jquery/"
        }]
      },
      bowerModernizr: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.root %>/modernizr/",
          src: ["modernizr.js"],
          dest: "<%= config.dir.public.scripts %>/vendors/modernizr/"
        }]
      },
      bowerLodash: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.root %>/lodash/dist/",
          src: ["lodash.js", "lodash.min.js"],
          dest: "<%= config.dir.public.scripts %>/vendors/lodash/"
        }]
      },
      bowerAngular: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.root %>/angular-latest/build/",
          src: ["*.js"],
          dest: "<%= config.dir.public.scripts %>/vendors/angular/"
        }]
      },
      bowerRestangular: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.root %>/restangular/dist/",
          src: ["restangular.js", "restangular.min.js"],
          dest: "<%= config.dir.public.scripts %>/vendors/restangular/"
        }]
      },
      bowerAngularUiRouter: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.root %>/angular-ui-router/release/",
          src: ["*.js"],
          dest: "<%= config.dir.public.scripts %>/vendors/angular-ui/router/"
        }]
      },
      bowerAngularUiUtils: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.root %>/angular-ui-utils/components/angular-ui-docs/build/",
          src: ["*.js"],
          dest: "<%= config.dir.public.scripts %>/vendors/angular-ui/utils/"
        }]
      },
      bowerKeypress: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.root %>/Keypress/",
          src: ["*.js"],
          dest: "<%= config.dir.public.scripts %>/vendors/keypress/"
        }]
      }
    },

    shell: {
      bowerInstall: {
        command: "bower install",
        options: {
          stdout: true
        }
      },
      angularNpm: {
        command: "(cd ./<%= config.dir.components.root %>/angular-latest && exec npm install)",
        options: {
          stdout: true
        }
      },
      angularPackage: {
        command: "(cd ./<%= config.dir.components.root %>/angular-latest && exec grunt clean buildall minall)",
        options: {
          stdout: true
        }
      },
      angularUiUtilsNpm: {
        command: "(cd ./<%= config.dir.components.root %>/angular-ui-utils && exec npm install)",
        options: {
          stdout: true
        }
      },
      angularUiUtilsBuild: {
        command: "(cd ./<%= config.dir.components.root %>/angular-ui-utils && exec grunt build)",
        options: {
          stdout: true
        }
      }
    },

    parallel: {
      options: {
        grunt: true
      },
      bowerBuild: {
        tasks: [
          ["shell:angularNpm", "shell:angularPackage"],
          ["shell:angularUiUtilsNpm", "shell:angularUiUtilsBuild"]
        ]
      },
      bowerCopy: {
        tasks: [
          "copy:bowerFontAwesome",
          "copy:bowerJQuery",
          "copy:bowerModernizr",
          "copy:bowerLodash",
          "copy:bowerAngular",
          "copy:bowerRestangular",
          "copy:bowerAngularUiRouter",
          "copy:bowerAngularUiUtils",
          "copy:bowerKeypress"
        ]
      }
    },

    watch: {
      options: {
        livereload: false,
        forever: true
      },
      less: {
        files: ["<%= config.dir.public.styles %>/less/*.less", "<%= config.dir.public.styles %>/less/**/*.less"],
        tasks: ["less:raw"]
      },
      public: {
        options: {
          livereload: true
        },
        files: [
          "<%= config.dir.app.root %>/**/*.scala",
          "<%= config.dir.app.root %>/**/*.html",
          "<%= config.dir.conf.root %>/*",
          "<%= config.dir.public.scripts %>/*.js",
          "<%= config.dir.public.scripts %>/**/*.js",
          "<%= config.dir.public.styles %>/*.css",
          "<%= config.dir.public.styles %>/**/*.css"
        ],
        tasks: []
      }
    }
  });

};
