'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var _ = require('lodash');


///////////////////////////
/// Configuration
//////////////////////////
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var reload = browserSync.reload;
$.del = require('del');

/**
 *  The main paths of your project handle these with care
 */
var paths = {
    app: 'app',
    dist: 'dist',
    tests: 'tests',
    tmp: '.tmp',
    BC: 'bower_components'
};
var errorHandler = function (title) {
    'use strict';

    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};

/////////////////////////////////////////////
/// Wire and inject all bower, css, js dependencies
/////////////////////////////////////////////
var wiredep = require('wiredep').stream;

gulp.task('inject', ['styles'], function () {
    var injectStyles = gulp.src([path.join(paths.app + '/css/**/*.css')], {read: false});

    var injectScripts = gulp.src([
        path.join(paths.app, '/js/**/*.js'),
        path.join('!' + paths.app, '/js/**/*.spec.js'),
        path.join('!' + paths.app, '/js/**/*.mock.js'),
    ])
        .pipe($.angularFilesort()).on('error', errorHandler('AngularFilesort'));

    var injectOptions = {
        addRootSlash: false, ignorePath: ['app/']
    };

    return gulp.src(path.join(paths.app, '/index.html'))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep({directory: 'bower_components', exclude: ['bower_components/bootstrap/']}))
        .pipe(gulp.dest(path.join(paths.app)));
});

/////////////////////////////////
/// Scripts minification /TODO: No Use
////////////////////////////////

gulp.task('scripts', function () {

    return gulp.src(paths.app + '/js/**/*.js')
        .pipe($.concat('/js/app.min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(paths.dist));
});

//////////////////////////////////////
//// JSHint
//////////////////////////////////////

gulp.task('lint-js', function () {
    return gulp.src(paths.app + '/js/**/*.js')
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('lint-test', function () {
    return gulp.src(paths.tests + '/**/*.js')
        .pipe($.jshint(paths.tests + '/.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'));
});

////////////////////////////////////
/// Styles
///////////////////////////////////
gulp.task('styles', function () {

    return gulp.src(paths.app + '/scss/**/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle: 'expanded',
            includePaths: [paths.BC + '/bootstrap/scss', paths.BC + '/font-awesome/scss']
        })).on('error', errorHandler('Sass'))
        .pipe($.autoprefixer()).on('error', errorHandler('Autoprefixer'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(paths.app + '/css'))
        .pipe(reload({stream: true}));
});

///////////////////////////////////////
/// Browser-sync configuration
///////////////////////////////////////
var browserSyncSpa = require('browser-sync-spa');
var proxyMiddleware = require('http-proxy-middleware');
function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if (baseDir === paths.app || (_.isArray(baseDir) && baseDir.indexOf(paths.app) !== -1)) {
        gutil.log('we are inside condition');
        routes = {
            '/bower_components': 'bower_components',
            '/fonts': paths.BC + '/font-awesome/fonts',
        };
    }

    var server = {
        baseDir: baseDir,
        routes: routes
    };

    /*
     * You can add a proxy to your backend by uncommenting the line below.
     * You just have to configure a context which will we redirected and the target url.
     * Example: $http.get('/users') requests will be automatically proxified.
     *
     * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
     */
    //server.middleware = proxyMiddleware('/api', {target: 'http://localhost:3015', changeOrigin: true});

    browserSync.instance = browserSync.init({
        startPath: '/',
        server: server,
        browser: browser
    });
}

browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve-app', function () {
    browserSyncInit([paths.app]);
});

gulp.task('serve-dist', ['build'], function () {
    browserSyncInit([paths.dist]);
});

///////////////////////
/// HTML Tasks
///////////////////////
gulp.task('html', function () {
    gulp.src(paths.app + '/**/*.html')
        .pipe(reload({stream: true}));
});

///////////////////////////////////////////////////////////////////////
/// Unit Testing
///////////////////////////////////////////////////////////////////////

var Server = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test', ['lint-js', 'lint-test'], function (done) {
    new Server({
        configFile: __dirname + '/' + paths.tests + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', ['lint-js', 'lint-test'], function (done) {
    new Server({
        configFile: __dirname + '/' + paths.tests + '/karma.conf.js',
    }, done).start();
});

///////////////////////
/// Watch
///////////////////////
gulp.task('reload-js', function () {
    gulp.src(paths.app + '/js/**/*.js')
        .pipe(reload({stream: true}));
});
gulp.task('watch', function () {
    gulp.watch('app/js/**/*.js', ['reload-js']);
    gulp.watch('app/scss/**/*.scss', ['styles']);
    gulp.watch('app/**/*.html', ['html']);
});
/////////////////////////////////////////////////
/// Build - Creating production ready build
/////////////////////////////////////////////////
var htmlMinOptions = {
    removeEmptyAttributes: true,
    removeAttributeQuotes: true,
    collapseBooleanAttributes: true,
    collapseWhitespace: true
};
gulp.task('partials', function (cp) {
    return gulp.src([
        path.join(paths.app, '/**/*.html'),
        path.join('!' + paths.app + '/index.html')
    ])
        .pipe($.htmlmin(htmlMinOptions))
        .pipe($.angularTemplatecache('templates.js', {
            module: 'templates',
            root: ''
        }))
        .pipe(gulp.dest(paths.tmp + '/partials/'))
        .pipe($.size({title: path.join(paths.dist, '/'), showFiles: true}), cp);
});

gulp.task('js-cp', function (cp) {
    return gulp.src([path.join(paths.app, 'js/**/*.js')])
        .pipe(gulp.dest(paths.tmp + '/js'), cp);
});

gulp.task('index-html', ['clean', 'partials', 'js-cp'], function () {
    var partialsInjectFile = gulp.src(path.join(paths.tmp, '/partials/templates.js'), {read: false});
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: paths.tmp,
        addRootSlash: false
    };

    var htmlFilter = $.filter('*.html', {restore: true});
    var jsFilter = $.filter('**/*.js', {restore: true});
    var cssFilter = $.filter('**/*.css', {restore: true});

    return gulp.src(path.join(paths.app, '/*.html'))
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe($.useref())
        .pipe(jsFilter)
        .pipe($.sourcemaps.init())
        .pipe($.ngAnnotate())
        .pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', errorHandler('Uglify'))
        .pipe($.rev())
        .pipe($.sourcemaps.write('maps'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        // .pipe($.sourcemaps.init())
        .pipe($.cssnano())
        .pipe($.rev())
        // .pipe($.sourcemaps.write('maps'))
        .pipe(cssFilter.restore)
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.htmlmin(htmlMinOptions))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest(path.join(paths.dist, '/')))
        .pipe($.size({title: path.join(paths.dist, '/'), showFiles: true}));
});

gulp.task('font-cp', ['clean'], function () {
    return gulp.src([path.join(paths.BC, '/font-awesome/fonts/**/*')])
        .pipe(gulp.dest(paths.dist + '/fonts'));
});

gulp.task('images-cp', ['clean'], function () {
    return gulp.src([path.join(paths.app, '/images/**/*')])
        .pipe(gulp.dest(paths.dist + '/images'));
});

gulp.task('translate-cp', ['clean'], function (cp) {
    return gulp.src([path.join(paths.app, 'js/**/*.json')])
        .pipe(gulp.dest(paths.dist + '/js'), cp);
});

gulp.task('build', $.sequence(['clean', 'js-cp', 'partials', 'font-cp', 'images-cp', 'translate-cp', 'index-html']));

/////////////////////////
/// Clean Tasks
/////////////////////////
gulp.task('clean', function (cp) {
    return $.del([path.join(paths.dist, '/'), path.join(paths.tmp, '/')], cp);
});

///////////////////////
/// build tasks
///////////////////////
gulp.task('serve', ['inject', 'serve-app', 'watch']);
gulp.task('serve:dist', ['clean', 'build', 'serve-dist']);
gulp.task('default', ['build']);
