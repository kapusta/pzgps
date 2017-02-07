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
          './tmp/pzgps.annotated.js':
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
        dest: 'tmp/pzgps-components.min.js',
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
        options: {
          sourceMap: true,
          report: 'min'
        },
        src: ['./tmp/pzgps.annotated.js'],
        dest: './tmp/pzgps.uglified.js'
      }
    },

    concat: {
      'pzgps': {
        src: ['<%= uglify.pzgps.dest %>', '<%= ngtemplates.pzgps.dest %>'],
        dest: 'tmp/pzgps.min.js'
      }
    },

    /* (dest : src) */
    cssmin: {
      compress: {
        files: {
          './tmp/pzgps.min.css': ['./src/css/pzgps.css']
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
            src: [
              'tmp/pzgps.min.js',
              'tmp/pzgps.uglified.js.map',
              'node_modules/angular-websocket/dist/angular-websocket.min.js'
            ],
            dest: './www/js/',
            filter: 'isFile'
          }
        ]
      },
      css: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['tmp/pzgps.min.css'],
            dest: './www/css/',
            filter: 'isFile'
          }
        ]
      }
    },

    watch: {
      stuff: {
        files: "<%= './src/**/*' %>",
        tasks: ["default"]
      },
    }
  });
};
