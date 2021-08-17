

const gulp = require('gulp');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const include = require('gulp-html-tag-include');
const concat = require('gulp-concat');
//const uglify = require('gulp-uglify'); //ecma6 js 오류
const uglify =require('gulp-uglify-es').default; //ecma6 일때는 js 압축할때 이걸써라
const rename = require('gulp-rename');

//바꿀 필요가 없는 파일을 특정 폴더로 이동하는 함수
function static_file(){
    return gulp.src('./src/static/*')
    .pipe(gulp.dest('./dist/static'));
}

//메인페이지에 부분 HTML파일들을 합치는 함수
function html_include_main(){
    return gulp.src('./src/main/index.html')
    .pipe(include())
    .pipe(gulp.dest('./dist'));
}

//서브페이지에 부분 HTML파일들을 합치는 함수
function html_include_sub(){  
    return gulp.src(['./src/sub/**/*.html', '!./src/sub/header/header.html','!./src/sub/footer/footer.html'])
    .pipe(include())   
    .pipe(rename({dirname: ''}))  
    .pipe(gulp.dest('./dist'));
}

//여러개의 scss파일을 통합해서 하나의 css파일로 변환하는 함수
function style(){
    return gulp.src('./src/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write()) 

    .pipe(gulp.dest('./dist/css'))   
    .pipe(browserSync.stream());
}

//여러개의 js파일을 하나로 합쳐서 압축하는 함수
function js_main(){
    return gulp.src(['./src/main/**/*.js', '!./src/static/*'])              
        .pipe(gulp.dest('./dist/js/main'))
        .pipe(concat('main_combined.js'))
        //.pipe(gulp.dest('./dist/js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./dist/js'))
}

function js_sub(){
    return gulp.src(['./src/sub/**/*.js', '!./src/static/*'])              
        .pipe(gulp.dest('./dist/js/sub'))   
        .pipe(uglify())   
        .pipe(rename({
            extname:'.min.js'
        }))
        .pipe(gulp.dest('./dist/js/sub')) 
        .pipe(concat("sub_combined.js"))
        //.pipe(gulp.dest('./dist/js'))   
        .pipe(rename('sub.min.js'))
        .pipe(gulp.dest('./dist/js'))
}
function js_static(){
    return gulp.src(['./src/static/**/*.js'])              
        .pipe(gulp.dest('./dist/static')) 
}

//이미지파일을 특정 폴더로 이동하는 함수
function imgmin(){
    return gulp.src('./src/**/img/*' )  
        .pipe(rename({dirname: ''}))            
        .pipe(gulp.dest('./dist/img/'));
}

//완성이 gulp작업파일들중에 변경사항이 발생하면 자동으로 
//크롬 브라우저로 재 렌더링 해주는 함수
function watch(){
    browserSync.init({
        server : {
            baseDir : './dist'
        },
        browser: "google chrome",
        notify : false
    });    
  
    gulp.watch('./src/main/**/*.html',  html_include_main);  
    gulp.watch('./src/sub/**/*.html',  html_include_sub); 
    gulp.watch('./src/**/*.scss',  style);
    gulp.watch('./src/main/**/*.js',  js_main); 
    gulp.watch('./src/sub/**/*.js',  js_sub); 
    gulp.watch('./src/static/**/*.js',  js_static); 
    gulp.watch('./src/**/img/*',imgmin);
    gulp.watch('./**/*.html').on('change',browserSync.reload); 
    gulp.watch('./**/*.scss').on('change',browserSync.reload); 
    gulp.watch('./dist/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('./dist/static/**/*.js').on('change', browserSync.reload);
}

//아래는 해당 정의된 함수를 외부보 내보내면서 실행
exports.static_file = static_file;
exports.html_include_main = html_include_main;
exports.html_include_sub = html_include_sub;
exports.style = style;
exports.js_main = js_main;
exports.js_sub = js_sub;
exports.js_static = js_static;
exports.imgmin = imgmin;
exports.watch = watch;
const build = gulp.series(static_file, html_include_main, html_include_sub, style, js_main, js_sub, js_static, imgmin, watch);
exports.default = build;