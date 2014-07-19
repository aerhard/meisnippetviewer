module.exports = function (grunt) {

  'use strict';

  // Load plugins. 
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-closurecompiler');

  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    requirejs : {
      compile : {
        options : {
          name : 'main',
          baseUrl : "src",
          out : 'build/<%= pkg.name %>.part',

          exclude : [
            'jquery',
            'vexflow',
            'meitovexflow'
          ],

          optimize : "none",

          done : function (done, output) {
            var duplicates = require('rjs-build-analysis').duplicates(output);
            if (duplicates.length > 0) {
              grunt.log.subhead('Duplicates found in requirejs build:');
              grunt.log.warn(duplicates);
              done(new Error('r.js built duplicate modules, please check the excludes option.'));
            }
            done();
          },
          // based on jQuery's convert function, see https://github.com/jquery/jquery/blob/master/build/tasks/build.js
          onBuildWrite : function (name, path, contents) {
            var rdefineEnd = /\}\);[^}\w]*$/;
            var amdName;
            // Convert var modules
            if (/.\/var\//.test(path)) {
              contents = contents.replace(/define\([\w\W]*?return/, "var " + (/var\/([\w-]+)/.exec(name)[1]) +
                                                                    " =").replace(rdefineEnd, "");

            } else {

              // Ignore jQuery's exports (the only necessary one)
              if (name !== "jquery") {
                contents = contents.replace(/\s*return\s+[^\}]+(\}\);[^\w\}]*)$/, "$1")// Multiple exports
                  .replace(/\s*exports\.\w+\s*=\s*\w+;/g, "");
              }

              // Remove define wrappers, closure ends, and empty declarations
              contents = contents.replace(/define\([^{]*?{/, "").replace(rdefineEnd, "");

              // Remove anything wrapped with
              // /* ExcludeStart */ /* ExcludeEnd */
              // or a single line directly after a // BuildExclude comment
              contents =
              contents.replace(/\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, "").replace(/\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, "");

              // Remove empty definitions
              contents = contents.replace(/define\(\[[^\]]+\]\)[\W\n]+$/, "");
            }
            return contents;
          }
        }
      }
    },

    concat : {
      bower_js : {
        options : {
          separator : ';',
          banner: "(function($, VF, undefined) {var MEI2VF = {};var m2v=MEI2VF;",
          footer: "})(jQuery, Vex.Flow);"
        },
        src : [
          'bower_components/meitovexflow/src/meilib.js',
          'bower_components/meitovexflow/src/Converter.js',
          'bower_components/meitovexflow/src/EventLink.js',
          'bower_components/meitovexflow/src/EventReference.js',
          'bower_components/meitovexflow/src/Hyphenation.js',
          'bower_components/meitovexflow/src/Verses.js',
          'bower_components/meitovexflow/src/LinkCollections.js',
          'bower_components/meitovexflow/src/PointerCollections.js',
          'bower_components/meitovexflow/src/Measure.js',
          'bower_components/meitovexflow/src/MEI2VF.js',
          'bower_components/meitovexflow/src/tables.js',
          'bower_components/meitovexflow/src/StaffInfo.js',
          'bower_components/meitovexflow/src/StaveConnector.js',
          'bower_components/meitovexflow/src/StaveVoices.js',
          'bower_components/meitovexflow/src/System.js',
          'bower_components/meitovexflow/src/SystemInfo.js',
          'bower_components/meitovexflow/src/vexflow-overrides.js',
          'bower_components/meitovexflow/src/Util.js',
          'build/<%= pkg.name %>.part'
        ],
        dest : 'build/<%= pkg.name %>.js'
      }
    },

    closurecompiler : {
      minify : {
        files : {
          'build/<%= pkg.name %>.min.js' : ['build/<%= pkg.name %>.js']
        },
        options : {
          "compilation_level" : "SIMPLE_OPTIMIZATIONS",
          "max_processes" : 5
          //"banner" : "/* hello world! */"
        }
      }
    },

    connect : {
      server : {
        options : {
          port : 8000
        }
      }
    },

    watch : {
      scripts : {
        files : ['src/**/*.js'],
        options : {
          livereload : true
        }
      }
    },

  });


  // Tasks.
  grunt.registerTask('default', [
    'requirejs:compile',
    'concat',
    'closurecompiler:minify'
  ]);

  grunt.registerTask('run', [
    'connect',
    'watch'
  ]);

  grunt.registerTask('compile', ['requirejs:compile']);
  grunt.registerTask('minify', ['closurecompiler:minify']);
}