// Renames files for browser caching purposes
module.exports = {
  options: {
    algorithm: 'md5',
    length: 8
  },
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.dist %>',
      src: [
        '*.{ico,png}',
        '{,*/}*.html'
      ],
      dest: '<%= config.dist %>'
    }, {
      // Styles
      expand: true,
      dot: true,
      cwd: '<%= config.folders.styles.dest %>',
      src: [
        '<%= config.files.css %>'
      ],
      dest: '<%= config.folders.styles.dest %>'
    }, {
      // Scripts
      expand: true,
      dot: true,
      cwd: '<%= config.folders.scripts.dest %>',
      src: [
        '<%= config.files.js %>'
      ],
      dest: '<%= config.folders.scripts.dest %>'
    }, {
      // Images
      expand: true,
      dot: true,
      cwd: '<%= config.folders.images.dest %>',
      src: [
        '{,*/}*.*'
      ],
      dest: '<%= config.folders.images.dest %>'
    }, {
      // Fonts
      expand: true,
      dot: true,
      cwd: '<%= config.folders.fonts.dest %>',
      src: [
        '{,*/}*.*'
      ],
      dest: '<%= config.folders.fonts.dest %>'
    }]
  }
};
