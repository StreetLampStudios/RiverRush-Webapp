module.exports = {
  unit: {
    configFile: 'karma.conf.js',
    background: true
  },
  travis: {
    configFile: 'karma.conf.js',
    singleRun: true,
    browsers: ['PhantomJS']
  }
};

