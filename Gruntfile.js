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

    fileregexrename:{
      inline:{
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

  grunt.registerTask('default', ['jshint', 'clean', 'namedSwig', 'less', 'min', 'copy']);

  grunt.registerTask('namedSwig', 'runs swig on each file with a rename regex', function(){
    grunt.config('swig', {});
    var i = 0;
    grunt.file.expand('src/data/**/*.swig').forEach(function(path){
          path = path.split('index.swig')[0];
          grunt.config('swig.proc'+i+'.init', {root:'src/data/'});
          grunt.config('swig.proc'+i+'.cwd', path);
          path = path.split('src/data/')[1];
          grunt.config('swig.proc'+i+'.generateSitemap', false);
          grunt.config('swig.proc'+i+'.generateRobotstxt', false);
          grunt.config('swig.proc'+i+'.src', '*.swig');
          grunt.config('swig.proc'+i+'.dest', 'deploy/' + path.replace(/[0-9]{2}\./g, ''));
          grunt.task.run('swig:proc'+i);
      i++;
    })
  });


  grunt.registerTask('regex', 'renames deploy/10.foo/20.bar deploy/foo/bar', function(){
    var p = '', a = [], n = [], fs = require('fs', path = require('path'));

    grunt.file.recurse('deploy/', function(a){
      p = path.resolve(a);
      a = p.split('/').reverse();
      console.log('renaming: '+ p +' >>> ' + p.replace(/[0-9]{2}\./g, ''));
      a.forEach(function(e,i){
        if(e.match(/[0-9]{2}\./)){
          n = p.split(e);
          if(fs.existsSync(n[0]+e)){
            fs.renameSync(n[0] + e , n[0] + e.replace(/[0-9]{2}\./, ''));
            console.log('success');
          }
        }
      });
    })
  });

};