module.exports = function (grunt) {
  'use strict';

  // Default port
  var LIVERELOAD_PORT = 35729;

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: ['dist'],

    jshint: {
      files: ['gruntfile.js', 'src/js/**/*.js'],
      options: {jshintrc: true}
    },

    connect: {
      server: {
        options: {
          base: 'dist',
          // This will inject live reload script into the html
          livereload: LIVERELOAD_PORT,
          open: 'http://localhost:8000/index.html'
        }
      }
    },

    bower: {
      install: {
        options: {
          verbose: false,
          cleanup: false,
          install: true
        }
      },
      clean: {
        options: {
          verbose: false,
          cleanup: true,
          install: false
        }
      }
    },

    uglify: {

      build: {
        options: {
          sourceMap: true,
          report: 'gzip'
        },
        files: {
          'dist/js/main.js': ['tmp/tmpl.js', 'src/js/application.js', 'src/js/store.js', 'src/js/router.js', 'src/js/controllers/*.js', 'src/js/views/*.js']
        }
      }

    },

    concat: {
      deps: {
        options: {
          separator: ';\n',
          stripBanners: {block: true, line: true}
        },
        files: {
          'dist/js/libs.js': [
            'dist/libs/jquery/jquery.min.js',
            'dist/libs/consoleGuard/dist/consoleGuard.min.js',
            'dist/libs/lodash/dist/lodash.min.js',
            'dist/libs/bootstrap/dist/js/bootstrap.min.js',
            'dist/libs/chartjs/Chart.min.js',
            'dist/libs/handlebars/handlebars.min.js'/*
,
            'dist/libs/ember/ember.min.js'
*/
          ]
        }
      }
    },

    emberTemplates: {
      options: {
        preprocess: function(source) {
          return source.replace(/\s+/g, ' ');
        },
        templateBasePath: /src\/tmpl\//,
        templateFileExtensions: /\.hbs/
      },
      'default': {
        files: {
          'tmp/tmpl.js': 'src/tmpl/**/*.hbs'
        }
      }
    },

    copy: {
      markup: {
        files: [{src: ['src/index.html'], dest: 'dist/index.html'}],
        options: {
          process: function (content, path) {

            var timestamp = new Date();

            // add timestmp to html file(s).
            content = content.replace( '</body>', '\n <script>console.info("Reloading: built '+timestamp.toUTCString()+'");</script> \n <!-- filepath: "'+path+'" | BUILT: ' + timestamp.toUTCString() + ' --> \n<div id="dev-build-timestamp">'+timestamp.toUTCString()+'</div>' );

            return content;
          }
        }
      },
      styles: {
        files: [{src: ['src/css/styles.css'], dest: 'dist/css/styles.css'}]
      },
      devHelpers: {
        files: [{src: ['src/css/dev.css'], dest: 'dist/css/dev.css'}]
      },
      sourceForMaps: {
        files: [{src: ['src/js/*'], dest: 'dist', expand: true}]
      },
      images: {
        files: [{src: ['img/*'], dest: 'dist', expand: true}]
      },
      fixtures: {
        files: [{src: ['fixtures/1.json'], dest: 'dist/1.json'}, {src: ['fixtures/2.json'], dest: 'dist/2.json'}]
      }
    },

    watch: {
      files: ['Gruntfile.js', 'src/**/*.*'],
      tasks: ['default'],
      options: {
        livereload: LIVERELOAD_PORT
      }
    }

  });

  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-bower-task');

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');



  grunt.registerTask('default', ['bower:install', 'emberTemplates', 'jshint', 'uglify',  'concat', 'copy']);
  grunt.registerTask('rebuild', ['clean', 'bower:clean', 'default']);
  grunt.registerTask('server', ['rebuild', 'connect', 'watch']);

};
