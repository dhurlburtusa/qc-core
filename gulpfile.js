const babel = require('gulp-babel'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    jasmine = require('gulp-jasmine'),
    jasmineSpecReporter = require('jasmine-spec-reporter'),
    karma = require('karma'),
    mergeStream = require('merge-stream'),
    runSequence = require('run-sequence'),
    webpack = require('webpack-stream');

var srcFiles, testFiles;

srcFiles = [
  './index.js',
  './lib/**/*.js',
];

// NOTE: Each spec is in charge of declaring its own dependencies.  Hence the reason dependencies are not declared here.
testFiles = [
  './test/unit/**/*.spec.js'
];


/**
 * "Cleans" all generated content.  That is, deletes the contents of the ./tmp/ directory.
 */
gulp.task('clean', function () {
  return del.sync('./tmp/');
});


/**
 * "Lints" the source code.  More specifically, runs the source files against ESLint.
 */
gulp.task('lint', function (cb) {
  return gulp.src(srcFiles)
    .pipe(eslint({}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


/**
 * Preprocesses the source code.
 */
gulp.task('preprocess', function (cb) {
  var indexStream, libStream, webpackStream;

  indexStream = gulp.src('./index.js')
    .pipe(babel().on('error', gutil.log))
    .pipe(gulp.dest('./tmp/babel/'));

  libStream = gulp.src('./lib/**/*.js')
    .pipe(babel().on('error', gutil.log))
    .pipe(gulp.dest('./tmp/babel/lib/'));

  webpackStream = gulp.src('./etc/webpack-entry.js')
    .pipe(babel().on('error', gutil.log))
    .pipe(gulp.dest('./tmp/babel/'));

  return mergeStream(indexStream, libStream, webpackStream);
});


gulp.task('bundle', function () {
  return webpack(
    {
      context: `${__dirname}/tmp/babel/`,
      entry: {
        'bundle': './webpack-entry',
      },
      output: {
        filename: '[name].js',
        path: `${__dirname}/tmp/webpack/`,
        pathinfo: true,
      },
    }
  ).pipe(gulp.dest('./tmp/webpack/'));
});


gulp.task('test:all', function (cb) {
  runSequence([
    'test:browsers',
    'test:node',
    'test:phantomjs'
  ], cb);
});


gulp.task('test:browsers', function (cb) {
  new karma.Server({
    configFile: `${__dirname}/test/karma.conf.js`,
  }, cb).start();
});


gulp.task('test:node', function () {
  return gulp.src(testFiles)
    // gulp-jasmine works on filepaths so you can't have any plugins before it
    // See https://www.npmjs.com/package/gulp-jasmine for configuration details.
    .pipe(jasmine({
      config: {
        spec_dir: './test/unit/',
        spec_files: [
          '**/*.spec.js'
        ],
      },
      includeStackTrace: true,
      reporter: [
        new jasmineSpecReporter({
          displaySpecDuration: true,
          displayStacktrace: 'all',   // display stacktrace for each failed assertion, values: (all|specs|summary|none)
        })
      ],
    }))
});


gulp.task('test:phantomjs', function (cb) {
  new karma.Server({
    configFile: `${__dirname}/test/karma.conf.js`,
    browsers: ['PhantomJS'],
    port: 9877,
  }, cb).start();
});


gulp.task('verify:travisci', function (cb) {
  runSequence('build', 'test:node', 'test:phantomjs', cb);
});


gulp.task('watch', function () {
  gulp.watch(srcFiles, ['build']);
  gulp.watch([].concat(srcFiles).concat(testFiles), ['test']);
});


gulp.task('build', function (cb) {
  runSequence(['lint', 'preprocess'], 'bundle', cb);
});


gulp.task('test', function (cb) {
  runSequence('build', 'test:all', cb);
});


gulp.task('default', function (cb) {
  runSequence('clean', 'test', 'watch', cb);
});
