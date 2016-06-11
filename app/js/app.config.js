(function () {
    'use strict';
    angular.module('mgApp')
        .config(configureTranslate);

    configureTranslate.$inject = ['$translateProvider'];

    function configureTranslate($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'js/i18n/properties-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');
        $translateProvider.useMissingTranslationHandlerLog();
        $translateProvider.useSanitizeValueStrategy('escaped');
    }

})();
