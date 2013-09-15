module.exports = function(grunt) {

  grunt.config.init({
    env: 'default',
    nav: (function(){
      var tree = [],
      match,
      recursepath = function(path){
       return [path + '/*', '!' + path + '/*.swig', '!' + path + '/*.json', '!' + path +'/images', '!' + path +'/art', '!' + path +'/swf', '!' + path +'/img', '!' + path +'/0.404'];
      },
      recurse = function(path, p){
        var count = 0;
        grunt.file.expand(recursepath(path)).map(function(a){
          count++;
          var depth =  a.split('src/data/')[1].split('/').length,
          c = "l" + depth,
          parent = p,
          id = c + parent.replace(/^\w{2}/, '') +'_' +count,
          sub = grunt.file.expand(recursepath(a)).length,
          id2 = a.replace(/[0-9]{2}\./g, '').replace(/[a-z]+\//g, ''),
          href = a.split('src/data/')[1].replace(/[0-9]{2}\./g, ''),
          text = id2.toUpperCase().replace(/_/g, ' '),
          li = ('<li id="'+id+'" class="'+c+'" data-parent="'+parent+'" data-sub="'+sub+'"><a id="'+id2+'" href="/'+href+'/">'+text+'</a></li>');
          tree.push(li);
          recurse(a, id);
        });
      };
      recurse('src/data', 'l0');
      return tree;
    })(),

    //configs
    clean:{
     options:{
        force:true
      },
      debug: ['deploy/', 'assets/']
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
          {expand: true, cwd:'src/static/js/', src: ['**'], dest: 'deploy/js/'},
          {expand: true, cwd:'src/static/css/', src: ['**'], dest: 'deploy/css/'},
        ]
      },
      staticAssets:{
        files:[
          {expand: true, cwd:'src/static/img/', src: ['**'], dest: 'assets/'},
          {expand: true, cwd:'src/static/', src: ['*.pdf', '*.txt'], dest: 'assets/'}
        ]
      },
      nestedAssets:{
        files: grunt.file.expand(['src/data/**/images/*.*']).map(function(a){
          return {
            expand:false,
            src: a,
            dest: 'assets/' + a.split('src/data/')[1].replace(/\/[0-9]{2}\./g, '/').replace(/^[0-9]{2}\./g, '').replace('images/', '')
          };
        })
      },
      exceptions:{
        files: grunt.file.expand(['src/data/**/img/*.*', 'src/data/**/swf/*.*']).map(function(a){
          return {
            expand:false,
            src: a,
            dest: 'deploy/' + a.split('src/data/')[1].replace(/\/[0-9]{2}\./g, '/').replace(/^[0-9]{2}\./g, '')
          };
        })
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
      static:{
        files:['src/static/**/*.*'],
        tasks:['copy:static']
      },
      assets:{
        files:['src/data/**/images/*.*', 'src/data/**/img/*.*', 'src/data/**/swf/*.*'],
        tasks:['copy:assets']
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
  grunt.registerTask('heroku', function(){
    grunt.config.data.env = 'heroku';
    grunt.task.run( ['html', 'sitemap', 'less', 'min', 'copy:static', 'copy:exceptions'] );
  });


  grunt.registerTask('html', 'runs swig on each file with a rename regex', function(){
    grunt.config('swig', {});
    var i = 0;
    grunt.file.expand('src/data/**/*.swig').forEach(function(path){
          path = path.split('index.swig')[0];
          grunt.config('swig.proc'+i+'.init', {root:[path,'src/templates/']});
          grunt.config('swig.proc'+i+'.cwd', path);
          grunt.config('swig.proc'+i+'.root', path);
          grunt.config('swig.proc'+i+'.assetRoot', grunt.config.data.env === 'heroku' ? 'http://aws.thisispete.com/images' : '/assets');
          grunt.config('swig.proc'+i+'.images', grunt.file.expand(path + '/images/*.*').map(function(a){return a.split('src/data')[1].replace(/\/[0-9]{2}\./g, '/').replace(/^[0-9]{2}\./g, '').replace('images/', '');}));
          path = path.split('src/data/')[1];
          grunt.config('swig.proc'+i+'.generateSitemap', false);
          grunt.config('swig.proc'+i+'.generateRobotstxt', false);
          grunt.config('swig.proc'+i+'.src', '*.swig');
          grunt.config('swig.proc'+i+'.dest', 'deploy/' + path.replace(/[0-9]{2}\./g, ''));
          grunt.config('swig.proc'+i+'.nav', grunt.config.data.nav);
          grunt.config('swig.proc'+i+'.env', grunt.config.data.env);
          grunt.task.run('swig:proc'+i);
      i++;
    });
  });
};