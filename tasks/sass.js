// Compiles Sass to CSS and generates necessary files if requested
module.exports = {
  options: {
    sourcemap: 'auto',
    loadPath: 'bower_components'
  },
  dev: {
    options: {
      style: 'expanded'
    },
    files: [{
      expand: true,
      cwd: '<%= config.folders.styles.src %>',
      src: [
        '<%= config.files.sass %>'
      ],
      dest: '<%= config.folders.styles.temp %>',
      ext: '.css'
    }]
  },
  dist: {
    options: {
      style: 'compressed'
    },
    files: [{
      expand: true,
      cwd: '<%= config.folders.styles.src %>',
      src: [
        '*.{scss,sass}'
      ],
      dest: '<%= config.folders.styles.temp %>',
      ext: '.css'
    }]
  }
};
