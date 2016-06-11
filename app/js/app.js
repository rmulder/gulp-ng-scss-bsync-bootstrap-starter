(function () {
    'use strict';
    //Empty template module used in build process to generate js file from html files
    angular.module('templates', []);

    angular.module('mgAppCore', []);

    angular.module('mgAppHome', ['mgAppCore']);


    //Main app
    angular.module('mgApp', [
        'templates',
        'ui.router',
        'pascalprecht.translate',
        'ui.bootstrap',
        'ngSanitize',
        'mgAppHome'
    ]);



})();
