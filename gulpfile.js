
var gulp  = require('gulp'),
    postcss = require('gulp-postcss'),
    sass     = require('gulp-sass'),
    cssnano = require('cssnano'),
    browserSync = require('browser-sync').create(),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    assets = require('postcss-assets'),
    lost = require('lost');


var postcssPlugins = [
    assets({
        loadPaths: ['images'], 
        relative: 'css',
        cachebuster: true
    }),
    lost,
    //cssnano({autoprefixer: {add :true}}),

];

var cssDir = './css/';
var sassFile = 'style.scss';
var sassPath = './assets/sass/';
var sassConfig = sass();

var plumberConfig = {errorHandler: notify.onError("Error: <%= error.message %>")};

gulp.task('css', function() {
   return gulp.src(sassPath + sassFile)
        .pipe(plumber(plumberConfig))
        .pipe(sass())
        .pipe(postcss(postcssPlugins))
        .pipe(gulp.dest(cssDir))
        .pipe(notify({message: 'Css task complete'}))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
     browserSync.init({
        proxy: 'http://postcss.dev',
        host: 'postcss.dev',
        open: 'external',
        files: [
            './**/*.php',
            './assets/js/**/*.js',
            '/css/*.css',
            '/assets/sass/**/*.scss'
        ]
    });
    gulp.watch(['./assets/sass/**/*.scss', sassFile], ['css']);
});

// Default Task
gulp.task('default', ['watch']);
