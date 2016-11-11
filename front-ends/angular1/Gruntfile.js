module.exports = function (grunt) {

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks("grunt-ng-annotate");

  // if you simply run "grunt" these default tasks will execute, IN THE ORDER THEY APPEAR!
  grunt.registerTask('default', ['jshint', 'clean', 'ngAnnotate', 'ngtemplates', 'uglify', 'concat', 'cssmin', 'copy']);

  // don't need this with `live-server` detecting file changes
  // grunt.registerTask("reload", "reload Chrome on OS X", function() {
  //   require("child_process").exec("osascript " +
  //     "-e 'tell application \"Google Chrome\" " +
  //     "to tell the active tab of its first window' " +
  //     "-e 'reload' " +
  //     "-e 'end tell'"
  //   );
  // });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['./src/js/**/*.js', './src/components/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      },
    },

    clean: {
      options: {
        force: true, // danger will robinson!
      },
      target: {
        files: [{
          expand: true,
          cwd: './www/',
          src: ['js/**', 'css/**', 'index.html'],
        }]
      }
    },

    ngAnnotate: {
      options: {
        add: true,
        singleQuotes: true
      },
      pzgps: {
        files: {
          './src/tmp/pzgps.annotated.js':
          ['./src/js/pzgps.js', './src/js/**/*.js', './src/components/**/*.js']
        }
      }
    },

    // https://github.com/ericclemmons/grunt-angular-templates/blob/master/README.md
    ngtemplates:  {
      'pzgps': {
        cwd: 'src',
        src: [
          'components/**/*.html'
        ],
        dest: 'src/tmp/pzgps-components.min.js',
        options: {
          standalone: false,
          prefix: '/',
          htmlmin: { // NOTE: disable this if anything breaks
            collapseWhitespace:             true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true,
            keepClosingSlash:               true // needed for SVGs
          }
        }
      }
    },

    uglify: {
      pzgps: {
        src: ['./src/tmp/pzgps.annotated.js'],
        dest: './www/js/pzgps.min.js'
      }
    },

    concat: {
      'pzgps': {
        src: ['www/js/pzgps.min.js', '<%= ngtemplates.pzgps.dest %>'],
        dest: 'www/js/pzgps.min.js'
      }
    },

    /* (dest : src) */
    cssmin: {
      compress: {
        files: {
          './www/css/pzgps.min.css': ['./src/css/pzgps.css']
        }
      }
    },


    copy: {
      idx: {
        files: [
          {
            expand: false,
            src: ['./src/index.html'],
            dest: './www/index.html',
            filter: 'isFile'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['node_modules/angular-websocket/dist/angular-websocket.min.js'],
            dest: './www/js/',
            filter: 'isFile'
          }
        ]
      },
      // css: {
      //   files: [
      //     {
      //       expand: true,
      //       flatten: true,
      //       src: [],
      //       dest: './www/css/',
      //       filter: 'isFile'
      //     }
      //   ]
      // }
    },

    watch: {
      stuff: {
        files: "<%= './src/**/*' %>",
        tasks: ["default"]
      },
    }
  });
};
