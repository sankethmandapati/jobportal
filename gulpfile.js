var gulp = require('gulp');
var uglify = require('gulp-uglify'),
    gp_concat = require('gulp-concat');

gulp.task('js-fef', function(){
    return gulp.src(['file1.js', 'file2.js', 'file3.js'])
        .pipe(gp_concat('concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

var nodemon = require('gulp-nodemon');

gulp.task('develop', function () {
  nodemon({ script: 'app.js'})
    .on('restart', function () {
      console.log('restarted!')
    })
});
 

gulp.task('compress', function() {
  gulp.src('/public/angular/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['develop']);