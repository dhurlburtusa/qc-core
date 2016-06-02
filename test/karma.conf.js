// This declares the default configuration.  Values can be overridden in gulpfile.js.
module.exports = function (config) {
  config.set({

    basePath: '..',

    files: [
      'tmp/webpack/bundle.js',
      'test/unit/**/*spec.js',
    ],

    browsers: [
      'Chrome',
      'Firefox',
      'IE',
      'PhantomJS',
    ],

    frameworks: [
      'jasmine',
    ],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-jasmine',
      'karma-jasmine-html-reporter',
      'karma-phantomjs-launcher',
    ],

    // test results reporter to use
    // possible values: 'dots', 'kjhtml', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'kjhtml'],

  });
};
