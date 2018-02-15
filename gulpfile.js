var spawn = require('child_process').spawnSync;
var yargs = require('yargs').argv;

var gulp = require('gulp');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');

var serverTsProject = ts.createProject('app/tsconfig.json');

gulp.task('clean', () => {
  return gulp.src('dist/**/*', {read: false}).pipe(clean());
});

gulp.task('build', ['clean'], () => {
  return serverTsProject.src()
                        .pipe(sourcemaps.init())
                        .pipe(serverTsProject())
                        .js
                        .pipe(babel())
                        //.pipe(uglify())
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest('dist/app'));
});

gulp.task('start', () => {
  return spawn('node', ['dist/app/main.js'], {stdio: 'inherit'});
});