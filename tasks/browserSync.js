module.exports = {
  server: {
    bsFiles: {
      src: [
        'css/*.css',
        '*.html'
      ]
    },
    options: {
      watchTask: true,
      debugInfo: true,
      logConnections: true,
      notify: true,
      server: {
        baseDir: '<%= config.app %>'
      },
      ghostMode: {
        scroll: true,
        links: true,
        forms: true
      }
    }
  },
  proxy: {
    bsFiles: {
      src: [
        'css/*.css',
        '*.html'
      ]
    },
    options: {
      watchTask: true,
      debugInfo: true,
      logConnections: true,
      notify: true,
      proxy: 'localhost',
      ghostMode: {
        scroll: true,
        links: true,
        forms: true
      }
    }
  }
};
