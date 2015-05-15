// Empties folders to start fresh
module.exports = {
  dev: [
    '<%= config.temp %>'
  ],
  dist: [
    '<%= config.temp %>',
    '<%= config.dist %>'
  ]
};
