/*
    sudo npm install gulp-cli -g
    npm install
    gulp

    주의점 
    1.main폴더 안쪽에 index.html 생성
    2.src폴더 안쪽에 style.scss 
    3.include시 src경로는 무조건 큰따옴표로 감쌈
    --------------------------
    처음 npm 인스톨시 에러발생하면 다음과 같이 c드라이브로 이동후 
    아래 명령어를 실행후 다시 프로젝트 폴더로 돌아와 gulp 실행
    cd C:\   
    Set-ExecutionPolicy RemoteSigned
    cd C:\Users\i\Desktop\my1

    gulp로 빌드시 node-sass가 없다는 오류가 출력되면
    아래 명령어 실행후 다시 gulp 실행
    node node_modules/node-sass/scripts/install.js

    es6문법이 인식 안되는 오류해결
    기존 uglify 모듈을 --->uglify-es로 대체
    https://www.npmjs.com/package/gulp-uglify-es

    src폴더 packge.js gulpflie.js만 복사해서 써라
*/

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

    //css파일 압축하는 기능
    /* 
    .pipe(uglifycss({    
        "uglyComments": true
     }))
    */
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