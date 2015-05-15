// Make sure code styles are up to par and there are no obvious mistakes
module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  all: ['<%= config.files.lint.js %>']
};
