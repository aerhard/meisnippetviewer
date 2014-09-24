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
          baseUrl : 'src',
//          paths: {
//            'jquery' : 'vendor/jquery',
//            'vexflow' : 'vendor/vexflow',
//            'vex' : 'vendor/vex',
//            'msv' : '.',
//            'meiv2f' : '../bower_components/meitovexflow/src',
//            'meilib' : '../bower_components/meitovexflow/src/meilib'
//          },
          mainConfigFile: "src/config.js",
          out : 'tmp/<%= pkg.name %>.build.js',

          exclude : [
            'jquery',
            'vexflow',
            'vex'
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
      license : {
        options : {
          separator : ';'
        },
        src : [
          'src/licenses.js',
          'tmp/<%= pkg.name %>.closure.js'
        ],
        dest : 'build/<%= pkg.name %>.min.js'
      },

      bower_js : {
        options : {
          separator : ';',
          banner : "(function($, undefined) {var MEI2VF = {}, m2v=MEI2VF;",
          footer : ";var VF=Vex.Flow;})(jQuery);"
        },
        src : [
          'src/licenses.js',
          'bower_components/vexflow/src/header.js',
          'bower_components/vexflow/src/vex.js',
          'bower_components/vexflow/src/flow.js',
          'bower_components/vexflow/src/fraction.js',
          'bower_components/vexflow/src/fonts/vexflow_font.js',
          'bower_components/vexflow/src/glyph.js',
          'bower_components/vexflow/src/tables.js',
          'bower_components/vexflow/src/stave.js',
          'bower_components/vexflow/src/staveconnector.js',
          'bower_components/vexflow/src/tabstave.js',
          'bower_components/vexflow/src/voice.js',
          'bower_components/vexflow/src/voicegroup.js',
          'bower_components/vexflow/src/modifier.js',
          'bower_components/vexflow/src/modifiercontext.js',
          'bower_components/vexflow/src/accidental.js',
          'bower_components/vexflow/src/dot.js',
          'bower_components/vexflow/src/tickcontext.js',
          'bower_components/vexflow/src/tickable.js',
          'bower_components/vexflow/src/note.js',
          'bower_components/vexflow/src/bend.js',
          'bower_components/vexflow/src/stem.js',
          'bower_components/vexflow/src/notehead.js',
          'bower_components/vexflow/src/stemmablenote.js',
          'bower_components/vexflow/src/stavenote.js',
          'bower_components/vexflow/src/tabnote.js',
          'bower_components/vexflow/src/barnote.js',
          'bower_components/vexflow/src/clefnote.js',
          'bower_components/vexflow/src/timesignote.js',
          'bower_components/vexflow/src/ghostnote.js',
          'bower_components/vexflow/src/formatter.js',
          'bower_components/vexflow/src/stavetie.js',
          'bower_components/vexflow/src/stavehairpin.js',
          'bower_components/vexflow/src/tabtie.js',
          'bower_components/vexflow/src/tabslide.js',
          'bower_components/vexflow/src/beam.js',
          'bower_components/vexflow/src/vibrato.js',
          'bower_components/vexflow/src/annotation.js',
          'bower_components/vexflow/src/tuning.js',
          'bower_components/vexflow/src/stavemodifier.js',
          'bower_components/vexflow/src/keysignature.js',
          'bower_components/vexflow/src/timesignature.js',
          'bower_components/vexflow/src/clef.js',
          'bower_components/vexflow/src/music.js',
          'bower_components/vexflow/src/keymanager.js',
          'bower_components/vexflow/src/renderer.js',
          'bower_components/vexflow/src/stavebarline.js',
          'bower_components/vexflow/src/stavevolta.js',
          'bower_components/vexflow/src/staverepetition.js',
          'bower_components/vexflow/src/stavesection.js',
          'bower_components/vexflow/src/stavetempo.js',
          'bower_components/vexflow/src/stavetext.js',
          'bower_components/vexflow/src/articulation.js',
          'bower_components/vexflow/src/tremolo.js',
          'bower_components/vexflow/src/raphaelcontext.js',
          'bower_components/vexflow/src/canvascontext.js',
          'bower_components/vexflow/src/tuplet.js',
          'bower_components/vexflow/src/boundingbox.js',
          'bower_components/vexflow/src/textnote.js',
          'bower_components/vexflow/src/strokes.js',
          'bower_components/vexflow/src/stringnumber.js',
          'bower_components/vexflow/src/frethandfinger.js',
          'bower_components/vexflow/src/gracenote.js',
          'bower_components/vexflow/src/gracenotegroup.js',
          'bower_components/vexflow/src/curve.js',
          'bower_components/vexflow/src/staveline.js',
          'bower_components/vexflow/src/crescendo.js',
          'bower_components/vexflow/src/ornament.js',
          'bower_components/vexflow/src/pedalmarking.js',
          'bower_components/vexflow/src/textbracket.js',
          'bower_components/vexflow/src/textdynamics.js',

          'src/build/post-vexflow.js',

//          'bower_components/meitovexflow/src/vexflow-overrides.js',
//          'bower_components/meitovexflow/src/meilib.js',
//          'bower_components/meitovexflow/src/Converter.js',
//          'bower_components/meitovexflow/src/Chord.js',
//          'bower_components/meitovexflow/src/EventLink.js',
//          'bower_components/meitovexflow/src/EventReference.js',
//          'bower_components/meitovexflow/src/Hyphenation.js',
//          'bower_components/meitovexflow/src/Verses.js',
//          'bower_components/meitovexflow/src/LinkCollections.js',
//          'bower_components/meitovexflow/src/PointerCollections.js',
//          'bower_components/meitovexflow/src/Measure.js',
//          'bower_components/meitovexflow/src/MEI2VF.js',
//          'bower_components/meitovexflow/src/Note.js',
//          'bower_components/meitovexflow/src/tables.js',
//          'bower_components/meitovexflow/src/Rest.js',
//          'bower_components/meitovexflow/src/StaffInfo.js',
//          'bower_components/meitovexflow/src/Stave.js',
//          'bower_components/meitovexflow/src/StaveConnector.js',
//          'bower_components/meitovexflow/src/StaveVoices.js',
//          'bower_components/meitovexflow/src/System.js',
//          'bower_components/meitovexflow/src/SystemInfo.js',
//          'bower_components/meitovexflow/src/Util.js',
          'tmp/<%= pkg.name %>.build.js'
        ],
        dest : 'build/<%= pkg.name %>.js'
      }
    },

    closurecompiler : {
      minify : {
        files : {
          'tmp/<%= pkg.name %>.closure.js' : ['build/<%= pkg.name %>.js']
        },
        options : {
          "compilation_level" : "SIMPLE_OPTIMIZATIONS",
//          "compilation_level" : "ADVANCED_OPTIMIZATIONS",
          "max_processes" : 5,
          "language_in" : "ECMASCRIPT5" // not compatible with IE8, used for trailing commas in VF
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
    'concat:bower_js',
    'closurecompiler:minify',
    'concat:license'
  ]);

  grunt.registerTask('run', [
    'connect',
    'watch'
  ]);

  grunt.registerTask('compile', ['requirejs:compile']);
  grunt.registerTask('minify', ['closurecompiler:minify']);
}