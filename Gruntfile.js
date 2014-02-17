module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist'],
    jshint: {
      files: ['gruntfile.js', 'src/js/**/*.js'],
      options: {jshintrc: true}
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
      options: {
        sourceMap: true,
        report: 'gzip'
      },
      build: {
        files: {
          'dist/js/main.js': ['src/js/application.js', 'src/js/router.js', 'src/js/controllers.js', 'src/js/models/monitor.js', 'src/js/models/record.js']
        }
      }
    },
    // TKTKTK
    staticHandlebars: {
      options: {
        
      },
      your_target_name: {
      
      }
    },
    copy: {
      markup: {
        files: [{src: ['src/index.html'], dest: 'dist/index.html'}],
        options: {
          process: function (content, path) {
          
            var timestamp = new Date();
          
            content = content.replace('<body>', '<body>\n				<!-- filepath: "'+path+'" | BUILT: ' + timestamp.toUTCString() + ' -->');
            
            var slashes = 0, lastSlash = -1, prefix = '';
            while (path.indexOf('/', lastSlash+1) > -1) {
              slashes += 1;
              lastSlash = path.indexOf('/', lastSlash+1);
            }
            if (slashes > 1) {
              slashes -= 1;
              while (slashes > 0) {
                prefix += '../';
                slashes-=1;
              }
            }
            
            var tmpl = {
              backbone:       '<script src="'+prefix+'libs/json3/lib/json3.min.js"></script>'+
                              '<script src="'+prefix+'libs/underscore/underscore.js"></script>'+
                              '<script src="'+prefix+'libs/backbone/backbone-min.js"></script>',
              angular:        '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.12/angular.min.js"></script>',
              knockout:       '<script src="'+prefix+'libs/knockoutjs/build/knockout-raw.js"></script>',
              ember:          '<script src="'+prefix+'libs/handlebars/handlebars.min.js"></script>'+
                              '<script src="'+prefix+'libs/ember/ember.min.js"></script>'+
                              '<script src="'+prefix+'libs/ember-data/ember-data.min.js"></script>',
              emberDev:       '<script src="'+prefix+'libs/handlebars/handlebars.js"></script>'+
                              '<script src="'+prefix+'libs/ember/ember.js"></script>'+
                              '<script src="'+prefix+'libs/ember-data/ember-data.js"></script>',
              bootstrapJS:    '<script src="'+prefix+'libs/bootstrap/dist/js/bootstrap.min.js"></script>',
              foundationJS:   '<script src="'+prefix+'libs/foundation/js/foundation.min.js"></script>',
              bootstrapCSS:   '<link rel="stylesheet" href="'+prefix+'libs/bootstrap/dist/css/bootstrap.min.css">'+
                              '<link rel="stylesheet" href="'+prefix+'libs/bootstrap/dist/css/bootstrap-theme.min.css">',
              foundationCSS:  '<link rel="stylesheet" href="'+prefix+'libs/foundation/css/foundation.min.css">',
              normalize:      '<link rel="stylesheet" href="'+prefix+'libs/normalize-css/normalize.css">',
              fontAwesome:    '<link rel="stylesheet" href="'+prefix+'libs/font-awesome/css/font-awesome.min.css">',
              lodash:         '<script src="'+prefix+'libs/lodash/dist/lodash.min.js"></script>',
              underscore:     '<script src="'+prefix+'libs/underscore/underscore.js"></script>',
              jquery:         '<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>\n'+
                              '        <script>window.jQuery || document.write(\'<sc\'+\'ript src="libs/jquery/jquery.min.js"></sc\'+\'ript>\');</script>',
              webfontloader:  '<script src="http:clean//ajax.googleapis.com/ajax/libs/webfont/1.5.0/webfont.js"></script>',
              consoleGuard:   '<script src="'+prefix+'libs/consoleGuard/dist/consoleGuard.min.js"></script>',
              modernizr:      '<script src="'+prefix+'libs/modernizr/modernizr.js"></script>',
              yepnope:        '<script src="'+prefix+'libs/yepnope/yepnope.1.5.4-min.js"></script>'
            };

            content = content.replace('<!-- FOUNDATION CSS -->', tmpl.foundationCSS);
            content = content.replace('<!-- FOUNDATION JS -->', tmpl.foundationJS);
            content = content.replace('<!-- BOOTSTRAP CSS -->', tmpl.bootstrapCSS);
            content = content.replace('<!-- BOOTSTRAP JS -->', tmpl.bootstrapJS);
            content = content.replace('<!-- BACKBONE -->', tmpl.backbone);
            content = content.replace('<!-- EMBER -->', tmpl.ember);
            content = content.replace('<!-- EMBER-DEV -->', tmpl.emberDev);
            content = content.replace('<!-- ANGULAR -->', tmpl.angular);
            content = content.replace('<!-- KNOCKOUT -->', tmpl.knockout);
            content = content.replace('<!-- LODASH -->', tmpl.lodash);
            content = content.replace('<!-- UNDERSCORE -->', tmpl.underscore);
            content = content.replace('<!-- JQUERY -->', tmpl.jquery);
            content = content.replace('<!-- WEBFONTLOADER -->', tmpl.webfontloader);
            content = content.replace('<!-- NORMALIZE -->', tmpl.normalize);
            content = content.replace('<!-- FONT AWESOME -->', tmpl.fontAwesome);
            content = content.replace('<!-- CONSOLE GUARD -->', tmpl.consoleGuard);
            content = content.replace('<!-- MODERNIZR -->', tmpl.modernizr);
            content = content.replace('<!-- YEPNOPE -->', tmpl.yepnope);
            
            content = content.replace('href="css', 'href="'+prefix+'css');
            content = content.replace('src="js', 'src="'+prefix+'js');
            
            return content;
          }
        }
      },
      styles: {
        files: [{src: ['src/css/styles.css'], dest: 'dist/css/styles.css'}]
      }
    },
    watch: {
      files: ['Gruntfile.js', 'src/**/*.*'],
      tasks: ['default'],
      options: {
        livereload: true
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-static-handlebars');
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.loadNpmTasks('grunt-bower-task');
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['bower:install', 'jshint', 'uglify',  'copy']);
  
  grunt.registerTask('rebuild', ['clean', 'bower:clean', 'bower:install', 'jshint', 'uglify', 'copy']);
};
