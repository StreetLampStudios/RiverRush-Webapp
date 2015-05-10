// Watches files for changes and runs tasks based on the changed files
module.exports = {
  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  },
  js: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.folder.scripts.src %>',
      src: [
        '<%= config.files.js %>'
      ]
    }],
    tasks: ['jshint']
  },
  jstest: {
    files: ['test/spec/{,*/}*.js'],
    tasks: ['test:watch']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  sass: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.folder.styles.src %>',
      src: [
        '<%= config.files.sass %>'
      ]
    }],
    tasks: ['sass:dev', 'autoprefixer']
  },
  styles: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.folder.styles.src %>',
      src: [
        '<%= config.files.css %>'
      ]
    }],
    tasks: ['newer:copy:styles', 'autoprefixer']
  }
};
