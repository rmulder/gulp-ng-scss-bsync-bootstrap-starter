(function () {
  'use strict';
  //Empty template module used in build process to generate js file from html files
  angular.module('templates', []);

  angular.module('portalAppCore', []);

  angular.module('portalAppHome', ['portalAppCore']);

  //Main app
  angular.module('portalApp', [
    'templates',
    'ui.router',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ngSanitize',
    'portalAppHome'
  ]);
})();
