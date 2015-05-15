module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'app/assets/scripts/**/*.js',
      'test/spec/**/test_*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'app/assets/scripts/**/*.js': ['coverage']
    },
    reporters: ['dots', 'coverage'],
    coverageReporter: {
      type: 'lcov',
      dir: 'dist/coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
