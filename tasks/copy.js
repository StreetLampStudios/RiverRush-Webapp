// Copies remaining files to places other tasks can use
module.exports = {
  styles: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.folders.styles.src %>',
      src: [
        '<%= config.files.css %>'
      ],
      dest: '<%= config.folders.styles.dest %>'
    }]
  },
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.app %>',
      src: [
        '*.{ico,png,txt}',
        '{,*/}*.html'
      ],
      dest: '<%= config.dist %>'
    }, {
      // Images
      expand: true,
      dot: true,
      cwd: '<%= config.folders.images.src %>',
      src: [
        '{,*/}*.webp'
      ],
      dest: '<%= config.folders.images.dest %>'
    }, {
      // Fonts
      expand: true,
      dot: true,
      cwd: '<%= config.folders.fonts.src %>',
      src: [
        '{,*/}*.*'
      ],
      dest: '<%= config.folders.fonts.dest %>'
    }]
  }
};
