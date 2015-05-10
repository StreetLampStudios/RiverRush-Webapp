// The following *-min tasks produce minified files in the dist folder
module.exports = {
  dist: {
    options: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeAttributeQuotes: true,
      removeCommentsFromCDATA: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      useShortDoctype: true
    },
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.folders.html.src %>',
      src: [
        '<%= config.files.html %>'
      ],
      dest: '<%= config.folders.html.dest %>'
    }]
  }
};
