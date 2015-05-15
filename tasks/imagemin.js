// The following *-min tasks produce minified files in the dist folder
module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= config.folders.images.src %>',
      src: '{,*/}*.{gif,jpeg,jpg,png}',
      dest: '<%= config.folders.images.dest %>'
    }]
  }
};
