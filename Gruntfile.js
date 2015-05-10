'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  var path = require('path');

  // Measures the time each task takes
  require('time-grunt')(grunt);

  //Configurable paths
  var config = {
    app: 'app',
    dist: 'dist',
    temp: '.tmp',
    tasks: 'tasks',
    tests: 'test',
    folders: {
      assets: 'assets',
      html: {
        src: '<%= config.app %>',
        dest: '<%= config.dist %>'
      },
      styles: {
        src: '<%= config.app %>/<%= config.folders.assets %>/styles',
        temp: '<%= config.temp %>/<%= config.folders.assets %>/styles',
        dest: '<%= config.dist %>/<%= config.folders.assets %>/styles'
      },
      scripts: {
        src: '<%= config.app %>/<%= config.folders.assets %>/scripts',
        dest: '<%= config.dist %>/<%= config.folders.assets %>/scripts'
      },
      json: {
        src: '<%= config.app %>/<%= config.folders.assets %>/scripts',
        dest: '<%= config.app %>/<%= config.folders.assets %>/scripts'
      },
      images: {
        src: '<%= config.app %>/<%= config.folders.assets %>/images',
        dest: '<%= config.dist %>/<%= config.folders.assets %>/images'
      },
      fonts: {
        src: '<%= config.app %>/<%= config.folders.assets %>/fonts',
        dest: '<%= config.dist %>/<%= config.folders.assets %>/fonts'
      }
    },
    files: {
      html: [
        'index.html'
      ],
      css: [
        '{,*/}*.css'
      ],
      sass: [
        '{,*/}*.{scss,sass}'
      ],
      js: [
        '{,*/}*.js',
        '!vendor/*'
      ],
      json: [
        '{,*/}*.json'
      ],
      lint: {
        sass: [
          '<%= config.folders.styles.src %>/{,*/}*.{scss,sass}'
        ],
        js: [
          'Gruntfile.js',
          '<%= config.tasks %>/*.js',
          '<%= config.folders.scripts.src %>/{,*/}*.js',
          '!<%= config.folders.scripts.src %>/vendor/*',
          '<%= config.tests %>/spec/{,*/}*.js'
        ],
        json: [
          '*.json',
          '<%= config.folders.json.src %>/{,*/}*.json'
        ]
      }
    }
  };

  var banner = {
    banner: '/*! <%= package.name %> - v<%= package.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= package.homepage ? "* " + package.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      '<%= package.author.name %>;' +
      ' Licensed <%= _.pluck(package.licenses, "type").join(", ") %> */\n'
  };

  // Load grunt config and tasks automatically
  require('load-grunt-config')(grunt, {

    // path to task.js files, defaults to grunt dir
    configPath: path.join(process.cwd(), 'tasks'),

    data: {
      config: config,
      banner: banner
    }
  });
};
