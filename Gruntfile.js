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
      files: ['src/common/js/*.js'],
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

    less:{
      css:{
        options:{
          yuicompress: true
        },
        files:{
          'deploy/css/main.css': 'src/common/less/main.less',
          'deploy/css/phone.css': 'src/common/less/phone.less'
        }
      }

    },

    min:{
      js:{
        src: 'src/common/js/script.js',
        dest: 'deploy/js/script.js'
      }
    },

    copy:{
      static:{
        files:[
          {expand: true, cwd:'src/static/img/', src: ['**'], dest: 'deploy/img/'},
          {expand: true, cwd:'src/static/js/', src: ['**'], dest: 'deploy/js/'},
          {expand: true, cwd:'src/static/css/', src: ['**'], dest: 'deploy/css/'},
          {expand: true, cwd:'src/static/', src: ['*.pdf', '*.txt'], dest: 'deploy/'},
        ]
      }
    },

    swig:{
      html:{
        root:'src/data/',
        cwd: 'src/data/',
        dest:'deploy/',
        src: ['**/*.swig'],
        siteUrl: 'http://thisispete.com/',
        production: true,
        generateSitemap: false,
        generateRobotstxt: false,
        sitemap_priorities: {
          '_DEFAULT_': '0.5',
          'index': '0.8',
          'subpage': '0.7'
        }
      }
    },

    fileregexrename:{
      go:{
        files:{'deploy/' : 'deploy/**'},
        options:{
          replacements:[{
            pattern: /^[0-9]{2}\./g,
            replacement: ''
          }]
        }
      }
    },

    watch:{
      assets:{
        files:['src/static/**/*.*'],
        tasks:['copy']
      },
      js:{
        files:['src/common/js/*.js'],
        tasks:['jshint', 'min']
      },
      less:{
        files:['src/common/less/*.less'],
        tasks:['less']
      },
      swig:{
        files:['src/data/**/*.*', 'src/templates/*.*'],
        tasks:['swig']
      }
    }

  });

  // Load tasks
  grunt.file.expand('node_modules/grunt-*').map(function (task) {
      return task.replace('node_modules/', '');
  }).forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'clean', 'swig', 'fileregexrename', 'less', 'min', 'copy']);

};