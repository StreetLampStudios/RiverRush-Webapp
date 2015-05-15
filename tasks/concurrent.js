// Run some tasks in parallel to speed up build process
module.exports = {
  dev: [
    'newer:sass:dev',
    'newer:copy:styles'
  ],
  test: [
    'newer:copy:styles'
  ],
  dist: [
    'newer:sass:dist',
    'newer:copy:styles',
    'newer:imagemin',
    'newer:svgmin'
  ]
};
