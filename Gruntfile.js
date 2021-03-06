module.exports = function(grunt) {
  'use strict';

  var jsFiles = [ 'src/query-string.js' ];

  var config = {

    eslint: {
      options: {
        configFile: './.eslintrc'
      },
      js: jsFiles
    },

    jscs: {
      options: {
        config: './.jscsrc'
      },
      js: jsFiles
    },

    babel: {
      options: {
        sourceMap: true,
        modules: 'umd',
        env: {
          production: {
            compact: true
          }
        }
      },
      js: {
        files: [ {
          expand: true,
          cwd: './src/',
          src: ['*.js'],
          dest: './lib/'
        } ]
      }
    },

    watch: {
      js: {
        files: jsFiles,
        tasks: [ 'js' ]
      }
    }
  };

  grunt.config.init( config );

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  grunt.task.registerTask(
    'lint',
    'Run linting and coding style tasks',
    [ 'eslint', 'jscs' ]
  );

  grunt.task.registerTask(
    'js',
    'Validate JS then transpile ES6 to ES5',
    [ 'lint', 'babel' ]
  );

  grunt.task.registerTask(
    'default',
    [ 'watch' ]
  );
};
