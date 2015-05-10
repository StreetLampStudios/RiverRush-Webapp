module.exports = {
  options: {
    config: '.jsbeautifyrc'
  },
  modify: {
    src: ['<%= config.files.lint.js %>']
  },
  verify: {
    src: ['<%= config.files.lint.js %>'],
    options: {
      mode: 'VERIFY_ONLY'
    }
  }
};
