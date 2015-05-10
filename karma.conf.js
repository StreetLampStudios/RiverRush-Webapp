module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'app/assets/scripts/**/*.js',
      'test/tests/**/test_*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'build/tests/**/*.js': ['coverage']
    },
    reporters: ['dots', 'coverage'],
    coverageReporter: {
      type: 'lcov',
      dir: 'build/coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
