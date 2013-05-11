module.exports = function(grunt) {
  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),

    //configs
    clean:{
     options:{
        force:true
      },
      debug: ['deploy/']
    },

    jshint: {
      files: ['src/common/*.js'],
      options: {
        node: true,
        jquery: true,
        browser: true,
        es5: true,
        boss: true,
        curly: true,
        expr: true,
        globalstrict: true,
        immed: false,
        strict: false,
        supernew: true,
        white: false,
        globals: {
          log: true,
          $: true,
          jQuery: true,
          Modernizr: true,
          window: true,
          alert: true,
          document: true
        }
      }
    },

    copy:{
      common:{
        files:[
          // {expand: true, cwd:'packages/common/img/',      src: ['**'], dest: '../build/debug/img/'},
          // {expand: true, cwd:'packages/common/fonts/',    src: ['**'], dest: '../build/debug/fonts/'},
          // {expand: true, cwd:'packages/common/js/',       src: ['**'], dest: '../build/debug/js/'},
          // {expand: true, cwd:'packages/common/swf/',       src: ['**'], dest: '../build/debug/swf/'}
        ]
      }
    },


    watch:{
      common:{
        files:['packages/common/**/*.*', '!packages/common/css/responsive-modules.scss'],
        tasks:['common']
      },
      js:{
        files:['packages/modules/**/js/*.js'],
        tasks:['js']
      },
      css:{
        files:['packages/modules/**/css/*.scss'],
        tasks:['css']
      },
      html:{
        files:['packages/common/html/**/*.jade', 'packages/modules/**/*.jade', 'packages/modules/**/*.json'],
        tasks:['html']
      },
      assets:{
        files:['packages/modules/**/img/**/*.*'],
        tasks:['assets']
      }
    },



  });

  //load grunt plugin tasks
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  //watch
  //update js
  //update css
  //update html

  //main
  //js lint
  //clear deploy
  //less to css
  //swing to html
  //js min concat
  //copy static files
  //sitemap rebuild
  //

  //deploy
  //bump version minor
  //heroku deploy
  //git push?
  //update s3 assets?

};