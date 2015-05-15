// Reads HTML for usemin blocks to enable smart builds that automatically
// concat, minify and revision files. Creates configurations in memory so
// additional tasks can operate on them
module.exports = {
  options: {
    root: '<%= config.app %>',
    dest: '<%= config.dist %>',
    staging: '<%= config.temp %>'
  },
  html: [
    '<%= config.files.html %>'
  ]
};
