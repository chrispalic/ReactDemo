"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Opens a URL in the browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); //Transforms react jsx to js
var source = require('vinyl-source-stream'); //Use conventional text streams with Gulp
var concat = require('gulp-concat');
var lint = require('gulp-eslint'); //Lint JS files, including JSX


var config ={
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths:{
        //This is a gulp GLOB
        html:'./src/*.html',
        js: './src/**/*.js', //this will look in any subdirectories for js and pull them
        mainJs: './src/main.js', //this folds in the main.js file
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist: './dist',
        images:'./src/images/*'
    }
}

gulp.task('connect', function(){
    connect.server({
        root:['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    })
})

gulp.task('open', ['connect'], function(){
    //this is opening the file and running connect first
    gulp.src('dist/index.html').pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}))
})
//This task copies the html to the dist folder and forces the server/browser to reload
gulp.task('html', function(){
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload())
})

gulp.task('js', function(){
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on ('error', console.error.bind(console))//wites errors out to the console
        .pipe(source('bundle.js'))//names the bundle
        .pipe(gulp.dest(config.paths.dist + '/scripts'))//puts it in the scripts folder
        .pipe(connect.reload());//reloads the browser
})

gulp.task('css', function(){
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
})

//Moves images to the dist folder
//We could also optimize the images here
gulp.task('images', function(){
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

    //publish favicon
    // gulp.src('./src/favicon.ico')
    //     .pipe(gulp.dest(config.paths.dist));
})

gulp.task('lint', function(){
    return gulp.src(config.paths.js)
        .pipe(lint({config:'eslint.config.json'}))
        .pipe(lint.format());
})

gulp.task('watch', function(){
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js','lint']);
})

gulp.task('default', ['html', 'js','css','images', 'lint','open', 'watch']);