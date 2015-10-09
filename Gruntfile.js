module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    ts: {
      options: {
        sourceMap: false
      },
      app: {
        src: "app/**/*.ts",
        out: "app/app-ts.js",
        watch: "app/**/*.ts"
      }
    }
  });

  grunt.registerTask("default", ["ts"]);
};