module.exports = function(grunt) {

  // auto include tasks
  require('load-grunt-tasks')(grunt);

  // default file encoding
  grunt.file.defaultEncoding = 'utf8';

  /*******************************************************************************
   *
   * Grunt-Tasks
   *
   * Tasks can be grouped and sorted
   *
   *******************************************************************************
   */

  /*
   * Step: clear
   *
   * - dist folder
   * - .env file
   */
  grunt.registerTask('clear', [
    'clean:dist',
    'clean:env'
  ]);

  /*
   * Step: dev
   *
   * - clear all
   * - copy specific config
   * - start development mode
   */
  grunt.registerTask('dev', [
    'clear',
    'copy:env_local',
    'shell:npm_dev'
  ]);

  /*
   * Step: build:local
   *
   * - clear all
   * - copy specific config
   * - start build
   */
  grunt.registerTask('build:local', [
    'clear',
    'copy:env_local',
    'shell:npm_generate'
  ]);


  /*******************************************************************************
   *
   * Grunt-Configuration
   *
   *******************************************************************************
   */
  grunt.initConfig(
    {
      // Node.js configuration file
      pkg: grunt.file.readJSON('package.json'),

      shell: {
        npm_dev: {
          command: 'npm run dev',
        },
        npm_generate: {
          command: 'npm run generate',
        }
      },

      copy: {
        env_local: {
          files: [
            {
              src: ['./environments/local.env'],
              dest: './.env',
            }]},
      },

      clean: {
        dist: ["./dist/*"],
        env: ["./.env"]
      }
    });
};

