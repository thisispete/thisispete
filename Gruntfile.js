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

    sitemap:{
      deploy:{
        siteRoot: 'deploy/',
        homepage: 'http://thisispete.com/',
        changefreq: 'monthly'
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
        tasks:['html']
      }
    }

  });

  // Load tasks
  grunt.file.expand('node_modules/grunt-*').map(function (task) {
      return task.replace('node_modules/', '');
  }).forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'clean', 'html', 'sitemap', 'less', 'min', 'copy']);

  grunt.registerTask('html', 'runs swig on each file with a rename regex', function(){
    grunt.config('swig', {});
    var i = 0;
    grunt.file.expand('src/data/**/*.swig').forEach(function(path){
          path = path.split('index.swig')[0];
          grunt.config('swig.proc'+i+'.init', {root:[path,'src/templates/']});
          grunt.config('swig.proc'+i+'.cwd', path);
          grunt.config('swig.proc'+i+'.root', path);
          path = path.split('src/data/')[1];
          grunt.config('swig.proc'+i+'.generateSitemap', false);
          grunt.config('swig.proc'+i+'.generateRobotstxt', false);
          grunt.config('swig.proc'+i+'.src', '*.swig');
          grunt.config('swig.proc'+i+'.dest', 'deploy/' + path.replace(/[0-9]{2}\./g, ''));
          grunt.task.run('swig:proc'+i);
      i++;
    })
  });


};