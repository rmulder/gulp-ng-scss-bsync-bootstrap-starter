// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// generator-karma 0.8.3

module.exports = function (config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/es5-shim/es5-shim.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/lodash/lodash.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-translate/angular-translate.js',
            'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'bower_components/karma-read-json/karma-read-json.js',
            {pattern: 'app/js/**/*.json', included: false},
            {pattern: 'mockdata/**/*.json', included: false},
            'app/js/app.js',
            'app/js/**/*.js',
            'tests/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 9876,

        reporters: ['progress', 'coverage', 'html'],

        preprocessors: {
            '.tmp/scripts/**/*.js': ['coverage']
        },

        htmlReporter: {
            outputDir: 'reports/html',
            templatePath: null,
            focusOnFailures: true,
            namedFiles: false,
            pageTitle: 'Move Guides UI Unit Tests',
            urlFriendlyName: false,

            preserveDescribeNesting: true,
            foldAll: true,
        },

        coverageReporter: {
            dir: 'reports/coverage',
            reporters: [{type: 'html', subdir: 'report-html'},]
        },

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'PhantomJS'
        ],

        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-html-reporter'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};
