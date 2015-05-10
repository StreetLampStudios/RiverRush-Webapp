// Performs rewrites based on rev and the useminPrepare configuration
module.exports = {
  options: {
    assetsDirs: [
      '<%= config.dist %>'
    ]
  }
  //html: [
  //  '<%= config.dist %>/{,*/}*.html'
  //],
  //css: [
  //  '<%= config.dist %>/styles/{,*/}*.css'
  //]
};
