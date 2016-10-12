(function () {
  'use strict';
  //Empty template module used in build process to generate js file from html files
  angular.module('templates', []);

  angular.module('reobeAppCore', []);

  angular.module('reobeAppHome', ['reobeAppCore']);

  //Main app
  angular.module('reobeApp', [
    'templates',
    'ui.router',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ngSanitize',
    'reobeAppHome'
  ]);
})();
