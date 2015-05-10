// Checks js files for style errors
module.exports = {
  options: {
    config: '.jscsrc'
  },
  all: ['<%= config.files.lint.js %>']
};
