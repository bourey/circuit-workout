module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    ts: {
      options: {
        sourceMap: false
      },
      app: {
        src: "exercise-service.ts",
        out: "app-ts.js",
        watch: "exercise-service.ts"
      }
    }
  });

  grunt.registerTask("default", ["ts"]);
};