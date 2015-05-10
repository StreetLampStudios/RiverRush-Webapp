// Generates a custom Modernizr build that includes only the tests you
// reference in your app
module.exports = {
  dist: {
    devFile: 'bower_components/modernizr/modernizr.js',
    outputFile: '<%= config.folders.styles.dest %>/vendor/modernizr.js',
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.folders.styles.dest %>',
      src: [
        '<%= config.files.css %>'
      ]
    }, {
      expand: true,
      dot: true,
      cwd: '<%= config.folders.scripts.dest %>',
      src: [
        '<%= config.files.js %>'
      ]
    }],
    uglify: true
  }
};
