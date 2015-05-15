// Automatically inject Bower components into the HTML file
module.exports = {
  html: {
    src: ['<%= config.folders.html.src %>/index.html'],
    ignorePath: /^\/|\.\.\//
  },
  sass: {
    src: ['<%= config.folders.styles.src %>/{,*/}*.{scss,sass}'],
    ignorePath: /(\.\.\/){1,2}bower_components\//
  }
};
