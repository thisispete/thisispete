import autoprefixer from 'autoprefixer';
import babel from 'gulp-babel';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import del from 'del';
import fs from 'fs';
import gulp from 'gulp';
import gulpData from 'gulp-data';
import nunjucksRender from 'gulp-nunjucks-render';
import path from 'path';
import postcss from 'gulp-postcss';
import postcssNormalize from 'postcss-normalize';
import postcssPresetEnv from 'postcss-preset-env';
import postSCSS from '@csstools/postcss-sass';
import rename from 'gulp-rename';
import gls from 'gulp-live-server';
import sourcemaps from 'gulp-sourcemaps';
import sitemaps from 'gulp-sitemap';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';

const browserslistSettings = ['> 1% in US', 'last 1 version'];

const PATH = {
  HTML: 'src/data/**/*.njk',
  TEMPLATES: 'src/templates/*.njk',
  SITEMAP_HTML: 'deploy/**/*.html',
  HTML_ROOT: 'src/data/',
  CSS: 'src/common/css/*.scss',
  JS: 'src/common/js/**/*.js',
  JS_SCRIPT_NAME: 'script.js',
  JS_ENTRY: 'src/common/js/main.js',
  COPY_FILES: ['src/static/*.pdf', 'src/static/*.txt', 'src/static/js/lib/*.*'],
  COPY_ROOT: 'src/static/',
  STATIC_ASSETS_SRC: 'src/static/img/**/*.*',
  STATIC_ASSETS_ROOT: 'src/static/img/',
  NESTED_ASSETS_SRC: ['src/data/**/images/*.*', 'src/data/**/**/images/*.*'],
  NESTED_ASSETS_ROOT: 'src/data/',
  SAME_DOMAIN_ASSETS_SRC: ['src/data/**/img/*.*', 'src/data/**/**/img/*.*', 'src/data/**/swf/*.*', 'src/data/**/**/swf'],
  ASSETS_DEST: 'assets',
  DEST: 'deploy'
};

const clean = () => {
  return del([`${PATH.DEST}/**/*`,]);
};

const css = () => {
  const plugins = [
    autoprefixer({ overrideBrowserslist: browserslistSettings}),
    postcssPresetEnv({browsers: browserslistSettings}),
    postSCSS({browsers: browserslistSettings}),
    postcssNormalize({browsers: browserslistSettings})
  ];
  return gulp.src(PATH.CSS)
    .pipe(postcss(plugins))
    .pipe(rename({extname: '.css'}))
    .pipe(gulp.dest(`${PATH.DEST}/css/`));
};

const js = () => {
  return browserify({entries: PATH.JS_ENTRY, debug: true})
    .transform('babelify', { presets: ['@babel/preset-env'] })
  	.bundle()
  	.on('error', err => {	console.log(err.message)})
  	.pipe(source(PATH.JS_SCRIPT_NAME))
  	.pipe(buffer())
    .pipe(sourcemaps.init())
  	.pipe(uglify())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(`${PATH.DEST}/js/`));
};


const html = () => {
  const data = {
    nav:[]
  };

  // for building navigation list items
  const getSubs = (dir) => fs.readdirSync(dir).filter((dirent) => {
    return fs.statSync(path.join(dir, dirent)).isDirectory() && dirent.match(/^[0-9]{2}\..*/g);
  });
  const recurse = (dir, parentDepthString) => {
    var subFolders = getSubs(dir);
    for (let i = 0, len = subFolders.length; i < len; i++) {
      const folderName = subFolders[i];
      const fullPath = path.join(dir, folderName);
      const depth = fullPath.split('src/data/')[1].split('/').length;
      const thisLevel = `l${depth}`;
      const subfolderCount = getSubs(fullPath).length;
      const id = `${thisLevel}${parentDepthString.replace(/^\w{2}/, '')}_${i+1}`;
      const id2 = folderName.replace(/[0-9]{2}\./g, '');
      const href = fullPath.split('src/data/')[1].replace(/[0-9]{2}\./g, '');
      const text = id2.toUpperCase().replace(/_/g, ' ');
      const li = `<li id="${id}" class="${thisLevel}" data-parent="${parentDepthString}" data-sub="${subfolderCount}"><a id="${id2}" href="/${href}/">${text}</a></li>`;
      data.nav.push(li);
      recurse(fullPath, id);
    }
  }
  recurse(PATH.HTML_ROOT, 'l0');

  // for getting image locations relative to page
  const getImages = (page) => {
    const pageLoc = path.dirname(page.path);
    const imagesDir = fs.readdirSync(pageLoc).filter((dirent) => {
      return fs.statSync(path.join(pageLoc, dirent)).isDirectory() && dirent.match(/images/)
    });
    if(imagesDir.length > 0){
      const images = fs.readdirSync(path.join(pageLoc, 'images')).filter((dirent) => {
        return fs.statSync(path.join(pageLoc, 'images', dirent)).isFile() && dirent.match(/\.(jpg|jpeg|png)$/i)
      }).map((image) => {
        return pageLoc.split(PATH.HTML_ROOT)[1].replace(/\/[0-9]{2}\./g, '/').replace(/^[0-9]{2}\./g, '').replace('images/', '') + '/' + image;
      });
      return images;
    }else{
      return {}
    }
  };

  // for injecting data into each page render
  const getDataForFile = (file) => {
    data.images = getImages(file);
    data.assetRoot = process.env.NODE_ENV == 'production' ? 'http://aws.thisispete.com/images/' : '/assets/';
    return data
  }

  // and finally render the njk to html
  return gulp.src(PATH.HTML)
    .pipe(gulpData(getDataForFile))
    .pipe(nunjucksRender({
      path: 'src/templates'
    }))
    .pipe(rename((p) => {
      p.dirname = p.dirname.replace(/[0-9]{2}\./g, '');
      p.extname = '.html'
    }))
    .pipe(gulp.dest(PATH.DEST));
}

// generate sitemap
const sitemap = () => {
  return gulp.src(PATH.SITEMAP_HTML, {read: false})
    .pipe(sitemaps({
      siteUrl: 'http://thisispete.com',
      changefreq: 'monthly',
      priority: '0.5'
    }))
    .pipe(gulp.dest(PATH.DEST));
}


// copy all the image files that need to get deployed to s3 bucket
const staticAssets = () => {
  return gulp.src(PATH.STATIC_ASSETS_SRC, {base: PATH.STATIC_ASSETS_ROOT})
    .pipe(gulp.dest(PATH.ASSETS_DEST));
}

const nestedAssets = () => {
  return gulp.src(PATH.NESTED_ASSETS_SRC, {base: PATH.NESTED_ASSETS_ROOT})
    .pipe(rename((p) => {
      p.dirname = p.dirname.replace(/\/[0-9]{2}\./g, '/').replace(/^[0-9]{2}\./g, '').replace('images', '');
    }))
    .pipe(gulp.dest(PATH.ASSETS_DEST));
}

const cloudAssets =  gulp.parallel(staticAssets, nestedAssets);

const copyNestedAssetsSameDomain = () => {
  return gulp.src(PATH.SAME_DOMAIN_ASSETS_SRC, {base: PATH.NESTED_ASSETS_ROOT})
    .pipe(rename((p) => {
      p.dirname = p.dirname.replace(/\/[0-9]{2}\./g, '/').replace(/^[0-9]{2}\./g, '').replace('images', '');
    }))
    .pipe(gulp.dest(PATH.DEST));
}

// copy all the static files that don't get parsed elsewhere
const copyFiles = () => {
  return gulp.src(PATH.COPY_FILES, {base: PATH.COPY_ROOT})
    .pipe(gulp.dest(PATH.DEST));
};

const copy = gulp.parallel(copyFiles, copyNestedAssetsSameDomain);


// dev task serve app.js watch and notify on tiny-lr
const dev = done => {
    process.env.NODE_ENV = 'development'
    var server = gls('app.js', undefined, 35729);
    server.start()
  
    gulp.watch([PATH.CSS], css).on('change', server.notify);
    gulp.watch([PATH.JS], js).on('change', server.notify);
    gulp.watch([PATH.HTML, PATH.TEMPLATES], html).on('change', server.notify);
    gulp.watch([...PATH.COPY_FILES, ...PATH.SAME_DOMAIN_ASSETS_SRC], copy).on('change', server.notify);
    gulp.watch([PATH.STATIC_ASSETS_SRC, ...PATH.NESTED_ASSETS_SRC], cloudAssets).on('change', server.notify);
    done();
};

export {
  js,
  css,
  clean,
  html,
  cloudAssets,
  sitemap,
  copy,
  dev
}

const defaultTasks = gulp.series(clean, gulp.parallel(js, css, html, copy), sitemap);
export default defaultTasks
