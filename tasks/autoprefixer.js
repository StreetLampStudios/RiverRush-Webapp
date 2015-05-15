// Add vendor prefixed styles
module.exports = {
  options: {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
  },
  dist: {
    files: [{
      expand: true,
      cwd: '<%= config.folders.styles.temp %>',
      src: '<%= config.files.css %>',
      dest: '<%= config.folders.styles.temp %>'
    }]
  }
};
